import type { UserProfile } from './authTypes';

export interface AllUsersResponse {
  creators: UserProfile[];
  businesses: UserProfile[];
}

export interface SearchState {
  creators: UserProfile[];
  businesses: UserProfile[];
  searchLoading: boolean;
  searchError: string | null;
}