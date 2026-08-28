export interface InsightValue {
  value: number;
}

export interface ProfileInsightModel {
  id: string;
  name: string;
  title: string;
  period: string;
  description: string;
  total_value: InsightValue;
}

export interface InstagramPageModel {
  id: number;
  ig_user_id: string;
  username: string;
  profile_picture_url: string;
  followers: number;
  followings: number;
  media_count: number;
  insights_raw: ProfileInsightModel[];
  last_synced_at: string;
}

export interface MediaInsightModel {
  id: string;
  name: string;
  title: string;
  period: string;
  description: string;
  values: InsightValue[];
}

export interface InstagramMediaModel {
  id: number;
  owner: number;
  media_id: string;
  media_type: string;
  media_url: string;
  thumbnail_url: string;
  link: string;
  caption: string;
  like_count: number;
  comments_count: number;
  insights_raw: MediaInsightModel[];
}

export interface YoutubeChannelModel {
  id: number;
  title: string;
  channel_id: string;
  description: string;
  profile_picture_url: string;
  banner_url: string;
  subscriber_count: number;
  view_count: number;
  video_count: number;
}

export interface YoutubeMediaModel {
  id: number;
  media_id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  views: number;
  likes: number;
  comments: number;
}

export interface InstagramResponseModel {
  fb_page: string;
  ig_page: string;
}

export interface InstagramPageResponse {
  profile_data: InstagramPageModel;
}

export interface InstagramMediaResponse {
  media: InstagramMediaModel[];
}

export interface YoutubeChannelResponse {
  channel_data: YoutubeChannelModel;
}

export interface YoutubeMediaResponse {
  media_data: YoutubeMediaModel[];
}

export interface IntegrationState {
  instagramPage: InstagramPageModel | null;
  instagramMedia: InstagramMediaModel[];
  youtubeChannel: YoutubeChannelModel | null;
  youtubeMedia: YoutubeMediaModel[];

  otherInstagramPage: InstagramPageModel | null;
  otherInstagramMedia: InstagramMediaModel[];
  otherYoutubeChannel: YoutubeChannelModel | null;
  otherYoutubeMedia: YoutubeMediaModel[];

  integrationLoading: boolean;
  integrationError: string | null;
}

export const initialIntegrationState: IntegrationState = {
  instagramPage: null,
  instagramMedia: [],
  youtubeChannel: null,
  youtubeMedia: [],
  otherInstagramPage: null,
  otherInstagramMedia: [],
  otherYoutubeChannel: null,
  otherYoutubeMedia: [],
  integrationLoading: false,
  integrationError: null,
};
