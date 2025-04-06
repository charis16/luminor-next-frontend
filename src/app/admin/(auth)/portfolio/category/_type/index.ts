import { z } from "zod";

export type Category = {
  id: number;
  category: string;
};

export const COLUMNS = [
  { name: "Category", uid: "category" },
  { name: "Actions", uid: "actions" },
] as const;

export type ColumnKey = (typeof COLUMNS)[number]["uid"];

export const CATEGORIES: Category[] = [
  {
    id: 1,
    category: "Vacation",
  },
  {
    id: 2,
    category: "Wedding",
  },
  {
    id: 3,
    category: "Nature",
  },
];

export interface CategoryFormHandle {
  submit: () => void;
}

export type CategoryContextType = {
  categories: Category[];
  filteredCategories: Category[];
  search: string;
  setSearch: (value: string) => void;
  formRef: React.RefObject<CategoryFormHandle>;
  page: number;
  setPage: (page: number) => void;
  pages: number;
  isLoading: boolean;
};

export const PAGE_SIZE = 10;

export const CategorySchema = z.object({
  isPublished: z.boolean(),
  category: z.string().min(1, "Category is required"),
});

export type CategoryFormValues = z.infer<typeof CategorySchema>;
