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

import { AlbumFormHandle, AlbumFormValues, AlbumSchema } from "../_type";
import { useAlbumContext } from "../_context/album-context";

import {
  DropzoneInput,
  InputText,
  RichTextEditor,
  SelectOption,
} from "@/app/[locale]/admin/_components";

const AlbumForm: ForwardRefRenderFunction<AlbumFormHandle> = () => {
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
  const { formRef: sharedFormRef } = useAlbumContext(); // ⬅️ Ambil dari context

  const onSubmit = (data: AlbumFormValues) => {
    const formData = new FormData();

    formData.append("is_publish", data.isPublished ? "publish" : "draft");
    formData.append("slug", data.slug ?? "untitled");
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("description", data.description);

    data.images.forEach((file) => {
      formData.append("images", file);
    });

    if (data.thumbnail) {
      formData.append("thumbnail", data.thumbnail);
    }

    Array.from(formData.entries()).forEach(([key, value]) => {
      // eslint-disable-next-line no-console
      console.log(key, value);
    });
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
            selectItems={[
              { value: "nature", label: "Nature" },
              { value: "architecture", label: "Architecture" },
              { value: "people", label: "People" },
            ]}
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
            selectItems={[
              { value: "alex", label: "Alex Johnson" },
              { value: "emily", label: "Emily Smith" },
              { value: "michael", label: "Michael Brown" },
            ]}
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
        render={({ field }) => (
          <DropzoneInput
            label="Album Images"
            type="image"
            onChange={(files) => field.onChange(files)}
            onSelectThumbnail={(file) =>
              form.setValue("thumbnail", file, { shouldValidate: true })
            }
          />
        )}
      />
    </form>
  );
};

export default forwardRef(AlbumForm);
