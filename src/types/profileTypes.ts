import type { UserProfile } from './authTypes';
import type { PostModel } from './feedTypes';

export interface ProfileState {
  posts: PostModel[];
  collabs: PostModel[];
  otherPosts: PostModel[];
  otherCollabs: PostModel[];
  otherProfile: UserProfile | null;
  profile: boolean; // true once own posts have loaded at least once
  profileLoading: boolean;
  profileError: string | null;
}

export const initialProfileState: ProfileState = {
  posts: [],
  collabs: [],
  otherPosts: [],
  otherCollabs: [],
  otherProfile: null,
  profile: false,
  profileLoading: false,
  profileError: null,
};