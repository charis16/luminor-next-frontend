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
import { Switch } from "@heroui/switch";

import { useFaqContext } from "../_context";
import { FaqFormValues, FaqSchema, FormHandle } from "../_type";

import { InputText, InputTextArea } from "@/app/[locale]/admin/_components";

const CategoryForm: ForwardRefRenderFunction<FormHandle> = () => {
  const form = useForm<FaqFormValues>({
    resolver: zodResolver(FaqSchema),
    defaultValues: {
      isPublished: true,
      answerID: "",
      questionID: "",
      answerEN: "",
      questionEN: "",
    },
  });

  const formRef = useRef<HTMLFormElement | null>(null);
  const { formRef: sharedFormRef } = useFaqContext(); // ⬅️ Ambil dari context

  const onSubmit = (data: FaqFormValues) => {
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
      className="flex flex-col gap-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Controller
        control={form.control}
        name="isPublished"
        render={({ field }) => (
          <Switch
            ref={field.ref}
            aria-label="published"
            checked={field.value}
            defaultSelected={field.value}
            name={field.name}
            size="md"
            onBlur={field.onBlur}
            onChange={field.onChange}
          >
            {field.value ? "Published" : "Draft"}
          </Switch>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <Controller
            control={form.control}
            name="questionID"
            render={({ field, fieldState }) => (
              <InputText
                error={fieldState.error}
                field={field}
                label="Question (ID)"
                placeholder="What is your question?"
                onClear={() => {
                  field.onChange("");
                }}
              />
            )}
          />
          <Controller
            control={form.control}
            name="answerID"
            render={({ field, fieldState }) => (
              <InputTextArea
                error={fieldState.error}
                field={field}
                label="Answer (ID)"
                placeholder="Provide a detailed answer here..."
                onClear={() => {
                  field.onChange("");
                }}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Controller
            control={form.control}
            name="questionEN"
            render={({ field, fieldState }) => (
              <InputText
                error={fieldState.error}
                field={field}
                label="Question (EN)"
                placeholder="What is your question?"
                onClear={() => {
                  field.onChange("");
                }}
              />
            )}
          />
          <Controller
            control={form.control}
            name="answerEN"
            render={({ field, fieldState }) => (
              <InputTextArea
                error={fieldState.error}
                field={field}
                label="Answer (EN)"
                placeholder="Provide a detailed answer here..."
                onClear={() => {
                  field.onChange("");
                }}
              />
            )}
          />
        </div>
      </div>
    </form>
  );
};

export default forwardRef(CategoryForm);
