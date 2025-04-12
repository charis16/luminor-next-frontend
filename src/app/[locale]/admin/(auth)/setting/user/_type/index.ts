import { z } from "zod";

export enum EnumRole {
  Photographer = "Photographer",
  Editor = "Editor",
  Assistant = "Assistant",
}

export type User = {
  id: number;
  name: string;
  email: string;
  role: EnumRole;
};

export const COLUMNS = [
  { name: "Name", uid: "name" },
  { name: "Email", uid: "email" },
  { name: "Role", uid: "role" },
  { name: "Actions", uid: "actions" },
] as const;

export type ColumnKey = (typeof COLUMNS)[number]["uid"];

export const TEAMS: User[] = [
  {
    id: 1,
    name: "Ayla Hartanto",
    email: "ayla.hartanto@example.com",
    role: EnumRole.Photographer,
  },
  {
    id: 2,
    name: "Kevin Surya",
    email: "kevin.surya@example.com",
    role: EnumRole.Editor,
  },
  {
    id: 3,
    name: "Nina Ardiansyah",
    email: "nina.ardiansyah@example.com",
    role: EnumRole.Assistant,
  },
  {
    id: 4,
    name: "Dion Setiawan",
    email: "dion.setiawan@example.com",
    role: EnumRole.Photographer,
  },
  {
    id: 5,
    name: "Maya Prasetya",
    email: "maya.prasetya@example.com",
    role: EnumRole.Editor,
  },
];

export interface FormHandle {
  submit: () => void;
}

export type UserContextType = {
  users: User[];
  filteredUser: User[];
  search: string;
  setSearch: (value: string) => void;
  formRef: React.RefObject<FormHandle>;
  page: number;
  setPage: (page: number) => void;
  pages: number;
  isLoading: boolean;
};

export const PAGE_SIZE = 10;

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

const PhotoSchema = z
  .any()
  .refine((file: FileList | null) => file?.length === 1, {
    message: "Please upload a photo",
  })
  .refine(
    (file: FileList | null) => file?.[0] && file[0].size <= MAX_FILE_SIZE,
    {
      message: "File size must be less than 2MB",
    },
  )
  .refine(
    (file: FileList | null) =>
      file?.[0] && ALLOWED_IMAGE_TYPES.includes(file[0].type),
    {
      message: "Only JPEG, PNG, and GIF formats are allowed",
    },
  );

export const UserSchema = z
  .object({
    isPublished: z.boolean(),
    canLogin: z.boolean(),
    photo: PhotoSchema,

    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" }),

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
    console.log(data);
    if (data.canLogin && (!data.password || data.password.length < 6)) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "Password must be at least 6 characters when login is enabled",
      });
    }
  });

export type UserFormValues = z.infer<typeof UserSchema>;
