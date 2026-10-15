import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { cmsQuery } from "@/lib/cms";
import { resetCmsEntry, saveCmsEntry } from "@/lib/cms.functions";
import {
  IMAGE_ACCEPT_ATTRIBUTE,
  UNSUPPORTED_IMAGE_MESSAGE,
  imageTooLargeMessage,
  maxImageBytes,
  sniffImageType,
} from "@/lib/image-safety";

export const inputCls = "mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-base";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-navy">
      {label}
      {children}
    </label>
  );
}

/**
 * Saves one content entry and refreshes the live site content.
 *
 * The write goes through a server function, which re-checks the staff role and
 * validates the payload before touching the database.
 */
export function useSaveEntry() {
  const qc = useQueryClient();
  const saveFn = useServerFn(saveCmsEntry);
  const resetFn = useServerFn(resetCmsEntry);
  const [saving, setSaving] = useState(false);

  const refresh = () => qc.invalidateQueries({ queryKey: cmsQuery.queryKey });

  async function save(key: string, data: unknown) {
    setSaving(true);
    try {
      await saveFn({ data: { key, data } });
    } catch (err) {
      toast.error(
        err instanceof Error && err.message ? err.message : "Could not save. Please try again.",
      );
      return false;
    } finally {
      setSaving(false);
    }
    await refresh();
    toast.success("Saved. The website is updated.");
    return true;
  }

  async function reset(key: string) {
    try {
      await resetFn({ data: { key } });
    } catch (err) {
      toast.error(
        err instanceof Error && err.message
          ? err.message
          : "Could not restore the original content.",
      );
      return;
    }
    await refresh();
    toast.success("Restored the original content.");
  }

  return { save, reset, saving };
}

/** Uploads a photo and returns a permanent public link for the website. */
export async function uploadImage(file: File): Promise<string> {
  const header = new Uint8Array(await file.slice(0, 32).arrayBuffer());
  const sniffed = sniffImageType(header);
  if (!sniffed) throw new Error(UNSUPPORTED_IMAGE_MESSAGE);
  if (file.size > maxImageBytes()) throw new Error(imageTooLargeMessage());
  const path = `${crypto.randomUUID()}.${sniffed.ext}`;
  const { error } = await supabase.storage
    .from("cms-media")
    .upload(path, file, { contentType: sniffed.mime, upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from("cms-media").getPublicUrl(path);
  return data.publicUrl;
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
          accept={IMAGE_ACCEPT_ATTRIBUTE}
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
