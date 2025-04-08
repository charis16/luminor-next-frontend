"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Star, StarOff, Trash2, UploadCloud, X } from "lucide-react";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { cn } from "@heroui/theme";

interface DropzoneProps {
  label?: string;
  onChange: (images: File[]) => void;
  onSelectThumbnail?: (file: File | null) => void;
  maxFiles?: number;
}

export default function Dropzone({
  label,
  onChange,
  onSelectThumbnail,
  maxFiles,
}: DropzoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [thumbnailIndex, setThumbnailIndex] = useState<number | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      let newFiles = [...files, ...acceptedFiles];

      if (maxFiles !== undefined) newFiles = newFiles.slice(0, maxFiles);

      setFiles(newFiles);
      onChange(newFiles);
    },
    [files, maxFiles, onChange],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: { "image/*": [] },
    multiple: !maxFiles || maxFiles > 1,
    disabled: maxFiles !== undefined && files.length >= maxFiles,
  });

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));

    setPreviewUrls(urls);

    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  useEffect(() => {
    if (files.length === 0) {
      setThumbnailIndex(null);
      onSelectThumbnail?.(null);
    } else if (
      files.length === 1 ||
      (files.length > 1 && thumbnailIndex === null)
    ) {
      setThumbnailIndex(0);
      onSelectThumbnail?.(files[0]);
    }
  }, [files, thumbnailIndex, onSelectThumbnail]);

  const handleSelectThumbnail = (index: number) => {
    setThumbnailIndex(index);
    onSelectThumbnail?.(files[index]);
  };

  const handleRemove = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);

    setFiles(newFiles);
    onChange(newFiles);

    if (thumbnailIndex === index) {
      setThumbnailIndex(null);
      onSelectThumbnail?.(null);
    } else if (thumbnailIndex !== null && index < thumbnailIndex) {
      setThumbnailIndex((prev) => (prev ?? 0) - 1);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-white">{label}</label>
      )}

      <div className="rounded-md bg-[hsl(var(--heroui-default-100))] p-4 group relative">
        <div
          className={cn(
            "grid gap-4",
            maxFiles === 1 || files.length === 0
              ? "grid-cols-1"
              : "grid-cols-1 sm:grid-cols-3 md:grid-cols-4",
          )}
        >
          {/* Upload box */}
          {(!maxFiles || files.length < maxFiles) && (
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
                PNG, JPG, up to 5MB each
              </p>
            </div>
          )}

          {/* Image previews */}
          {files.map((_, index) => (
            <div
              key={index}
              className="relative rounded overflow-hidden bg-[hsl(var(--heroui-default-200))] border flex flex-col items-center"
            >
              <Image
                removeWrapper
                alt={`preview-${index}`}
                className="object-scale-down w-full h-40 sm:h-56 cursor-zoom-in"
                src={previewUrls[index]}
                onClick={() => setZoomedImage(previewUrls[index])}
              />
              <div className="absolute top-2 right-2 flex gap-1 z-10">
                {/* Show thumbnail toggle only if more than 1 allowed */}
                {(!maxFiles || maxFiles > 1) && (
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
                  title="Remove image"
                  type="button"
                  onClick={() => handleRemove(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Zoom Modal */}
        {zoomedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            role="button"
            tabIndex={0}
            onClick={() => setZoomedImage(null)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setZoomedImage(null);
            }}
          >
            <Image
              alt="Zoomed"
              className="max-w-[90vw] max-h-[90vh] rounded-md shadow-lg"
              src={zoomedImage}
            />
            <Button
              isIconOnly
              aria-label="Close"
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1"
              onPress={() => setZoomedImage(null)}
            >
              <X />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
