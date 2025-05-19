import { z } from "zod";

import { SeoMetaDataDetail } from "@/types/seo-metadata";

export interface FormHandle {
  submit: () => void;
}

export type SeoMetaDataContextType = {
  formRef: React.RefObject<FormHandle>;
  data: SeoMetaDataDetail | null;
  isLoading: boolean;
  isSubmitting: boolean;
  onSetIsSubmitting: (value: boolean) => void;
  onRefetch: () => void;
};

export const SeoMetaDataSchema = z.object({
  metaTitle: z.string().min(1, "Meta title wajib diisi"),
  metaDescription: z.string().min(1, "Meta description wajib diisi"),
  metaKeywords: z.array(z.string()).optional(),
  ogImage: z.any().optional(),
});

export type SeoMetaDataFormValues = z.infer<typeof SeoMetaDataSchema>;
