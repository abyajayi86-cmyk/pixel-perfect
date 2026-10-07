import { useState, type FormEvent } from "react";
import { Button } from "@/components/common/Button";
import { Field, controlClass } from "@/components/common/FormField";
import { useServerFn } from "@tanstack/react-start";
import { submitEnquiry, submitVisitRequest } from "@/lib/forms.functions";

/** Submissions are validated on the server and stored securely (insert-only). */
type FormState = "idle" | "sending" | "sent" | "error";

function Notice({ state, kind }: { state: FormState; kind: "enquiry" | "visit" }) {
  if (state === "sent")
    return (
      <p role="status" className="rounded-2xl bg-cream-deep px-5 py-4 text-sm font-semibold text-navy">
        {kind === "visit"
          ? "Thank you! Your visit request has been received. The school office will contact you to confirm a date and time."
          : "Thank you! Your enquiry has been received. The school office will get back to you as soon as possible."}
      </p>
    );
  if (state === "error")
    return (
      <p role="alert" className="rounded-2xl border-2 border-coral px-5 py-4 text-sm font-semibold">
        Sorry, we couldn't send that. Please check your details and try again, or contact the school directly.
      </p>
    );
  return null;
}

const val = (f: FormData, k: string) => String(f.get(k) ?? "");

const privacyNote =
  "We use these details only to respond to your enquiry. We never publish them and never share them with third parties.";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const send = useServerFn(submitEnquiry);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const el = event.currentTarget;
    const f = new FormData(el);
    if (f.get("website")) return setState("sent"); // honeypot
    setState("sending");
    try {
      await send({
        data: {
          fullName: val(f, "fullName"),
          email: val(f, "email"),
          phone: val(f, "phone"),
          enquiryType: val(f, "enquiryType"),
          message: val(f, "message"),
        },
      });
      el.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] bg-card p-6 shadow-[var(--shadow-card)] md:p-8"
      noValidate={false}
    >
      <h2 className="text-xl">Send an enquiry</h2>
      <p className="text-sm text-muted-foreground">{privacyNote}</p>

      <Field label="Full name" name="fullName" required>
        <input
          id="fullName"
          name="fullName"
          required
          maxLength={120}
          className={controlClass}
          autoComplete="name"
        />
      </Field>
      <Field label="Email address" name="email" required>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={160}
          className={controlClass}
          autoComplete="email"
        />
      </Field>
      <Field label="Phone number" name="phone">
        <input
          id="phone"
          name="phone"
          type="tel"
          maxLength={30}
          className={controlClass}
          autoComplete="tel"
        />
      </Field>
      <Field label="Enquiry type" name="enquiryType" required>
        <select
          id="enquiryType"
          name="enquiryType"
          required
          className={controlClass}
          defaultValue="Admissions"
        >
          <option>Admissions</option>
          <option>Existing Parent</option>
          <option>School Visit</option>
          <option>General Enquiry</option>
          <option>Other</option>
        </select>
      </Field>
      <Field label="Message" name="message" required>
        <textarea
          id="message"
          name="message"
          required
          maxLength={2000}
          rows={5}
          className={controlClass}
        />
      </Field>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" required className="mt-1 size-5 rounded" name="privacy" />
        <span>I understand how Honeytots School will use the information I have provided.</span>
      </label>

      <Button type="submit" size="lg" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send enquiry"}
      </Button>
      <Notice state={state} kind="enquiry" />
    </form>
  );
}

export function BookVisitForm() {
  const [state, setState] = useState<FormState>("idle");
  const send = useServerFn(submitVisitRequest);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const el = event.currentTarget;
    const f = new FormData(el);
    if (f.get("website")) return setState("sent");
    setState("sending");
    try {
      await send({
        data: {
          guardianName: val(f, "guardianName"),
          email: val(f, "visitEmail"),
          phone: val(f, "visitPhone"),
          childName: val(f, "childName"),
          childAge: val(f, "childAge"),
          intendedClass: val(f, "intendedClass"),
          preferredDate: val(f, "preferredDate"),
          preferredTime: val(f, "preferredTime"),
          message: val(f, "visitMessage"),
        },
      });
      el.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] bg-card p-6 shadow-[var(--shadow-card)] md:p-8"
    >
      <h2 className="text-xl">Request a school visit</h2>
      <p className="text-sm text-muted-foreground">
        We only ask for what we need to arrange your visit. {privacyNote}
      </p>

      <Field label="Parent or guardian full name" name="guardianName" required>
        <input
          id="guardianName"
          name="guardianName"
          required
          maxLength={120}
          className={controlClass}
          autoComplete="name"
        />
      </Field>
      <Field label="Email address" name="visitEmail" required>
        <input
          id="visitEmail"
          name="visitEmail"
          type="email"
          required
          maxLength={160}
          className={controlClass}
          autoComplete="email"
        />
      </Field>
      <Field label="Phone number" name="visitPhone" required>
        <input
          id="visitPhone"
          name="visitPhone"
          type="tel"
          required
          maxLength={30}
          className={controlClass}
          autoComplete="tel"
        />
      </Field>
      <Field label="Child's first name" name="childName" hint="Optional.">
        <input id="childName" name="childName" maxLength={80} className={controlClass} />
      </Field>
      <Field label="Child's age" name="childAge" hint="Optional.">
        <input
          id="childAge"
          name="childAge"
          inputMode="numeric"
          maxLength={2}
          className={controlClass}
        />
      </Field>
      <Field label="Intended class" name="intendedClass">
        <select
          id="intendedClass"
          name="intendedClass"
          className={controlClass}
          defaultValue="Not sure yet"
        >
          <option>Not sure yet</option>
          <option>Creche</option>
          <option>Playgroup</option>
          <option>Nursery</option>
          <option>Primary 1</option>
          <option>Primary 2</option>
          <option>Primary 3</option>
          <option>Primary 4</option>
          <option>Primary 5</option>
          <option>Primary 6</option>
        </select>
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Preferred date" name="preferredDate">
          <input id="preferredDate" name="preferredDate" type="date" className={controlClass} />
        </Field>
        <Field label="Preferred time" name="preferredTime">
          <select
            id="preferredTime"
            name="preferredTime"
            className={controlClass}
            defaultValue="Morning"
          >
            <option>Morning</option>
            <option>Midday</option>
            <option>Afternoon</option>
          </select>
        </Field>
      </div>
      <Field label="Anything else we should know?" name="visitMessage">
        <textarea
          id="visitMessage"
          name="visitMessage"
          maxLength={1000}
          rows={4}
          className={controlClass}
        />
      </Field>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website2">Leave this field empty</label>
        <input id="website2" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" required className="mt-1 size-5 rounded" name="privacy" />
        <span>I understand how Honeytots School will use the information I have provided.</span>
      </label>

      <Button type="submit" size="lg" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Request visit"}
      </Button>
      <Notice state={state} kind="visit" />
    </form>
  );
}
