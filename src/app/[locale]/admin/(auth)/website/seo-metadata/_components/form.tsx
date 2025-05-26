"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";

import { FormHandle, SeoMetaDataFormValues, SeoMetaDataSchema } from "../_type";
import { useSeoMetadataContext } from "../_context";
import {
  useDeleteOgImageMetaData,
  useMutateSeoMetaData,
} from "../_hooks/use-mutate-seo-metadata";

import {
  DropzoneInput,
  FormTagInput,
  InputText,
} from "@/app/[locale]/admin/_components";
import InputTextArea from "@/app/[locale]/admin/_components/input-textarea";
import { showToast } from "@/utils/show-toast";

export default function SeoForm() {
  const {
    formRef: sharedFormRef,
    data: website,
    onRefetch,
    onSetIsSubmitting,
  } = useSeoMetadataContext();
  const { mutate, isPending } = useMutateSeoMetaData();
  const { mutate: mutateDeleteOgImage } = useDeleteOgImageMetaData();
  const form = useForm<SeoMetaDataFormValues>({
    resolver: zodResolver(SeoMetaDataSchema),
    defaultValues: {
      metaDescription: "",
      metaKeywords: [],
      metaTitle: "",
      ogImage: "",
    },
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const onSubmit = useCallback(
    async (data: SeoMetaDataFormValues) => {
      const isValid = await form.trigger(); // 👈 ini penting

      if (!isValid) return;

      mutate(
        {
          uuid: website?.uuid,
          data,
        },
        {
          onSuccess: () => {
            form.reset();
            onSetIsSubmitting(false);
            onRefetch;

            showToast({
              type: "success",
              title: `${website ? "Edit" : "Create"} Seo Success`,
              description: `User ${website ? "edited" : "created"} successfully`,
            });
          },
          onError: (err: any) => {
            onSetIsSubmitting(false);

            showToast({
              type: "danger",
              title: `${website ? "Edit" : "Create"} seo failed`,
              description:
                err.message || `Failed to ${website ? "Edit" : "Create"} seo`,
            });
          },
        },
      );
    },
    [website],
  );

  useEffect(() => {
    if (sharedFormRef) {
      if (sharedFormRef && "current" in sharedFormRef) {
        (sharedFormRef as MutableRefObject<FormHandle>).current = {
          submit: () => formRef.current?.requestSubmit(),
        };
      }
    }
  }, [sharedFormRef]);

  useEffect(() => {
    if (website) {
      form.reset({
        metaDescription: website.meta_desc,
        metaKeywords: website.meta_keyword.split(","),
        metaTitle: website.meta_title,
      });
    }
  }, [website]);

  useEffect(() => {
    onSetIsSubmitting(isPending);
  }, [isPending]);

  return (
    <form
      ref={formRef}
      className="grid grid-cols-1 gap-4 "
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Controller
        control={form.control}
        name="metaTitle"
        render={({ field, fieldState }) => (
          <InputText
            error={fieldState.error}
            field={field}
            label="Meta Title"
            placeholder="Ex: Luminor - Your Trusted Partner"
          />
        )}
      />

      <Controller
        control={form.control}
        name="metaDescription"
        render={({ field, fieldState }) => (
          <InputTextArea
            error={fieldState.error}
            field={field}
            label="Meta Description"
            placeholder="Ex: Discover Luminor's innovative solutions for your business needs."
            value={field.value}
            onClear={() => {
              field.onChange("");
            }}
          />
        )}
      />

      {/* keyword */}
      <Controller
        control={form.control}
        name="metaKeywords"
        render={({ field, fieldState }) => (
          <FormTagInput
            key={field.name}
            errorMessage={fieldState.error?.message}
            field={field}
            id="Keywords"
            isInvalid={!!fieldState.error}
            label="Meta Keywords"
          />
        )}
      />

      <Controller
        control={form.control}
        name="ogImage"
        render={({ field, fieldState }) => (
          <DropzoneInput
            defaultMedia={[{ id: website?.uuid, url: website?.og_image || "" }]}
            error={fieldState.error?.message}
            label="Photo"
            maxFiles={1}
            maxSize={2}
            type="image"
            onChange={(files) => {
              const file = files?.[0];

              if (file && file.size > 2 * 1024 * 1024) {
                form.setError("ogImage", {
                  type: "manual",
                  message: "Maximum file size is 2MB",
                });

                return;
              }

              field.onChange(files);
              form.clearErrors("ogImage");
            }}
            onDeleteDefault={() => {
              mutateDeleteOgImage(website?.uuid, {
                onSuccess: () => {
                  showToast({
                    type: "success",
                    title: "Delete Image Success",
                    description: "Image deleted successfully",
                  });
                  onRefetch();
                },
                onError: (err: any) => {
                  showToast({
                    type: "danger",
                    title: "Delete Image Failed",
                    description: err.message || "Failed to delete image",
                  });
                },
              });
            }}
          />
        )}
      />
    </form>
  );
}
