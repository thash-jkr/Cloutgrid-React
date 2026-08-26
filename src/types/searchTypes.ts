import type { UserProfile } from './authTypes';

export interface AllUsersResponse {
  creators: UserProfile[];
  businesses: UserProfile[];
}

export interface SearchState {
  suggestions: UserProfile[];
  results: UserProfile[];
  collabs: UserProfile[];
  searchLoading: boolean;
  searchError: string | null;
}

export const initialSearchState: SearchState = {
  suggestions: [],
  results: [],
  collabs: [],
  searchLoading: false,
  searchError: null,
};