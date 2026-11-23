import { useRef, useState } from "react";
import { FileText, LoaderCircle, Paperclip, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const MAX_FILES = 12;
const MAX_FILE_SIZE = 20 * 1024 * 1024;
const MAX_ARCHIVE_SIZE = 2_800_000;
const ACCEPTED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

type PreparedAttachment = {
  file: File;
  originalSize: number;
};

type QuoteAttachmentsProps = {
  onArchiveChange: (archive: File | null) => void;
  onBusyChange: (busy: boolean) => void;
};

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} Ko`;
  return `${(bytes / (1024 * 1024)).toLocaleString("fr-CA", {
    maximumFractionDigits: 1,
  })} Mo`;
}

function isAcceptedFile(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return ACCEPTED_TYPES.has(file.type) ||
    ["jpg", "jpeg", "png", "webp", "pdf"].includes(extension ?? "");
}

function getImageType(file: File) {
  if (["image/jpeg", "image/png", "image/webp"].includes(file.type)) return file.type;
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (extension === "jpg" || extension === "jpeg") return "image/jpeg";
  if (extension === "png") return "image/png";
  if (extension === "webp") return "image/webp";
  return null;
}

function safeFileName(name: string) {
  return name.replace(/[\\/]/g, "_").replace(/[\u0000-\u001f]/g, "_");
}

async function createArchive(attachments: PreparedAttachment[]) {
  if (!attachments.length) return null;

  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();
  attachments.forEach(({ file }, index) => {
    const numberedName = `${String(index + 1).padStart(2, "0")}-${safeFileName(file.name)}`;
    zip.file(numberedName, file);
  });

  const blob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 3 },
  });

  if (blob.size > MAX_ARCHIVE_SIZE) {
    throw new Error("Les fichiers compressés dépassent 2,8 Mo au total. Retirez un fichier ou choisissez un PDF plus léger.");
  }

  return new File([blob], "pieces-jointes-soumission.zip", {
    type: "application/zip",
  });
}

export function QuoteAttachments({
  onArchiveChange,
  onBusyChange,
}: QuoteAttachmentsProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [attachments, setAttachments] = useState<PreparedAttachment[]>([]);
  const [isPreparing, setIsPreparing] = useState(false);
  const [error, setError] = useState("");

  const setBusy = (busy: boolean) => {
    setIsPreparing(busy);
    onBusyChange(busy);
  };

  const handleFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!selected.length) return;

    const uniqueSelected = selected.filter((file) => !attachments.some(
      ({ file: existing }) =>
        existing.name === file.name &&
        existing.size === file.size &&
        existing.lastModified === file.lastModified,
    ));

    if (!uniqueSelected.length) {
      setError("Ces fichiers sont déjà dans la liste.");
      return;
    }
    if (attachments.length + uniqueSelected.length > MAX_FILES) {
      setError(`Vous pouvez joindre jusqu’à ${MAX_FILES} fichiers.`);
      return;
    }
    if (uniqueSelected.some((file) => !isAcceptedFile(file))) {
      setError("Formats acceptés : JPG, PNG, WebP et PDF.");
      return;
    }
    if (uniqueSelected.some((file) => file.size > MAX_FILE_SIZE)) {
      setError("Chaque fichier doit faire 20 Mo ou moins.");
      return;
    }

    const combinedSourceSize = [
      ...attachments.map(({ originalSize }) => originalSize),
      ...uniqueSelected.map(({ size }) => size),
    ].reduce((sum, size) => sum + size, 0);
    if (combinedSourceSize > 100 * 1024 * 1024) {
      setError("La taille totale des fichiers d’origine ne peut pas dépasser 100 Mo.");
      return;
    }

    setError("");
    setBusy(true);
    try {
      const prepared: PreparedAttachment[] = [];
      const imageFiles = uniqueSelected.filter((file) => getImageType(file));
      const imageCompression = imageFiles.length
        ? (await import("browser-image-compression")).default
        : null;
      for (const file of uniqueSelected) {
        const imageType = getImageType(file);
        if (imageType) {
          if (!imageCompression) throw new Error("Impossible de charger la compression d’image.");
          const compressionInput = file.type === imageType
            ? file
            : new File([file], file.name, { type: imageType, lastModified: file.lastModified });
          const outputType = imageType === "image/png" ? "image/png" : "image/jpeg";
          const compressed = await imageCompression(compressionInput, {
            maxSizeMB: 0.2,
            maxWidthOrHeight: 1600,
            initialQuality: 0.78,
            maxIteration: 8,
            useWebWorker: false,
            fileType: outputType,
          });
          const extension = outputType === "image/png" ? ".png" : ".jpg";
          const baseName = file.name.replace(/\.[^.]+$/, "");
          prepared.push({
            file: new File([compressed], `${baseName}${extension}`, {
              type: outputType,
              lastModified: file.lastModified,
            }),
            originalSize: file.size,
          });
        } else {
          prepared.push({ file, originalSize: file.size });
        }
      }

      const nextAttachments = [...attachments, ...prepared];
      const archive = await createArchive(nextAttachments);
      setAttachments(nextAttachments);
      onArchiveChange(archive);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de préparer ces fichiers.");
    } finally {
      setBusy(false);
    }
  };

  const removeAttachment = async (indexToRemove: number) => {
    const nextAttachments = attachments.filter((_, index) => index !== indexToRemove);
    setError("");
    setBusy(true);
    try {
      const archive = await createArchive(nextAttachments);
      setAttachments(nextAttachments);
      onArchiveChange(archive);
    } catch {
      setError("Impossible de mettre à jour l’archive. Réessayez.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3 rounded-lg border border-dashed border-border bg-muted/30 p-4 sm:p-5" aria-busy={isPreparing}>
      <div>
        <h3 className="text-sm font-semibold text-secondary">Photos et documents (facultatif)</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Les photos sont compressées sur votre appareil. Les PDF gardent leur format original. Jusqu’à 12 fichiers, 20 Mo chacun.
        </p>
      </div>

      <input
        ref={inputRef}
        id="quote-attachments"
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
        multiple
        onChange={handleFiles}
        className="sr-only"
        aria-label="Choisir des photos ou des fichiers PDF"
        aria-describedby="quote-attachments-help quote-attachments-error"
        disabled={isPreparing}
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
        disabled={isPreparing || attachments.length >= MAX_FILES}
        className="min-h-11 w-full rounded-md border-border bg-background text-sm font-semibold text-secondary sm:w-auto"
      >
        {isPreparing ? (
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Paperclip className="mr-2 h-4 w-4" aria-hidden="true" />
        )}
        {isPreparing ? "Préparation des fichiers…" : "Ajouter des fichiers"}
      </Button>
      <p id="quote-attachments-help" className="text-xs leading-relaxed text-muted-foreground">
        JPG, PNG, WebP et PDF. Maximum de 2,8 Mo au total après compression. Les pièces jointes sont transmises avec votre demande; aucun téléchargement manuel n’est nécessaire.
      </p>

      {attachments.length > 0 && (
        <ul className="space-y-2" aria-label="Fichiers sélectionnés">
          {attachments.map(({ file, originalSize }, index) => (
            <li
              key={`${file.name}-${originalSize}-${index}`}
              className="flex min-w-0 items-center gap-3 rounded-md border border-border bg-background px-3 py-2"
            >
              <FileText className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="min-w-0 flex-1 break-all text-xs font-medium text-secondary">
                {file.name}
                <span className="ml-1 font-normal text-muted-foreground">
                  ({formatFileSize(file.size)}
                  {originalSize !== file.size ? ` · avant ${formatFileSize(originalSize)}` : ""})
                </span>
              </span>
              <button
                type="button"
                onClick={() => void removeAttachment(index)}
                disabled={isPreparing}
                aria-label={`Retirer ${file.name}`}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <p id="quote-attachments-error" role={error ? "alert" : undefined} className={`text-sm ${error ? "text-destructive" : "sr-only"}`}>
        {error || "Aucune erreur"}
      </p>
    </div>
  );
}
