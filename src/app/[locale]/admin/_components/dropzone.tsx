"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Star, StarOff, Trash2, UploadCloud } from "lucide-react";
import { Image } from "@heroui/image";
import { cn } from "@heroui/theme";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";

export interface DefaultMedia {
  id?: string;
  url: string;
  isThumbnail?: boolean;
}

interface DropzoneProps {
  label?: string;
  onChange: (images: File[]) => void;
  onSelectThumbnail?: (file: File | null, url: string | null) => void;
  onDeleteDefault?: (id: string, url?: string) => void;
  maxFiles?: number;
  type?: "image" | "video";
  error?: string;
  maxSize?: number;
  defaultMedia?: DefaultMedia[];
  resetKey?: string | number;
}

export default function Dropzone({
  label,
  onChange,
  onSelectThumbnail,
  onDeleteDefault,
  maxFiles,
  type,
  error,
  maxSize,
  defaultMedia: defaultMediaProp = [],
  resetKey,
}: DropzoneProps) {
  const [defaultMedia, setDefaultMedia] = useState<DefaultMedia[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [thumbnailIndex, setThumbnailIndex] = useState<number | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [deletedDefaultIds, setDeletedDefaultIds] = useState<string[]>([]);

  useEffect(() => {
    const validDefaultMedia = defaultMediaProp.filter(
      (m) => !!m.url && !deletedDefaultIds.includes(m.id || ""),
    );

    // Jangan reset files! Hanya update defaultMedia
    setDefaultMedia(validDefaultMedia);

    // Buat preview baru berdasarkan default + files yang sudah ada
    const filePreviews = files.map((f) => URL.createObjectURL(f));
    const allUrls = [...validDefaultMedia.map((m) => m.url), ...filePreviews];

    setPreviewUrls(allUrls);

    const thumbnailMedia = validDefaultMedia.find((m) => m.isThumbnail);

    if (thumbnailMedia) {
      const index = allUrls.indexOf(thumbnailMedia.url);

      if (index >= 0) {
        setThumbnailIndex(index);
        onSelectThumbnail?.(null, thumbnailMedia.url);
      }
    }

    // Bersihkan daftar ID default yang sudah dihapus
    setDeletedDefaultIds([]);
  }, [defaultMediaProp, files, onSelectThumbnail]);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      let newFiles = [...files, ...acceptedFiles];

      if (maxFiles !== undefined) newFiles = newFiles.slice(0, maxFiles);
      const newUrls = [
        ...previewUrls,
        ...acceptedFiles.map((file) => URL.createObjectURL(file)),
      ].slice(0, maxFiles || Infinity);

      setFiles(newFiles);
      setPreviewUrls(newUrls);
      onChange(newFiles);
    },
    [files, previewUrls, maxFiles, onChange],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: type === "video" ? { "video/*": [] } : { "image/*": [] },
    multiple: !maxFiles || maxFiles > 1,
    disabled: maxFiles !== undefined && previewUrls.length >= maxFiles,
  });

  const handleSelectThumbnail = (index: number) => {
    setThumbnailIndex(index);
    const isFromFile = index >= defaultMedia.length;
    const file = isFromFile ? files[index - defaultMedia.length] : null;
    const url = previewUrls[index];

    onSelectThumbnail?.(file, url);
  };

  const handleRemove = (index: number) => {
    const isFromDefault = index < defaultMedia.length;

    if (isFromDefault) {
      const removed = defaultMedia[index];

      // Tambahkan ID ke daftar yang akan dihapus
      if (removed.id) {
        setDeletedDefaultIds((prev) => [...prev, removed.id!]);
        onDeleteDefault?.(removed.id, removed.url);
      }

      // Tidak perlu setDefaultMedia manual, cukup andalkan useEffect
    } else {
      const fileIndex = index - defaultMedia.length;
      const newFiles = [...files];

      newFiles.splice(fileIndex, 1);
      setFiles(newFiles);
      onChange(newFiles);
    }

    // Handle thumbnail reset
    if (thumbnailIndex === index) {
      setThumbnailIndex(null);
      onSelectThumbnail?.(null, null);
    } else if (thumbnailIndex !== null && index < thumbnailIndex) {
      setThumbnailIndex((prev) => (prev ?? 0) - 1);
    }
  };

  useEffect(() => {
    setFiles([]);
    setPreviewUrls([]);
    setThumbnailIndex(null);
    setDeletedDefaultIds([]);
  }, [resetKey]);

  return (
    <>
      <div className="flex flex-col gap-2">
        {label && (
          <label
            className={cn(
              "text-sm font-medium",
              error ? "text-danger" : "text-white",
            )}
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "rounded-md group relative",
            error
              ? "border-danger bg-danger-50 hover:bg-danger-100 transition-all"
              : "border-[hsl(var(--heroui-default-300))]",
          )}
        >
          <div
            className={cn(
              "grid gap-4",
              maxFiles === 1 || previewUrls.length === 0
                ? "grid-cols-1"
                : "grid-cols-1 sm:grid-cols-3 md:grid-cols-4",
            )}
          >
            {(!maxFiles || previewUrls.length < maxFiles) && (
              <div
                {...getRootProps()}
                className="flex flex-col items-center justify-center w-full h-56 cursor-pointer rounded-md border-2 border-dashed border-[hsl(var(--heroui-default-300))] bg-[hsl(var(--heroui-default-100))] hover:bg-[hsl(var(--heroui-default-200))] transition text-center"
              >
                <input {...getInputProps()} />
                <UploadCloud className="w-10 h-10 text-[hsl(var(--heroui-foreground-500))] mb-3" />
                <p className="text-sm text-[hsl(var(--heroui-foreground-600))]">
                  <span className="font-medium text-[hsl(var(--heroui-foreground))]">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-[hsl(var(--heroui-foreground-400))] mt-1">
                  {type === "video"
                    ? "MP4, MOV, WEBM, up to 100MB each"
                    : `PNG, JPG, up to ${maxSize || 5}MB each`}
                </p>
              </div>
            )}

            {previewUrls.map((url, index) =>
              !url ? null : (
                <div
                  key={index}
                  className="relative rounded overflow-hidden bg-[hsl(var(--heroui-default-200))] border flex flex-col items-center"
                >
                  {type === "video" ? (
                    <video
                      controls
                      className="object-scale-down w-full h-40 sm:h-56"
                      src={previewUrls[index]}
                    >
                      <track
                        default
                        kind="captions"
                        label="English"
                        src="captions.vtt"
                        srcLang="en"
                      />
                    </video>
                  ) : (
                    <Image
                      removeWrapper
                      alt={`preview-${index}`}
                      className="object-scale-down w-full h-40 sm:h-56 cursor-zoom-in"
                      src={url}
                      onClick={() => setZoomedImage(url)}
                    />
                  )}

                  <div className="absolute top-2 right-2 flex gap-1 z-10">
                    {(!maxFiles || maxFiles > 1) && type === "image" && (
                      <button
                        className="text-white bg-black/50 hover:bg-black/80 rounded-full p-1"
                        title="Set as thumbnail"
                        type="button"
                        onClick={() => handleSelectThumbnail(index)}
                      >
                        {thumbnailIndex === index ? (
                          <Star className="w-4 h-4 text-yellow-400" />
                        ) : (
                          <StarOff className="w-4 h-4" />
                        )}
                      </button>
                    )}
                    <button
                      className="text-white bg-red-500 hover:bg-red-600 rounded-full p-1"
                      title="Remove"
                      type="button"
                      onClick={() => handleRemove(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ),
            )}

            {error && <p className="mt-2 text-tiny text-danger">{error}</p>}
          </div>
        </div>
      </div>
      <Modal
        backdrop="blur"
        isOpen={!!zoomedImage}
        placement="center"
        size="full"
        onClose={() => setZoomedImage(null)}
      >
        <ModalContent>
          {() => (
            <>
              <ModalBody className="flex items-center justify-center">
                <Image
                  alt="Zoomed"
                  className="max-w-[90vw] max-h-[90vh] rounded-md shadow-lg"
                  src={zoomedImage!}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
