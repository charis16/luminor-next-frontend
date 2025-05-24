export type SeoMetaDataDetail = {
  uuid: string;
  meta_title: string;
  meta_desc: string;
  meta_keyword: string;
  og_image: string;
  created_at: string;
  updated_at: string;
};

export interface SeoMetaDataResponse {
  data: SeoMetaDataDetail;
}
