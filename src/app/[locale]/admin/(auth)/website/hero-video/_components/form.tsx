"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { MutableRefObject, useEffect, useRef } from "react";

import {
  FormHandle,
  HeroVideoSchema,
  HeroVideoSchemaFormValue,
} from "../_type";
import { useHeroVideoContext } from "../_context";

import { DropzoneInput } from "@/app/[locale]/admin/_components";

export default function Form() {
  const form = useForm<HeroVideoSchemaFormValue>({
    resolver: zodResolver(HeroVideoSchema),
    defaultValues: {
      videoMobile: "",
      videoWeb: "",
    },
  });

  const formRef = useRef<HTMLFormElement | null>(null);
  const { formRef: sharedFormRef } = useHeroVideoContext(); // ⬅️ Ambil dari context

  const onSubmit = (data: HeroVideoSchemaFormValue) => {
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
        name="videoWeb"
        render={({ field }) => (
          <DropzoneInput
            label="Video (Web Version)"
            maxFiles={1}
            type="video"
            onChange={(files) => field.onChange(files)}
          />
        )}
      />

      <Controller
        control={form.control}
        name="videoMobile"
        render={({ field }) => (
          <DropzoneInput
            label="Video (Mobile Version)"
            maxFiles={1}
            type="video"
            onChange={(files) => field.onChange(files)}
          />
        )}
      />
    </form>
  );
}
