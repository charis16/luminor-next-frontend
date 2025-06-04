import { AlbumDetail } from "./album-lists";
import { CategoryDetail } from "./category-lists";
import { UserDetail } from "./user-lists";
import { FaqDetail } from "./faq-lists";
export interface WebsiteMetadataResponse {
  data: {
    uuid: string;
    address: string;
    phone_number: string;
    latitude: string;
    longitude: string;
    email: string;
    url_instagram: string;
    url_tiktok: string;
    is_published: boolean;
    about_us_brief_home_en: string;
    about_us_en: string;
    about_us_id: string;
    about_us_brief_home_id: string;
    video_web: string;
    video_mobile: string;
    meta_title: string;
    meta_desc: string;
    meta_keyword: string;
    og_image?: string;
    created_at: string;
    updated_at: string;
  } | null;
}

export interface AlbumLatestResponse {
  data: AlbumDetail[] | null;
}

export interface FaqPublishedResponse {
  data: FaqDetail[] | null;
}

export interface TeamMemberResponse {
  data: UserDetail[] | null;
}

export interface CategoryResponse {
  data: CategoryDetail[] | null;
}
export interface CategoryBySlugResponse {
  data: (CategoryDetail & { users?: UserDetail[] }) | null;
}

export interface AlbumDetailBySlugResponse {
  data: AlbumDetail | null;
}

export interface AlbumCategoryBySlugResponse {
  next: number;
  data: AlbumDetail[];
}

export interface UserBySlugResponse {
  data: {
    user: UserDetail | null;
    categories: CategoryDetail[] | null;
  };
}
