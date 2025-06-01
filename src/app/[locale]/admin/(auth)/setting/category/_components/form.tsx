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

import {
  CategoryFormHandle,
  CategoryFormValues,
  CategorySchema,
} from "../_type";
import { useCategoryContext } from "../_context";
import { useCategoryByUUID } from "../_hooks/use-category-by-uuid";
import { useMutateCategory } from "../_hooks/use-mutate-category";
import { useDeleteImageCategory } from "../_hooks/use-delete-category";

import {
  DropzoneInput,
  InputText,
  InputTextArea,
} from "@/app/[locale]/admin/_components";
import { showToast } from "@/utils/show-toast";

const CategoryForm: ForwardRefRenderFunction<CategoryFormHandle> = () => {
  const params = useParams();
  const uuid = params?.id as string | undefined;
  const { mutate, isPending } = useMutateCategory();

  const { mutate: mutateDeleteImage } = useDeleteImageCategory();

  const { data: category, refetch } = useCategoryByUUID(uuid);
  const router = useRouter();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      isPublished: true,
      category: "",
      description: "",
      slug: "",
      image: null,
      id: uuid || undefined,
    },
  });

  const formRef = useRef<HTMLFormElement | null>(null);
  const {
    formRef: sharedFormRef,
    onSetIsSubmitting,
    onRefetch,
  } = useCategoryContext(); // ⬅️ Ambil dari context

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
          onRefetch();
          router.back();

          showToast({
            type: "success",
            title: `Category ${category ? "edit" : "create"}`,
            description: `Category ${category ? "edited" : "created"} successfully`,
          });
        },
        onError: (err: any) => {
          onSetIsSubmitting(false);

          showToast({
            type: "danger",
            title: `Category ${category ? "edit" : "create"}`,
            description:
              err.message ||
              `Failed to ${category ? "Edit" : "Create"} category`,
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
        description: category.description,
        slug: category.slug,
      });
    }
  }, [category]);

  console.log({ category });

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
        name="slug"
        render={({ field, fieldState }) => (
          <InputText
            error={fieldState.error}
            field={field}
            label="Slug"
            labelPlacement="outside"
            placeholder="ex: wedding"
          />
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

      <Controller
        control={form.control}
        name="description"
        render={({ field, fieldState }) => (
          <InputTextArea
            defaultValue={field.value}
            error={fieldState.error}
            field={field}
            label="Description"
            placeholder="Ex: Provide a brief description about the category."
            value={field.value}
            onClear={() => {
              field.onChange("");
            }}
          />
        )}
      />

      <Controller
        control={form.control}
        name="image"
        render={({ field, fieldState }) => (
          <DropzoneInput
            defaultMedia={[
              { id: category?.uuid, url: category?.photo_url || "" },
            ]}
            error={fieldState.error?.message}
            label="Image"
            maxFiles={1}
            maxSize={2}
            type="image"
            onChange={(files) => {
              const file = files?.[0];

              if (file && file.size > 2 * 1024 * 1024) {
                form.setError("image", {
                  type: "manual",
                  message: "Maximum file size is 2MB",
                });

                return;
              }

              field.onChange(files);
              form.clearErrors("image");
            }}
            onDeleteDefault={() => {
              mutateDeleteImage(
                {
                  uuid: category?.uuid,
                },
                {
                  onSuccess: () => {
                    showToast({
                      type: "success",
                      title: "Delete Image Success",
                      description: "Image deleted successfully",
                    });
                    refetch();
                  },
                  onError: (err: any) => {
                    showToast({
                      type: "danger",
                      title: "Delete Image Failed",
                      description: err.message || "Failed to delete image",
                    });
                  },
                },
              );
            }}
          />
        )}
      />
    </form>
  );
};

export default forwardRef(CategoryForm);
