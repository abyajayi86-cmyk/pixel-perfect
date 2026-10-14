import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import welcomePortrait from "@/assets/honeytots-welcome-portrait.jpg.asset.json";
import { Field, ImagePicker, inputCls, SaveBar, useSaveEntry } from "@/components/admin/cms-ui";
import type { HeroSlide } from "@/content/hero-slides";
import { useHeroSlides, useHomeContent } from "@/lib/cms";

export const Route = createFileRoute("/_authenticated/admin/home")({ component: HomeEditor });

function HomeEditor() {
  return (
    <div className="max-w-3xl space-y-12">
      <SlidesEditor />
      <WelcomeEditor />
    </div>
  );
}

function SlidesEditor() {
  const initial = useHeroSlides();
  const [slides, setSlides] = useState<HeroSlide[]>(initial);
  const { save, reset, saving } = useSaveEntry();
  const update = (i: number, patch: Partial<HeroSlide>) =>
    setSlides(slides.map((s, j) => (j === i ? { ...s, ...patch } : s)));
  const move = (i: number, d: number) => {
    const n = [...slides];
    const t = n[i + d];
    if (!t) return;
    n[i + d] = n[i]!;
    n[i] = t;
    setSlides(n);
  };
  return (
    <section>
      <h2 className="text-2xl">Homepage slideshow</h2>
      <div className="mt-4 space-y-6">
        {slides.map((s, i) => (
          <fieldset key={i} className="card-surface space-y-3 p-5">
            <legend className="sr-only">Slide {i + 1}</legend>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <strong>Slide {i + 1}</strong>
              <div className="flex gap-2 text-sm">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="rounded-full border px-3 py-1">Move up</button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === slides.length - 1} className="rounded-full border px-3 py-1">Move down</button>
                <button type="button" onClick={() => slides.length > 1 && setSlides(slides.filter((_, j) => j !== i))} className="rounded-full border px-3 py-1 text-destructive">Remove</button>
              </div>
            </div>
            <ImagePicker value={s.image} onChange={(image) => update(i, { image })} />
            <Field label="Photo description (for screen readers)"><input className={inputCls} value={s.alt} onChange={(e) => update(i, { alt: e.target.value })} /></Field>
            <Field label="Small heading"><input className={inputCls} value={s.eyebrow} onChange={(e) => update(i, { eyebrow: e.target.value })} /></Field>
            <Field label="Title"><input className={inputCls} value={s.title} onChange={(e) => update(i, { title: e.target.value })} /></Field>
            <Field label="Text"><textarea rows={3} className={inputCls} value={s.body} onChange={(e) => update(i, { body: e.target.value })} /></Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Button text"><input className={inputCls} value={s.primaryAction?.label ?? ""} onChange={(e) => update(i, { primaryAction: { to: s.primaryAction?.to ?? "/", label: e.target.value } })} /></Field>
              <Field label="Button goes to (e.g. /admissions)"><input className={inputCls} value={s.primaryAction?.to ?? ""} onChange={(e) => update(i, { primaryAction: { label: s.primaryAction?.label ?? "Find out more", to: e.target.value } })} /></Field>
            </div>
          </fieldset>
        ))}
        <button
          type="button"
          onClick={() => setSlides([...slides, { eyebrow: "Honeytots", title: "New slide", body: "", image: slides[0]?.image ?? "", alt: "", family: "honey" }])}
          className="rounded-full border-2 border-dashed border-navy/30 px-5 py-2 font-semibold"
        >
          + Add slide
        </button>
      </div>
      <SaveBar saving={saving} onSave={() => save("hero", slides)} onReset={() => reset("hero")} />
    </section>
  );
}

function WelcomeEditor() {
  const home = useHomeContent(welcomePortrait.url);
  const [form, setForm] = useState({ ...home, text: home.paragraphs.join("\n\n") });
  const { save, reset, saving } = useSaveEntry();
  return (
    <section className="space-y-3">
      <h2 className="text-2xl">Welcome section</h2>
      <ImagePicker value={form.image} onChange={(image) => setForm({ ...form, image })} />
      <Field label="Photo description"><input className={inputCls} value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} /></Field>
      <Field label="Heading"><input className={inputCls} value={form.heading} onChange={(e) => setForm({ ...form, heading: e.target.value })} /></Field>
      <Field label="Text (leave a blank line between paragraphs)"><textarea rows={6} className={inputCls} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} /></Field>
      <SaveBar
        saving={saving}
        onSave={() => save("home", { heading: form.heading, alt: form.alt, image: form.image, paragraphs: form.text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) })}
        onReset={() => reset("home")}
      />
    </section>
  );
}
