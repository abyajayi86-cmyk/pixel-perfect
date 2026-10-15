import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { allow, clientIp, hashKey, remember, seenRecently } from "@/lib/server-request";

/**
 * Public forms (enquiry and visit request).
 *
 * Insert-only public client: RLS allows anonymous INSERT, never SELECT. Every
 * payload is validated here with a strict schema, throttled per caller IP and
 * de-duplicated, so the same message cannot be spammed repeatedly.
 */

function publicClient() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key)
    throw new Error(
      "The online form is temporarily unavailable. Please contact the school directly.",
    );
  return createClient<Database>(url, key, {
    auth: { persistSession: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
          h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

const RATE_WINDOW_MS = 10 * 60_000;
const RATE_LIMIT = 5;
const DUPLICATE_WINDOW_MS = 5 * 60_000;

const RATE_LIMITED_MESSAGE =
  "You have sent us several messages already. Please wait a few minutes before sending another, or contact the school office directly.";
const DUPLICATE_MESSAGE = "That looks like the message you just sent, so it was not sent again.";

const opt = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : null));

const enquirySchema = z
  .object({
    fullName: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(160),
    phone: opt(30),
    enquiryType: z.enum([
      "Admissions",
      "Existing Parent",
      "School Visit",
      "General Enquiry",
      "Other",
    ]),
    message: z.string().trim().min(1).max(2000),
    website: z.string().max(200).optional(),
  })
  .strict();

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => enquirySchema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true }; // honeypot: pretend success, store nothing

    const ip = await clientIp();
    if (!allow(`enquiry:${ip}`, RATE_LIMIT, RATE_WINDOW_MS)) throw new Error(RATE_LIMITED_MESSAGE);

    const fingerprint = hashKey(
      [data.fullName, data.email, data.enquiryType, data.message].join("\u0000").toLowerCase(),
    );
    if (seenRecently(`enquiry-recent:${fingerprint}`, DUPLICATE_WINDOW_MS))
      throw new Error(DUPLICATE_MESSAGE);

    const { error } = await publicClient().from("contact_enquiries").insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      enquiry_type: data.enquiryType,
      message: data.message,
    });
    if (error) {
      console.error("enquiry insert failed", error.message);
      throw new Error("We couldn't save your enquiry. Please try again.");
    }
    remember(`enquiry-recent:${fingerprint}`, DUPLICATE_WINDOW_MS);
    return { ok: true };
  });

const visitSchema = z
  .object({
    guardianName: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(160),
    phone: z.string().trim().min(5).max(30),
    childName: opt(80),
    childAge: z
      .string()
      .trim()
      .regex(/^\d{0,2}$/)
      .optional()
      .transform((v) => (v ? v : null)),
    intendedClass: opt(40),
    preferredDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional()
      .or(z.literal(""))
      .transform((v) => (v ? v : null)),
    preferredTime: opt(20),
    message: opt(1000),
    website: z.string().max(200).optional(),
  })
  .strict();

export const submitVisitRequest = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => visitSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true }; // honeypot: pretend success, store nothing

    const ip = await clientIp();
    if (!allow(`visit:${ip}`, RATE_LIMIT, RATE_WINDOW_MS)) throw new Error(RATE_LIMITED_MESSAGE);

    const fingerprint = hashKey(
      [data.guardianName, data.email, data.preferredDate ?? "", data.message ?? ""]
        .join("\u0000")
        .toLowerCase(),
    );
    if (seenRecently(`visit-recent:${fingerprint}`, DUPLICATE_WINDOW_MS))
      throw new Error(DUPLICATE_MESSAGE);

    const { error } = await publicClient().from("visit_requests").insert({
      guardian_name: data.guardianName,
      email: data.email,
      phone: data.phone,
      child_name: data.childName,
      child_age: data.childAge,
      intended_class: data.intendedClass,
      preferred_date: data.preferredDate,
      preferred_time: data.preferredTime,
      message: data.message,
    });
    if (error) {
      console.error("visit insert failed", error.message);
      throw new Error("We couldn't save your visit request. Please try again.");
    }
    remember(`visit-recent:${fingerprint}`, DUPLICATE_WINDOW_MS);
    return { ok: true };
  });
