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
  data:
    | {
        uuid: string;
        slug: string;
        title: string;
        description: string;
        thumbnail: string;
        is_published: boolean;
        created_at: string;
        updated_at: string;
      }[]
    | null;
}

export interface FaqPublishedResponse {
  data:
    | {
        uuid: string;
        question_id: string;
        question_en: string;
        answer_id: string;
        answer_en: string;
        is_published: boolean;
        created_at: string;
        updated_at: string;
      }[]
    | null;
}

export interface TeamMemberResponse {
  data:
    | {
        uuid: string;
        slug: string;
        name: string;
        email: string;
        photo: string;
        role: string;
        url_instagram: string;
        url_tiktok: string;
        url_facebook: string;
        url_youtube: string;
      }[]
    | null;
}

export interface CategoryResponse {
  data:
    | {
        uuid: string;
        name: string;
        slug: string;
        description: string;
        photo_url: string;
        is_published: boolean;
        created_at: string;
        updated_at: string;
      }[]
    | null;
}
