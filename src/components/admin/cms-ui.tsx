import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { cmsQuery } from "@/lib/cms";

export const inputCls = "mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-base";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-navy">
      {label}
      {children}
    </label>
  );
}

/** Saves one content entry and refreshes the live site content. */
export function useSaveEntry() {
  const qc = useQueryClient();
  const [saving, setSaving] = useState(false);
  async function save(key: string, data: unknown) {
    setSaving(true);
    const { data: u } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("cms_entries")
      .upsert({ key, data: data as never, updated_at: new Date().toISOString(), updated_by: u.user?.id ?? null });
    setSaving(false);
    if (error) {
      toast.error("Could not save: " + error.message);
      return false;
    }
    await qc.invalidateQueries({ queryKey: cmsQuery.queryKey });
    toast.success("Saved. The website is updated.");
    return true;
  }
  async function reset(key: string) {
    const { error } = await supabase.from("cms_entries").delete().eq("key", key);
    if (error) {
      toast.error(error.message);
      return;
    }
    await qc.invalidateQueries({ queryKey: cmsQuery.queryKey });
    toast.success("Restored the original content.");
  }
  return { save, reset, saving };
}

/** Uploads a photo and returns a long-lived link for the website to display. */
export async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("cms-media").upload(path, file, { contentType: file.type });
  if (error) throw error;
  const { data, error: e2 } = await supabase.storage.from("cms-media").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  if (e2 || !data) throw e2 ?? new Error("Could not create link");
  return data.signedUrl;
}

export function ImagePicker({ value, onChange, label = "Photo" }: { value: string; onChange: (url: string) => void; label?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  return (
    <div className="text-sm font-semibold text-navy">
      {label}
      <div className="mt-1 flex items-center gap-3">
        {value ? <img src={value} alt="" className="h-20 w-28 rounded-lg object-cover" /> : <div className="h-20 w-28 rounded-lg bg-muted" />}
        <button type="button" disabled={busy} onClick={() => ref.current?.click()} className="rounded-full border-2 border-navy/20 px-4 py-2 font-semibold">
          {busy ? "Uploading…" : "Change photo"}
        </button>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            setBusy(true);
            try {
              onChange(await uploadImage(f));
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "Upload failed");
            } finally {
              setBusy(false);
              e.target.value = "";
            }
          }}
        />
      </div>
    </div>
  );
}

export function SaveBar({ onSave, onReset, saving }: { onSave: () => void; onReset?: () => void; saving: boolean }) {
  return (
    <div className="sticky bottom-0 z-10 mt-8 flex flex-wrap gap-3 border-t bg-background/95 py-4">
      <button type="button" onClick={onSave} disabled={saving} className="min-h-11 rounded-full bg-navy px-6 font-semibold text-cream disabled:opacity-60">
        {saving ? "Saving…" : "Save changes"}
      </button>
      {onReset ? (
        <button type="button" onClick={() => confirm("Undo all edits here and restore the original content?") && onReset()} className="min-h-11 rounded-full border-2 border-navy/20 px-6 font-semibold">
          Restore original
        </button>
      ) : null}
    </div>
  );
}
