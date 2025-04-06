"use client";

import {
  forwardRef,
  MutableRefObject,
  useEffect,
  useRef,
  type ForwardRefRenderFunction,
} from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

import { AlbumFormHandle, useAlbumContext } from "../_context/album-context";

import { Dropzone } from "@/app/admin/_components/dropzone";
import RichTextEditor from "@/app/admin/_components/rich-text-editor";

const AlbumSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  author: z.string().min(1, "Author name is required"),
  description: z.string().min(1, "Description is required"),
  images: z.array(z.any()).min(1, "At least one image is required"),
  thumbnail: z.any().nullable(),
});

type AlbumFormValues = z.infer<typeof AlbumSchema>;

const AlbumForm: ForwardRefRenderFunction<AlbumFormHandle> = () => {
  const form = useForm<AlbumFormValues>({
    resolver: zodResolver(AlbumSchema),
    defaultValues: {
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

    formData.append("slug", data.slug);
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
      {/* Slug */}
      <Controller
        control={form.control}
        name="slug"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
            label="Slug"
            labelPlacement="outside"
            placeholder="ex: nature-collection"
          />
        )}
      />

      {/* Title */}
      <Controller
        control={form.control}
        name="title"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
            label="Title"
            labelPlacement="outside"
            placeholder="ex: nature collection"
          />
        )}
      />

      {/* Category */}
      <Controller
        control={form.control}
        name="category"
        render={({ field, fieldState }) => (
          <Select
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
            label="Category"
            labelPlacement="outside"
            placeholder="Pilih kategori"
            selectedKeys={[field.value]}
            onSelectionChange={(keys) =>
              field.onChange(Array.from(keys)[0] as string)
            }
          >
            <SelectItem key="Nature">Nature</SelectItem>
            <SelectItem key="Architecture">Architecture</SelectItem>
            <SelectItem key="People">People</SelectItem>
          </Select>
        )}
      />

      {/* Author */}
      <Controller
        control={form.control}
        name="author"
        render={({ field, fieldState }) => (
          <Select
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
            label="Author"
            labelPlacement="outside"
            placeholder="Pilih author"
            selectedKeys={[field.value]}
            onSelectionChange={(keys) =>
              field.onChange(Array.from(keys)[0] as string)
            }
          >
            <SelectItem key="Alex Johnson">Alex Johnson</SelectItem>
            <SelectItem key="Emily Smith">Emily Smith</SelectItem>
            <SelectItem key="Michael Brown">Michael Brown</SelectItem>
          </Select>
        )}
      />

      {/* Description */}
      <Controller
        control={form.control}
        name="description"
        render={({ field }) => (
          <RichTextEditor
            field={field}
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
          <Dropzone
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
