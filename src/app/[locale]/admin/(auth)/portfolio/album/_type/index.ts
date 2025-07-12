import { z } from "zod";

import { AlbumDetail } from "@/types/album-lists";

export type Album = {
  id: number;
  category: string;
  slug: string;
  description: string;
  thumbnail: string;
  authorName: string;
  authorAvatar: string;
};

export const AlbumSchema = z.object({
  isPublished: z.boolean(),
  slug: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  author: z.string().min(1, "Author name is required"),
  description: z.string().min(1, "Description is required"),
  images: z.array(z.any()).optional(),
  thumbnail: z.any().nullable(),
  youtubeUrl: z.array(z.string()).optional(),
});

export type AlbumFormValues = z.infer<typeof AlbumSchema>;

export interface FormHandle {
  submit: () => void;
}

export type AlbumContextType = {
  albums: AlbumDetail[];
  search: string;
  setSearch: (value: string) => void;
  formRef: React.RefObject<FormHandle>;
  page: number;
  setPage: (page: number) => void;
  pages: number;
  isLoading: boolean;
  isSubmitting: boolean;
  onSetIsSubmitting: (value: boolean) => void;
  onRefetch: () => void;
};
