"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { MutableRefObject, useEffect, useRef } from "react";
import { Textarea } from "@heroui/input";

import {
  ContactInformationSchema,
  ContactInformationSchemaFormValue,
  FormHandle,
} from "../_type";
import { useContactInformationContext } from "../_context";

import { InputText } from "@/app/admin/_components";

export default function SeoForm() {
  const form = useForm<ContactInformationSchemaFormValue>({
    resolver: zodResolver(ContactInformationSchema),
    defaultValues: {
      address: "",
      phoneNumber: "",
      latitude: undefined,
      longitude: undefined,
      email: "",
      urlInstagram: "",
      urlTikTok: "",
    },
  });

  const formRef = useRef<HTMLFormElement | null>(null);
  const { formRef: sharedFormRef } = useContactInformationContext(); // ⬅️ Ambil dari context

  const onSubmit = (data: ContactInformationSchemaFormValue) => {
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
        name="email"
        render={({ field, fieldState }) => (
          <InputText
            error={fieldState.error}
            field={field}
            label="Email"
            labelPlacement="outside"
            placeholder="Ex: contact@luminor.com"
            type="email"
          />
        )}
      />

      <Controller
        control={form.control}
        name="address"
        render={({ field, fieldState }) => (
          <Textarea
            {...field}
            isClearable
            classNames={{
              inputWrapper:
                fieldState.invalid && "bg-danger-50 hover:bg-danger-100",
              input: fieldState.invalid && "placeholder:!text-danger-400",
            }}
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.invalid}
            label="Address"
            labelPlacement="outside"
            placeholder="Ex: Discover Luminor's innovative solutions for your business needs."
            size="lg"
            variant="bordered"
            onClear={() => {
              field.onChange("");
            }}
          />
        )}
      />

      <Controller
        control={form.control}
        name="latitude"
        render={({ field, fieldState }) => (
          <InputText
            error={fieldState.error}
            field={field}
            label="Latitude"
            labelPlacement="outside"
            placeholder="Ex: -6.200000"
            type="number"
          />
        )}
      />

      <Controller
        control={form.control}
        name="longitude"
        render={({ field, fieldState }) => (
          <InputText
            error={fieldState.error}
            field={field}
            label="Longitude"
            labelPlacement="outside"
            placeholder="Ex: -6.200000"
            type="number"
          />
        )}
      />

      <Controller
        control={form.control}
        name="urlInstagram"
        render={({ field, fieldState }) => (
          <InputText
            error={fieldState.error}
            field={field}
            label="Url Instagram"
            labelPlacement="outside"
            placeholder="www.instagram.com/luminor"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">https://</span>
              </div>
            }
          />
        )}
      />

      <Controller
        control={form.control}
        name="urlTikTok"
        render={({ field, fieldState }) => (
          <InputText
            error={fieldState.error}
            field={field}
            label="Url TikTok"
            labelPlacement="outside"
            placeholder="www.tiktok.com/@luminor"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">https://</span>
              </div>
            }
          />
        )}
      />
    </form>
  );
}
