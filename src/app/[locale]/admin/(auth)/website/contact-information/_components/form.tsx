"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";

import {
  ContactInformationSchema,
  ContactInformationSchemaFormValue,
  FormHandle,
} from "../_type";
import { useContactInformationContext } from "../_context";
import { useMutateContactInformation } from "../_hooks/use-mutate-contact-information";

import { InputText, InputTextArea } from "@/app/[locale]/admin/_components";
import { showToast } from "@/utils/show-toast";

export default function Form() {
  const {
    formRef: sharedFormRef,
    data: contactInformationData,
    onSetIsSubmitting,
    onRefetch,
  } = useContactInformationContext();
  const { mutate, isPending } = useMutateContactInformation();
  const form = useForm<ContactInformationSchemaFormValue>({
    resolver: zodResolver(ContactInformationSchema),
    defaultValues: {
      address: "",
      phoneNumber: "",
      email: "",
      urlInstagram: "",
      urlTikTok: "",
    },
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const onSubmit = useCallback(
    (data: ContactInformationSchemaFormValue) => {
      mutate(
        {
          uuid: contactInformationData?.uuid,
          data,
        },
        {
          onSuccess: () => {
            form.reset();
            onSetIsSubmitting(false);

            showToast({
              type: "success",
              title: `${contactInformationData ? "Edit" : "Create"} Contact Information Success`,
              description: `Contact Information ${contactInformationData ? "edited" : "created"} successfully`,
            });

            onRefetch();
          },
          onError: (err: any) => {
            onSetIsSubmitting(false);

            showToast({
              type: "danger",
              title: `${contactInformationData ? "Edit" : "Create"} Contact Information failed`,
              description:
                err.message ||
                `Failed to ${contactInformationData ? "Edit" : "Create"} contact information`,
            });
          },
        },
      );
    },
    [contactInformationData],
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
    if (isPending) {
      onSetIsSubmitting(isPending);
    }
  }, [isPending]);

  useEffect(() => {
    if (contactInformationData) {
      form.reset({
        address: contactInformationData.address,
        phoneNumber: contactInformationData.phone_number,
        email: contactInformationData.email,
        urlInstagram: contactInformationData.url_instagram,
        urlTikTok: contactInformationData.url_tiktok,
      });
    }
  }, [contactInformationData]);

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
            placeholder="Ex: contact@luminor.com"
            type="email"
          />
        )}
      />

      <Controller
        control={form.control}
        name="address"
        render={({ field, fieldState }) => (
          <InputTextArea
            error={fieldState.error}
            field={field}
            label="Address"
            placeholder="Ex: Jl. Jendral Sudirman No. 1, Jakarta"
            value={field.value}
            onChange={field.onChange}
            onClear={() => {
              field.onChange("");
            }}
          />
        )}
      />
      <Controller
        control={form.control}
        name="phoneNumber"
        render={({ field, fieldState }) => (
          <InputText
            error={fieldState.error}
            field={field}
            label="Phone Number"
            placeholder="Ex: +62 1234 5678"
            type="tel"
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
            placeholder="www.instagram.com/luminor"
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
            placeholder="www.tiktok.com/@luminor"
          />
        )}
      />
    </form>
  );
}
