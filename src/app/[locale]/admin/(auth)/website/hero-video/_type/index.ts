import { z } from "zod";

export interface FormHandle {
  submit: () => void;
}

export type HeroVideoContextType = {
  formRef: React.RefObject<FormHandle>;
};

export const HeroVideoSchema = z.object({
  videoWeb: z
    .string()
    .min(1, "Video WebM is required")
    .regex(/\.(webm|mp4)$/, "Video WebM must be a .webm or .mp4 file"),
  videoMobile: z
    .string()
    .min(1, "Video MP4 is required")
    .regex(/\.(mp4|webm)$/, "Video MP4 must be a .mp4 or .webm file"),
});

export type HeroVideoSchemaFormValue = z.infer<typeof HeroVideoSchema>;
