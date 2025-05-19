export type ContactInformationDetail = {
  uuid: string;
  email: string;
  address: string;
  phone_number: string;
  latitude: number;
  longitude: number;
  url_instagram: string;
  url_tiktok: string;
  created_at: string;
  updated_at: string;
};

export interface ContactInformationResponse {
  data: ContactInformationDetail;
}
