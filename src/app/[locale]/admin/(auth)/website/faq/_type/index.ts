import { z } from "zod";

import { FaqDetail } from "@/types/faq-lists";

export const COLUMNS = [
  { name: "Question", uid: "Question" },
  { name: "Answer", uid: "Answer" },
  { name: "Actions", uid: "actions" },
] as const;

export type ColumnKey = (typeof COLUMNS)[number]["uid"];

export interface FormHandle {
  submit: () => void;
}

export type FaqContextType = {
  faq: FaqDetail[];
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

export const PAGE_SIZE = 10;

export const FaqSchema = z.object({
  id: z.string().optional(),
  isPublished: z.boolean(),
  questionID: z.string().min(1, { message: "Question (ID) is required" }),
  answerID: z.string().min(1, { message: "Answer (ID) is required" }),
  questionEN: z.string().min(1, { message: "Question (EN) is required" }),
  answerEN: z.string().min(1, { message: "Answer (EN) is required" }),
});

export type FaqFormValues = z.infer<typeof FaqSchema>;
