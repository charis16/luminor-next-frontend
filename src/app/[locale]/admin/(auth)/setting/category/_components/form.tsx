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
import { addToast } from "@heroui/toast";

import {
  CategoryFormHandle,
  CategoryFormValues,
  CategorySchema,
} from "../_type";
import { useCategoryContext } from "../_context";
import { useCategoryByUUID } from "../_hooks/use-category-by-uuid";
import { useMutateCategory } from "../_hooks/use-mutate-category";

import { InputText } from "@/app/[locale]/admin/_components";

const CategoryForm: ForwardRefRenderFunction<CategoryFormHandle> = () => {
  const params = useParams();
  const uuid = params?.id as string | undefined;
  const { mutate, isPending } = useMutateCategory();
  const { data: category } = useCategoryByUUID(uuid);
  const router = useRouter();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      isPublished: true,
      category: "",
    },
  });

  const formRef = useRef<HTMLFormElement | null>(null);
  const { formRef: sharedFormRef, onSetIsSubmitting } = useCategoryContext(); // ⬅️ Ambil dari context

  const onSubmit = (data: CategoryFormValues) => {
    mutate(
      {
        uuid: category?.uuid,
        data,
      },
      {
        onSuccess: () => {
          form.reset();
          onSetIsSubmitting(false);
          router.back();

          addToast({
            title: `${category ? "Edit" : "Create"} Category Success`,
            description: `Category ${category ? "edited" : "created"} successfully`,
            color: "success",
          });
        },
        onError: (err: any) => {
          onSetIsSubmitting(false);

          addToast({
            title: `${category ? "Edit" : "Create"} Category failed`,
            description:
              err.message ||
              `Failed to ${category ? "Edit" : "Create"} category`,
            color: "danger",
          });
        },
      },
    );
  };

  useEffect(() => {
    if (sharedFormRef) {
      if (sharedFormRef && "current" in sharedFormRef) {
        (sharedFormRef as MutableRefObject<CategoryFormHandle>).current = {
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
    if (category) {
      form.reset({
        id: category.uuid,
        isPublished: category.is_published,
        category: category.name,
      });
    }
  }, [category]);

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {/* Published */}
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

      <Controller
        control={form.control}
        name="category"
        render={({ field, fieldState }) => (
          <InputText
            error={fieldState.error}
            field={field}
            label="Category"
            labelPlacement="outside"
            placeholder="ex: wedding"
          />
        )}
      />
    </form>
  );
};

export default forwardRef(CategoryForm);
