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
import { Select, SelectItem } from "@heroui/select";
import { Switch } from "@heroui/switch";

import { AlbumFormHandle, AlbumFormValues, AlbumSchema } from "../_type";
import { useAlbumContext } from "../_context/album-context";

import { Dropzone } from "@/app/admin/_components/dropzone";
import RichTextEditor from "@/app/admin/_components/rich-text-editor";
import InputText from "@/app/admin/_components/input-text";

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
            error={fieldState.error}
            field={field}
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
          <InputText
            error={fieldState.error}
            field={field}
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
            <SelectItem key="Nature" className="outline-none">
              Nature
            </SelectItem>
            <SelectItem key="Architecture" className="outline-none">
              Architecture
            </SelectItem>
            <SelectItem key="People" className="outline-none">
              People
            </SelectItem>
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
            <SelectItem key="Alex Johnson" className="outline-none">
              Alex Johnson
            </SelectItem>
            <SelectItem key="Emily Smith" className="outline-none">
              Emily Smith
            </SelectItem>
            <SelectItem key="Michael Brown" className="outline-none">
              Michael Brown
            </SelectItem>
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
          <Dropzone
            label="Album Images"
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
