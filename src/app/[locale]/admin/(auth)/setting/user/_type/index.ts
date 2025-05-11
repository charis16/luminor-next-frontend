import { z } from "zod";

import { User } from "@/types/user-lists";

export enum EnumRole {
  Photographer = "Photographer",
  Editor = "Editor",
  Assistant = "Assistant",
}

export const COLUMNS = [
  { name: "Name", uid: "name" },
  { name: "Email", uid: "email" },
  { name: "Role", uid: "role" },
  { name: "Actions", uid: "actions" },
] as const;

export type ColumnKey = (typeof COLUMNS)[number]["uid"];

export interface FormHandle {
  submit: () => void;
}

export type UserContextType = {
  users: User[];
  search: string;
  isSubmitting: boolean;
  onSetIsSubmitting: (value: boolean) => void;
  setSearch: (value: string) => void;
  formRef: React.RefObject<FormHandle>;
  page: number;
  setPage: (page: number) => void;
  pages: number;
  isLoading: boolean;
  onRefetch: () => void;
};

export const PAGE_SIZE = 10;

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

const PhotoSchema = z
  .array(
    z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "File size must be less than 2MB",
      })
      .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
        message: "Only JPEG, PNG, and GIF formats are allowed",
      }),
  )
  .max(1, { message: "Only one image allowed" })
  .optional();

export const UserSchema = z
  .object({
    isPublished: z.boolean(),
    canLogin: z.boolean(),
    photo: PhotoSchema,

    name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email format" }),

    description: z.string().optional(),
    phoneNumber: z.string().optional(),

    role: z.enum([EnumRole.Photographer, EnumRole.Editor, EnumRole.Assistant], {
      errorMap: () => ({ message: "Role is required" }),
    }),

    password: z.string().optional(),

    urlInstagram: z.string().optional(),
    urlTikTok: z.string().optional(),
    urlFacebook: z.string().optional(),
    urlYoutube: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.canLogin && (!data.password || data.password.length < 6)) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "Password must be at least 6 characters when login is enabled",
      });
    }
  });

export type UserFormValues = z.infer<typeof UserSchema>;
