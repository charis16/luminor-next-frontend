import { z } from "zod";

import { ContactInformationDetail } from "@/types/contact-information";

export interface FormHandle {
  submit: () => void;
}

export type ContactInformationContextType = {
  formRef: React.RefObject<FormHandle>;
  data: ContactInformationDetail | null;
  isLoading: boolean;
  isSubmitting: boolean;
  onSetIsSubmitting: (value: boolean) => void;
  onRefetch: () => void;
};

export const ContactInformationSchema = z.object({
  address: z.string().min(1, "Address is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  urlInstagram: z.string().optional(),
  urlTikTok: z.string().optional(),
});

export type ContactInformationSchemaFormValue = z.infer<
  typeof ContactInformationSchema
>;
