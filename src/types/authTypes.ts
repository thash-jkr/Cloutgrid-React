export interface UserProfile {
  id: number;
  name: string;
  username: string;
  email: string;
  bio?: string;
  user_type: string;
  profile_photo: string;
  followers_count: number;
  following_count: number;
}

export interface UserContainerDTO {
  user: UserProfile;
  area?: string;
  instagram_connected?: boolean;
  youtube_connected?: boolean;
  target_audience?: string;
  website?: string;
  is_following?: boolean;
  is_blocking?: boolean;
  is_blocker?: boolean;
}

export interface UserContainer {
  profile: UserProfile;
  area?: string;
  instagram_connected?: boolean;
  youtube_connected?: boolean;
  target_audience?: string;
  website?: string;
  is_following?: boolean;
  is_blocking?: boolean;
  is_blocker?: boolean;
}

export function mapUserContainer(dto: UserContainerDTO): UserContainer {
  const { user, ...rest } = dto;
  return { profile: user, ...rest };
}

export interface LoginResponseDTO {
  user: UserContainerDTO;
  access: string;
  refresh: string;
}

export interface LoginResponse {
  user: UserContainer;
  access: string;
  refresh: string;
}

export interface AuthState {
  isAuth: boolean;
  user: UserContainer | null;
  type: string | null;
  access: string | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export const initialAuthState: AuthState = {
  isAuth: false,
  user: null,
  type: null,
  access: null,
  isLoading: false,
  errorMessage: null,
};