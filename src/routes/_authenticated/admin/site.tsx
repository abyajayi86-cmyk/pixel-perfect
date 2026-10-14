import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Field, inputCls, SaveBar, useSaveEntry } from "@/components/admin/cms-ui";
import { editableSiteFields, useSiteConfig, type SiteOverride } from "@/lib/cms";

export const Route = createFileRoute("/_authenticated/admin/site")({ component: SiteEditor });

function SiteEditor() {
  const site = useSiteConfig();
  const { save, reset, saving } = useSaveEntry();
  const [form, setForm] = useState<SiteOverride>(() =>
    Object.fromEntries(editableSiteFields.map((f) => [f.key, String(site[f.key] ?? "")])),
  );
  return (
    <div className="max-w-2xl space-y-4">
      <h2 className="text-2xl">School details</h2>
      {editableSiteFields.map((f) => (
        <Field key={f.key} label={f.label}>
          {"long" in f ? (
            <textarea rows={3} className={inputCls} value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
          ) : (
            <input className={inputCls} value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
          )}
        </Field>
      ))}
      <SaveBar saving={saving} onSave={() => save("site", form)} onReset={() => reset("site")} />
    </div>
  );
}
