export type CategoryDetail = {
  uuid: string;
  name: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export interface CategoryListResponse {
  total: number;
  page: number;
  limit: number;
  data: CategoryDetail[];
}
