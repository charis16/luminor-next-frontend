"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { MutableRefObject, useEffect, useRef } from "react";

import { FormHandle, SeoMetaDataFormValues, SeoMetaDataSchema } from "../_type";
import { useSeoMetadataContext } from "../_context";

import {
  DropzoneInput,
  FormTagInput,
  InputText,
} from "@/app/[locale]/admin/_components";
import InputTextArea from "@/app/[locale]/admin/_components/input-textarea";

export default function SeoForm() {
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
  const { formRef: sharedFormRef } = useSeoMetadataContext(); // ⬅️ Ambil dari context

  const onSubmit = (data: SeoMetaDataFormValues) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  useEffect(() => {
    if (sharedFormRef) {
      if (sharedFormRef && "current" in sharedFormRef) {
        (sharedFormRef as MutableRefObject<FormHandle>).current = {
          submit: () => formRef.current?.requestSubmit(),
        };
      }
    }
  }, [sharedFormRef]);

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
        render={({ field }) => (
          <DropzoneInput
            label="Meta Image"
            maxFiles={1}
            onChange={(files) => field.onChange(files)}
          />
        )}
      />
    </form>
  );
}
