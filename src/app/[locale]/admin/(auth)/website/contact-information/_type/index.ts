import { z } from "zod";

export interface FormHandle {
  submit: () => void;
}

export type ContactInformationContextType = {
  formRef: React.RefObject<FormHandle>;
};

export const ContactInformationSchema = z.object({
  address: z.string().min(1, "Address is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  latitude: z
    .number()
    .min(-90, "Latitude must be greater than or equal to -90")
    .max(90, "Latitude must be less than or equal to 90"),
  longitude: z
    .number()
    .min(-180, "Longitude must be greater than or equal to -180")
    .max(180, "Longitude must be less than or equal to 180"),
  email: z.string().email("Invalid email address"),
  urlInstagram: z.string().optional(),
  urlTikTok: z.string().optional(),
});

export type ContactInformationSchemaFormValue = z.infer<
  typeof ContactInformationSchema
>;
