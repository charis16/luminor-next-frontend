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
import { useParams, useRouter } from "next/navigation";

import { useFaqContext } from "../_context";
import { FaqFormValues, FaqSchema, FormHandle } from "../_type";
import { useMutateFaq } from "../_hooks/use-mutate-faq";
import { useFaqByUUID } from "../_hooks/use-faq-by-uuid";

import { InputText, InputTextArea } from "@/app/[locale]/admin/_components";
import { showToast } from "@/utils/show-toast";

const CategoryForm: ForwardRefRenderFunction<FormHandle> = () => {
  const params = useParams();
  const uuid = params?.id as string | undefined;
  const { mutate, isPending } = useMutateFaq();
  const { data: faq } = useFaqByUUID(uuid);
  const router = useRouter();
  const form = useForm<FaqFormValues>({
    resolver: zodResolver(FaqSchema),
    defaultValues: {
      id: "",
      isPublished: true,
      answerID: "",
      questionID: "",
      answerEN: "",
      questionEN: "",
    },
  });

  const formRef = useRef<HTMLFormElement | null>(null);
  const {
    formRef: sharedFormRef,
    onSetIsSubmitting,
    onRefetch,
  } = useFaqContext(); // ⬅️ Ambil dari context

  const onSubmit = (data: FaqFormValues) => {
    mutate(
      {
        uuid: faq?.uuid,
        data,
      },
      {
        onSuccess: () => {
          form.reset();
          onRefetch();
          onSetIsSubmitting(false);
          router.back();

          showToast({
            type: "success",
            title: `${faq ? "Edit" : "Create"} Faq Success`,
            description: `Faq ${faq ? "edited" : "created"} successfully`,
          });
        },
        onError: (err: any) => {
          onSetIsSubmitting(false);

          showToast({
            type: "success",
            title: `${faq ? "Edit" : "Create"} Faq failed`,
            description:
              err.message || `Failed to ${faq ? "Edit" : "Create"} faq`,
          });
        },
      },
    );
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

  useEffect(() => {
    if (isPending) {
      onSetIsSubmitting(isPending);
    }
  }, [isPending]);

  useEffect(() => {
    if (faq) {
      form.reset({
        id: faq.uuid,
        isPublished: faq.is_published,
        answerEN: faq.answer_en,
        questionEN: faq.question_en,
        answerID: faq.answer_id,
        questionID: faq.question_id,
      });
    }
  }, [faq]);

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
            isSelected={field.value}
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
                defaultValue={field.value}
                error={fieldState.error}
                field={field}
                label="Answer (ID)"
                placeholder="Provide a detailed answer here..."
                value={field.value}
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
                defaultValue={field.value}
                error={fieldState.error}
                field={field}
                label="Answer (EN)"
                placeholder="Provide a detailed answer here..."
                value={field.value}
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
