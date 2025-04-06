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

import {
  CategoryFormHandle,
  CategoryFormValues,
  CategorySchema,
} from "../_type";
import { useCategoryContext } from "../_context/category-context";
import { AlbumFormHandle } from "../../album/_type";

import InputText from "@/app/admin/_components/input-text";

const CategoryForm: ForwardRefRenderFunction<CategoryFormHandle> = () => {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      isPublished: true,
      category: "",
    },
  });

  const formRef = useRef<HTMLFormElement | null>(null);
  const { formRef: sharedFormRef } = useCategoryContext(); // ⬅️ Ambil dari context

  const onSubmit = (data: CategoryFormValues) => {
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
      {/* Published */}
      {/* Slug */}
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
