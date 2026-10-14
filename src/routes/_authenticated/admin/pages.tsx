import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Field, ImagePicker, inputCls, SaveBar, useSaveEntry } from "@/components/admin/cms-ui";
import { pageContent, type PageSection } from "@/content/pages";
import { usePageContent } from "@/lib/cms";

export const Route = createFileRoute("/_authenticated/admin/pages")({
  validateSearch: z.object({ path: z.string().optional() }),
  component: PagesEditor,
});

function PagesEditor() {
  const { path } = Route.useSearch();
  if (path && pageContent[path]) return <PageForm key={path} path={path} />;
  const groups = Object.keys(pageContent).sort();
  return (
    <div>
      <h2 className="text-2xl">Choose a page to edit</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((p) => (
          <li key={p}>
            <Link to="/admin/pages" search={{ path: p }} className="card-surface block p-4 hover:shadow-md">
              <strong>{pageContent[p]!.title}</strong>
              <span className="block text-sm text-muted-foreground">{p}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

type SectionForm = { heading: string; text: string; list: string };

function PageForm({ path }: { path: string }) {
  const page = usePageContent(path)!;
  const { save, reset, saving } = useSaveEntry();
  const [title, setTitle] = useState(page.title);
  const [intro, setIntro] = useState(page.intro);
  const [image, setImage] = useState(page.image?.src ?? "");
  const [alt, setAlt] = useState(page.image?.alt ?? "");
  const [sections, setSections] = useState<SectionForm[]>(
    page.sections.map((s) => ({ heading: s.heading, text: s.body.join("\n\n"), list: (s.list ?? []).join("\n") })),
  );
  const upd = (i: number, patch: Partial<SectionForm>) => setSections(sections.map((s, j) => (j === i ? { ...s, ...patch } : s)));

  function onSave() {
    const out: PageSection[] = sections.map((s) => {
      const list = s.list.split("\n").map((l) => l.trim()).filter(Boolean);
      return { heading: s.heading, body: s.text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean), ...(list.length ? { list } : {}) };
    });
    save(`page:${path}`, { title, intro, sections: out, ...(image ? { image: { src: image, alt } } : {}) });
  }

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link to="/admin/pages" search={{}} className="text-sm underline">← All pages</Link>
        <a href={path} target="_blank" rel="noreferrer" className="text-sm underline">View page</a>
      </div>
      <h2 className="text-2xl">Editing: {page.title}</h2>
      <Field label="Page title"><input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
      <Field label="Introduction"><textarea rows={3} className={inputCls} value={intro} onChange={(e) => setIntro(e.target.value)} /></Field>
      <ImagePicker label="Page photo (optional)" value={image} onChange={setImage} />
      {image ? (
        <div className="flex gap-3">
          <div className="flex-1"><Field label="Photo description"><input className={inputCls} value={alt} onChange={(e) => setAlt(e.target.value)} /></Field></div>
          <button type="button" onClick={() => setImage("")} className="self-end rounded-full border px-4 py-2 text-sm">Remove photo</button>
        </div>
      ) : null}
      <h3 className="pt-4 text-xl">Sections</h3>
      {sections.map((s, i) => (
        <fieldset key={i} className="card-surface space-y-3 p-5">
          <legend className="sr-only">Section {i + 1}</legend>
          <div className="flex justify-between"><strong>Section {i + 1}</strong>
            <button type="button" onClick={() => setSections(sections.filter((_, j) => j !== i))} className="text-sm text-destructive underline">Remove section</button>
          </div>
          <Field label="Heading"><input className={inputCls} value={s.heading} onChange={(e) => upd(i, { heading: e.target.value })} /></Field>
          <Field label="Text (blank line between paragraphs)"><textarea rows={6} className={inputCls} value={s.text} onChange={(e) => upd(i, { text: e.target.value })} /></Field>
          <Field label="Bullet points (one per line, optional)"><textarea rows={4} className={inputCls} value={s.list} onChange={(e) => upd(i, { list: e.target.value })} /></Field>
        </fieldset>
      ))}
      <button type="button" onClick={() => setSections([...sections, { heading: "New section", text: "", list: "" }])} className="rounded-full border-2 border-dashed border-navy/30 px-5 py-2 font-semibold">+ Add section</button>
      <SaveBar saving={saving} onSave={onSave} onReset={() => reset(`page:${path}`)} />
    </div>
  );
}
