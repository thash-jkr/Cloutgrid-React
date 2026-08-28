interface BaseUserProfile {
  id: number;
  name: string;
  email: string;
  username: string;
  profile_photo: string;
  bio?: string;
  followers_count: number;
  following_count: number;
  category?: string;
  is_following?: boolean;
  is_blocking?: boolean;
  is_blocker?: boolean;
}

export interface CreatorProfile extends BaseUserProfile {
  type: 'creator';
  instagram_connected: boolean;
  youtube_connected: boolean;
}

export interface BusinessProfile extends BaseUserProfile {
  type: 'business';
  website?: string;
}

export type UserProfile = CreatorProfile | BusinessProfile;

export interface LoginResponse {
  user: UserProfile;
  access: string;
  refresh: string;
}

export interface AuthState {
  isAuth: boolean;
  isInitializing: boolean;
  user: UserProfile | null;
  type: string | null;
  access: string | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export const initialAuthState: AuthState = {
  isAuth: false,
  isInitializing: true,
  user: null,
  type: null,
  access: null,
  isLoading: false,
  errorMessage: null,
};
