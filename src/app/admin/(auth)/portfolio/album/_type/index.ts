import { z } from "zod";

export type Album = {
  id: number;
  category: string;
  slug: string;
  description: string;
  thumbnail: string;
  authorName: string;
  authorAvatar: string;
};

export const ALBUMS: Album[] = [
  {
    id: 1,
    category: "Vacation",
    slug: "vacation",
    description: "Photos from my vacation",
    thumbnail: "https://heroui.com/images/card-example-5.jpeg",
    authorName: "John Doe",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    category: "Wedding",
    slug: "wedding",
    description: "Wedding ceremony memories",
    thumbnail: "https://heroui.com/images/card-example-3.jpeg",
    authorName: "Jane Smith",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    category: "Nature",
    slug: "nature",
    description: "Beautiful nature shots",
    thumbnail: "https://heroui.com/images/card-example-4.jpeg",
    authorName: "Alex Johnson",
    authorAvatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

export const AlbumSchema = z.object({
  isPublished: z.boolean(),
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  author: z.string().min(1, "Author name is required"),
  description: z.string().min(1, "Description is required"),
  images: z.array(z.any()).min(1, "At least one image is required"),
  thumbnail: z.any().nullable(),
});

export type AlbumFormValues = z.infer<typeof AlbumSchema>;

export interface AlbumFormHandle {
  submit: () => void;
}

export type AlbumContextType = {
  albums: Album[];
  filteredAlbums: Album[];
  search: string;
  setSearch: (value: string) => void;
  formRef: React.RefObject<AlbumFormHandle>;
};
