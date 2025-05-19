export type SeoMetaDataDetail = {
  uuid: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  og_image: string;
  created_at: string;
  updated_at: string;
};

export interface SeoMetaDataResponse {
  data: SeoMetaDataDetail;
}
