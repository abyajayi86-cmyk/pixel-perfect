import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(1500),
      }),
    )
    .min(1)
    .max(12),
});

export type AskResult = { answer: string } | { error: string };

export const askHoneytots = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => schema.parse(d))
  .handler(async ({ data }): Promise<AskResult> => {
    const { websiteKnowledge } = await import("./ask.server");
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { error: "The assistant is not configured yet." };

    const instructions = `You are the friendly website helper for Honeytots School, a Nigerian nursery and primary school. Answer prospective parents' questions ONLY using the website content below. If the answer is not in the content, or the content shows a placeholder in [square brackets] or says it is awaiting confirmation, say the school has not published that detail yet and suggest contacting the school or booking a visit (pages /contact and /book-a-visit). Never invent fees, dates, staff, policies or claims. Keep answers short (under 150 words), warm and plain. Mention the relevant page path when helpful.\n\nWEBSITE CONTENT:\n${websiteKnowledge()}`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        "Lovable-API-Key": key,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        instructions,
        input: data.messages.map((m) => ({ role: m.role, content: m.content })),
        reasoning: { effort: "low" },
        store: false,
        stream: true,
      }),
    });

    if (!res.ok || !res.body) {
      if (res.status === 429) return { error: "The helper is busy. Please try again in a minute." };
      if (res.status === 402 || res.status === 403)
        return { error: "The helper is temporarily unavailable. Please contact the school." };
      console.error("ask failed", res.status, await res.text().catch(() => ""));
      return { error: "Sorry, something went wrong. Please try again." };
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let answer = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const frames = buffer.split("\n\n");
      buffer = frames.pop() ?? "";
      for (const frame of frames) {
        for (const line of frame.split("\n")) {
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const evt = JSON.parse(payload) as { type?: string; delta?: string };
            if (evt.type === "response.output_text.delta" && evt.delta) answer += evt.delta;
            if (evt.type === "response.failed" || evt.type === "error")
              return { error: "Sorry, something went wrong. Please try again." };
          } catch {
            /* ignore partial */
          }
        }
      }
    }
    if (!answer.trim())
      return { error: "I couldn't answer that. Please contact the school directly." };
    return { answer: answer.trim() };
  });
