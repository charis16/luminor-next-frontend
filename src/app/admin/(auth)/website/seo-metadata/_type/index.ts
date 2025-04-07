import { z } from "zod";

export interface FormHandle {
  submit: () => void;
}

export type SeoMetaDataContextType = {
  formRef: React.RefObject<FormHandle>;
};

export const SeoMetaDataSchema = z.object({
  metaTitle: z.string().min(1, "Meta title wajib diisi"),
  metaDescription: z.string().min(1, "Meta description wajib diisi"),
  metaKeywords: z.array(z.string()).optional(),
  ogImage: z.any().optional(),
});

export type SeoMetaDataFormValues = z.infer<typeof SeoMetaDataSchema>;
