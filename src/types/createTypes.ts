import type { UserProfile } from './authTypes';

export interface CreateState {
  collabs: UserProfile[];
  createLoading: boolean;
  createError: string | null;
}

export const initialCreateState: CreateState = {
  collabs: [],
  createLoading: false,
  createError: null,
};
