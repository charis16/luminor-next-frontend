import { EnumRole } from "./enums";

export type User = {
  uuid: string;
  name: string;
  email: string;
  role: EnumRole;
  photo: string;
};

export interface UserDetail {
  uuid: string;
  name: string;
  slug: string;
  email: string;
  role: string;
  description: string;
  phone_number: string;
  url_instagram: string;
  url_tiktok: string;
  url_facebook: string;
  url_youtube: string;
  is_published: boolean;
  photo_url: string; // presigned proxy URL
  can_login: boolean;
}

export interface UserListResponse {
  total: number;
  page: number;
  limit: number;
  data: User[];
}
