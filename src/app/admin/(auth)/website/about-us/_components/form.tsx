"use client";

import {
  forwardRef,
  MutableRefObject,
  useEffect,
  useRef,
  type ForwardRefRenderFunction,
} from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AboutUsFormValues, AboutUsSchema, FormHandle } from "../_type";
import { AlbumFormHandle } from "../../../portfolio/album/_type";
import { useAboutUsContext } from "../_context/about-us-context";

import RichTextEditor from "@/app/admin/_components/rich-text-editor";

const AboutUsForm: ForwardRefRenderFunction<FormHandle> = () => {
  const form = useForm<AboutUsFormValues>({
    resolver: zodResolver(AboutUsSchema),
    defaultValues: {
      aboutUsBriefHomeEn: "",
      aboutUsBriefHomeId: "",
      aboutUsEn: "",
      aboutUsId: "",
    },
  });

  const formRef = useRef<HTMLFormElement | null>(null);
  const { formRef: sharedFormRef } = useAboutUsContext(); // ⬅️ Ambil dari context

  const onSubmit = (data: AboutUsFormValues) => {
    console.log(data);
  };

  useEffect(() => {
    if (sharedFormRef) {
      if (sharedFormRef && "current" in sharedFormRef) {
        (sharedFormRef as MutableRefObject<AlbumFormHandle>).current = {
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
      {/* Description */}
      <Controller
        control={form.control}
        name="aboutUsBriefHomeEn"
        render={({ field, fieldState }) => (
          <RichTextEditor
            errorMessage={fieldState.error?.message}
            field={field}
            id={field.name}
            isInvalid={!!fieldState.error}
            label="About Us Brief (EN)"
            placeholder="Tulis deskripsi about us pendek dalam bahasa inggris..."
          />
        )}
      />

      <Controller
        control={form.control}
        name="aboutUsBriefHomeId"
        render={({ field, fieldState }) => (
          <RichTextEditor
            errorMessage={fieldState.error?.message}
            field={field}
            id={field.name}
            isInvalid={!!fieldState.error}
            label="About Us Brief (ID)"
            placeholder="Tulis deskripsi about us pendek dalam bahasa indonesia..."
          />
        )}
      />

      <Controller
        control={form.control}
        name="aboutUsEn"
        render={({ field, fieldState }) => (
          <RichTextEditor
            errorMessage={fieldState.error?.message}
            field={field}
            id={field.name}
            isInvalid={!!fieldState.error}
            label="About Us (EN)"
            placeholder="Tulis deskripsi about us dalam bahasa inggris..."
          />
        )}
      />

      <Controller
        control={form.control}
        name="aboutUsId"
        render={({ field, fieldState }) => (
          <RichTextEditor
            errorMessage={fieldState.error?.message}
            field={field}
            id={field.name}
            isInvalid={!!fieldState.error}
            label="About Us (ID)"
            placeholder="Tulis deskripsi about us dalam bahasa indonesia..."
          />
        )}
      />
    </form>
  );
};

export default forwardRef(AboutUsForm);
