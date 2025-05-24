"use client";

import {
  forwardRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  type ForwardRefRenderFunction,
} from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AboutUsFormValues, AboutUsSchema, FormHandle } from "../_type";
import { AlbumFormHandle } from "../../../portfolio/album/_type";
import { useAboutUsContext } from "../_context";
import { useMutateAboutUs } from "../_hooks/use-mutate-about-us";

import { RichTextEditor } from "@/app/[locale]/admin/_components";
import { showToast } from "@/utils/show-toast";

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
  const {
    formRef: sharedFormRef,
    onSetIsSubmitting,
    data: aboutUsData,
    onRefetch,
  } = useAboutUsContext(); // ⬅️ Ambil dari context
  const { mutate, isPending } = useMutateAboutUs();

  const onSubmit = useCallback(
    (data: AboutUsFormValues) => {
      mutate(
        {
          uuid: aboutUsData?.uuid,
          data,
        },
        {
          onSuccess: () => {
            form.reset();
            onSetIsSubmitting(false);

            showToast({
              type: "success",
              title: `${aboutUsData ? "Edit" : "Create"} Contact Information Success`,
              description: `Contact Information ${aboutUsData ? "edited" : "created"} successfully`,
            });

            onRefetch();
          },
          onError: (err: any) => {
            onSetIsSubmitting(false);

            showToast({
              type: "danger",
              title: `${aboutUsData ? "Edit" : "Create"} Contact Information failed`,
              description:
                err.message ||
                `Failed to ${aboutUsData ? "Edit" : "Create"} contact information`,
            });
          },
        },
      );
    },
    [aboutUsData],
  );

  useEffect(() => {
    if (sharedFormRef) {
      if (sharedFormRef && "current" in sharedFormRef) {
        (sharedFormRef as MutableRefObject<AlbumFormHandle>).current = {
          submit: () => formRef.current?.requestSubmit(),
        };
      }
    }
  }, [sharedFormRef]);

  useEffect(() => {
    onSetIsSubmitting(isPending);
  }, [isPending]);

  useEffect(() => {
    if (aboutUsData) {
      form.reset({
        aboutUsBriefHomeEn: aboutUsData.about_us_brief_home_en || "",
        aboutUsBriefHomeId: aboutUsData.about_us_brief_home_id || "",
        aboutUsEn: aboutUsData.about_us_en || "",
        aboutUsId: aboutUsData.about_us_id || "",
      });
    }
  }, [aboutUsData]);

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
