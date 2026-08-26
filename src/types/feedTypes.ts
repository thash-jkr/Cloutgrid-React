import type { UserProfile } from './authTypes';

export interface NotificationModel {
  id: number;
  message: string;
  photo: string;
  is_read: boolean;
  created_at: string;
}

export interface PostModel {
  id: number;
  posted_by: UserProfile;
  collaboration?: UserProfile;
  like_count: number;
  comment_count: number;
  is_liked: boolean;
  image: string;
  aspect: string;
  caption: string;
}

export interface CommentModel {
  id: number;
  user: UserProfile;
  content: string;
  commented_at: string;
}

export interface LikeResponse {
  liked: boolean;
  like_count: number;
}

export interface PostResponse {
  results: PostModel[];
  next?: string;
}

export interface FeedState {
  posts: PostModel[];
  postsNextPageUrl: string | null;
  postsHasMore: boolean;
  comments: CommentModel[];
  notifications: NotificationModel[];
  feedLoading: boolean;
  feedError: string | null;
}