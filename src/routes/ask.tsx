import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/common/Button";
import { controlClass } from "@/components/common/FormField";
import { SimplePage, meta } from "@/lib/simple-page";
import { askHoneytots } from "@/lib/ask.functions";

export const Route = createFileRoute("/ask")({
  head: () =>
    meta(
      "Ask Honeytots",
      "Ask quick questions about Honeytots School admissions, fees and school life, answered from our website.",
      "/ask",
    ),
  component: AskPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const suggestions = [
  "How do I apply for admission?",
  "What are the school fees?",
  "What does a school day look like?",
  "How can I book a visit?",
];

function AskPage() {
  const ask = useServerFn(askHoneytots);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const next = [...messages, { role: "user" as const, content: q }].slice(-12);
    setMessages(next);
    setInput("");
    setError(null);
    setBusy(true);
    try {
      const res = await ask({ data: { messages: next } });
      if ("answer" in res) setMessages([...next, { role: "assistant", content: res.answer }]);
      else setError(res.error);
    } catch {
      setError("Sorry, something went wrong. Please try again.");
    } finally {
      setBusy(false);
      requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: "smooth" }));
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  return (
    <SimplePage
      title="Ask Honeytots"
      eyebrow="Parent help"
      intro="Have a question about admissions, fees or school life? Ask here — answers come from the information on this website."
      family="honey"
    >
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-card p-5 shadow-[var(--shadow-card)] md:p-8">
        <div aria-live="polite" className="space-y-4">
          {messages.length === 0 ? (
            <div>
              <p className="text-sm text-muted-foreground">Try one of these:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="min-h-11 rounded-full border-2 border-border px-4 text-sm font-semibold interactive hover:border-primary"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          {messages.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="flex justify-end">
                <p className="max-w-[85%] rounded-3xl rounded-br-md bg-primary px-4 py-3 text-primary-foreground">
                  {m.content}
                </p>
              </div>
            ) : (
              <div key={i} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-cream-deep font-display font-bold"
                >
                  H
                </span>
                <p className="whitespace-pre-wrap pt-1.5 leading-relaxed">{m.content}</p>
              </div>
            ),
          )}
          {busy ? <p className="text-sm text-muted-foreground">Finding an answer…</p> : null}
          {error ? (
            <p role="alert" className="rounded-2xl border-2 border-coral px-4 py-3 text-sm font-semibold">
              {error}
            </p>
          ) : null}
          <div ref={endRef} />
        </div>

        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="ask-input" className="sr-only">
            Your question
          </label>
          <input
            id="ask-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={500}
            placeholder="Type your question…"
            className={controlClass}
          />
          <Button type="submit" size="lg" disabled={busy || !input.trim()}>
            Ask
          </Button>
        </form>
        <p className="mt-4 text-xs text-muted-foreground">
          Answers are generated automatically from this website and may be incomplete. For anything
          important, please <Link to="/contact" className="underline">contact the school</Link> or{" "}
          <Link to="/book-a-visit" className="underline">book a visit</Link>. Please don't share
          personal details here.
        </p>
      </div>
    </SimplePage>
  );
}
