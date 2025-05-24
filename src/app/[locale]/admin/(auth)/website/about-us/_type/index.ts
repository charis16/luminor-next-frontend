import { z } from "zod";

import { AboutUsDetail } from "@/types/about-us";

export interface FormHandle {
  submit: () => void;
}

export type AboutUsContextType = {
  formRef: React.RefObject<FormHandle>;
  data: AboutUsDetail | null;
  isLoading: boolean;
  isSubmitting: boolean;
  onSetIsSubmitting: (value: boolean) => void;
  onRefetch: () => void;
};

export const AboutUsSchema = z.object({
  aboutUsBriefHomeEn: z.string().min(1, "About Us Brief Home En is required"),
  aboutUsBriefHomeId: z
    .string()
    .min(1, "About Us Brief Home Indonesia is required"),
  aboutUsEn: z.string().min(1, "About Us English is required"),
  aboutUsId: z.string().min(1, "About Us Indonesia is required"),
});

export type AboutUsFormValues = z.infer<typeof AboutUsSchema>;
