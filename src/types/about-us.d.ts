export type AboutUsDetail = {
  uuid: string;
  about_us_brief_home_en: string;
  about_us_en: string;
  about_us_brief_home_id: string;
  about_us_id: string;
  created_at: string;
  updated_at: string;
};

export interface AboutUsDetailResponse {
  data: AboutUsDetail;
}
