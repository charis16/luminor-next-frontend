export type VideoDataDetail = {
  uuid: string;
  video_web: string;
  video_mobile: string;
  created_at: string;
  updated_at: string;
};

export interface VideoResponse {
  data: SeoMetaDataDetail;
}
