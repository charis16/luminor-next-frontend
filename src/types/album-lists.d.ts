export type AlbumDetail = {
  uuid: string;
  slug: string;
  title: string;
  category_id: string;
  category_name: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  description: string;
  thumbnail: string;
  images: string[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export interface AlbumListResponse {
  total: number;
  page: number;
  limit: number;
  data: AlbumDetail[];
}
