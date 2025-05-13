export type FaqDetail = {
  uuid: string;
  answer_id: string;
  answer_en: string;
  question_id: string;
  question_en: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export interface FaqListResponse {
  total: number;
  page: number;
  limit: number;
  data: FaqDetail[];
}
