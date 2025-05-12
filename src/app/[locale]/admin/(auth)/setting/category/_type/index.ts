import { z } from "zod";

import { CategoryDetail } from "@/types/category-lists";

export const COLUMNS = [
  { name: "Category", uid: "category" },
  { name: "Actions", uid: "actions" },
] as const;

export type ColumnKey = (typeof COLUMNS)[number]["uid"];

export interface CategoryFormHandle {
  submit: () => void;
}

export type CategoryContextType = {
  categories: CategoryDetail[];
  search: string;
  isSubmitting: boolean;
  onSetIsSubmitting: (value: boolean) => void;
  setSearch: (value: string) => void;
  formRef: React.RefObject<CategoryFormHandle>;
  page: number;
  setPage: (page: number) => void;
  pages: number;
  isLoading: boolean;
  onRefetch: () => void;
};

export const PAGE_SIZE = 10;

export const CategorySchema = z.object({
  id: z.string().optional(),
  isPublished: z.boolean(),
  category: z.string().min(1, "Category is required"),
});

export type CategoryFormValues = z.infer<typeof CategorySchema>;
