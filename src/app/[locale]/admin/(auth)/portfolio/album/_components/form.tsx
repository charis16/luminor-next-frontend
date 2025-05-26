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
import { Switch } from "@heroui/switch";
import { useParams, useRouter } from "next/navigation";

import { AlbumFormValues, AlbumSchema, FormHandle } from "../_type";
import { useAlbumByUUID } from "../_hooks/use-album-by-uuid";
import { useAlbumContext } from "../_context";
import { useMutateAlbum } from "../_hooks/use-mutate-album";
import { useCategoryOption } from "../../../setting/category/_hooks/use-category-options";
import { useUserOption } from "../../../setting/user/_hooks/use-user-options";

import {
  DropzoneInput,
  InputText,
  RichTextEditor,
  SelectOption,
} from "@/app/[locale]/admin/_components";
import { showToast } from "@/utils/show-toast";

const AlbumForm: ForwardRefRenderFunction<FormHandle> = () => {
  const params = useParams();
  const uuid = params?.id as string | undefined;
  const { formRef: sharedFormRef, onSetIsSubmitting } = useAlbumContext();
  const { data: album } = useAlbumByUUID(uuid);
  const { mutate, isPending } = useMutateAlbum();
  const router = useRouter();
  const { data: categoryOptions } = useCategoryOption();
  const { data: userOptions } = useUserOption();

  const form = useForm<AlbumFormValues>({
    resolver: zodResolver(AlbumSchema),
    defaultValues: {
      isPublished: true,
      slug: "",
      title: "",
      category: "",
      author: "",
      description: "",
      images: [],
      thumbnail: null,
    },
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const onSubmit = useCallback(
    (data: AlbumFormValues) => {
      // const formData = new FormData();
      // formData.append("is_publish", data.isPublished ? "publish" : "draft");
      // formData.append("slug", data.slug ?? "untitled");
      // formData.append("title", data.title);
      // formData.append("category", data.category);
      // formData.append("author", data.author);
      // formData.append("description", data.description);
      // data.images.forEach((file) => {
      //   formData.append("images", file);
      // });
      // if (data.thumbnail) {
      //   formData.append("thumbnail", data.thumbnail);
      // }
      // Array.from(formData.entries()).forEach(([key, value]) => {
      //   // eslint-disable-next-line no-console
      //   console.log(key, value);
      // });

      mutate(
        {
          uuid: album?.uuid,
          data,
        },
        {
          onSuccess: () => {
            form.reset();
            router.back();

            showToast({
              type: "success",
              title: `${album ? "Edit" : "Create"} Album Success`,
              description: `User ${album ? "edited" : "created"} successfully`,
            });
          },
          onError: (err: any) => {
            showToast({
              type: "danger",
              title: `${album ? "Edit" : "Create"} Album failed`,
              description:
                err.message || `Failed to ${album ? "Edit" : "Create"} album`,
            });
          },
        },
      );
    },
    [album],
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
    onSetIsSubmitting(isPending);
  }, [isPending]);

  useEffect(() => {
    if (album) {
      form.reset({
        isPublished: album.is_published,
        slug: album.slug,
        title: album.title,
        category: album.category_id,
        description: album.description,
        author: album.user_id,
      });
    }
  }, [album]);

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
        name="slug"
        render={({ field, fieldState }) => (
          <InputText
            description="Slug is used for SEO and URL purposes. It should be unique and descriptive. If left empty, it will be generated from the title."
            error={fieldState.error}
            field={{
              ...field,
              onBlur: () => {
                if (!field.value) {
                  const generatedSlug = form
                    .getValues("title")
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, "");
                  const timestamp = new Date().getTime();

                  field.onChange(generatedSlug || `untitled-${timestamp}`);
                }
                field.onBlur();
              },
            }}
            label="Slug"
            placeholder="ex: nature-collection"
          />
        )}
      />
      <Controller
        control={form.control}
        name="title"
        render={({ field, fieldState }) => (
          <InputText
            error={fieldState.error}
            field={field}
            label="Title"
            placeholder="ex: nature collection"
          />
        )}
      />

      {/* Category */}
      <Controller
        control={form.control}
        name="category"
        render={({ field, fieldState }) => (
          <SelectOption
            error={fieldState.error}
            field={field}
            label="Category"
            placeholder="Select Category"
            selectItems={
              categoryOptions
                ? categoryOptions.map((category) => ({
                    value: category.uuid,
                    label: category.name,
                  }))
                : []
            }
            selectedValue={field.value}
          />
        )}
      />

      {/* Author */}
      <Controller
        control={form.control}
        name="author"
        render={({ field, fieldState }) => (
          <SelectOption
            error={fieldState.error}
            field={field}
            label="Author"
            placeholder="Select Author"
            selectItems={
              userOptions
                ? userOptions.map((user) => ({
                    value: user.uuid,
                    label: user.name,
                  }))
                : []
            }
            selectedValue={field.value}
          />
        )}
      />

      {/* Description */}
      <Controller
        control={form.control}
        name="description"
        render={({ field }) => (
          <RichTextEditor
            field={field}
            id={field.name}
            label="Album Description"
            placeholder="Tulis deskripsi album..."
          />
        )}
      />

      {/* Dropzone */}
      <Controller
        control={form.control}
        name="images"
        render={({ field, fieldState }) => (
          <DropzoneInput
            defaultMedia={[
              album?.thumbnail,
              ...(album?.images ?? []).filter(
                (img) => img !== album?.thumbnail,
              ),
            ]
              .filter((url): url is string => typeof url === "string" && !!url)
              .map((url) => ({ id: album?.uuid ?? "", url }))}
            error={fieldState.error?.message}
            label="Album Images"
            type="image"
            onChange={(files) => field.onChange(files)}
            onSelectThumbnail={(file) => {
              // Set thumbnail
              form.setValue("thumbnail", file, { shouldValidate: true });

              // Jika file yang dipilih thumbnail juga ada di images, hapus
              const currentImages = form.getValues("images");

              if (currentImages) {
                const filteredImages = currentImages.filter(
                  (img: File) => img !== file,
                );

                form.setValue("images", filteredImages, {
                  shouldValidate: true,
                });
              }
            }}
          />
        )}
      />
    </form>
  );
};

export default forwardRef(AlbumForm);
