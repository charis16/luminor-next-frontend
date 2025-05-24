import { z } from "zod";

import { VideoDataDetail } from "@/types/video";

export interface FormHandle {
  submit: () => void;
}

export type HeroVideoContextType = {
  formRef: React.RefObject<FormHandle>;
  data: VideoDataDetail | null;
  isLoading: boolean;
  isSubmitting: boolean;
  onSetIsSubmitting: (value: boolean) => void;
  onRefetch: () => void;
};

export const HeroVideoSchema = z.object({
  videoWeb: z.any().optional(),
  videoMobile: z.any().optional(),
});

export type HeroVideoSchemaFormValue = z.infer<typeof HeroVideoSchema>;
