import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '@/app/client';
import { initialSearchState, type AllUsersResponse } from '@/types/searchTypes';
import type { UserProfile } from '@/types/authTypes';

export const fetchSuggestions = createAsyncThunk<UserProfile[], void, { rejectValue: string }>(
  'search/fetchSuggestions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<UserProfile[]>('/suggestions');
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const handleSearch = createAsyncThunk<UserProfile[], string, { rejectValue: string }>(
  'search/handleSearch',
  async (query, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<AllUsersResponse>('/search', { params: { q: query } });
      return [...response.data.creators, ...response.data.businesses];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const handleSearchBusiness = createAsyncThunk<
  UserProfile[],
  string,
  { rejectValue: string }
>('search/handleSearchBusiness', async (query, { rejectWithValue }) => {
  try {
    const response = await apiClient.get<UserProfile[]>('/search-business', {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const searchSlice = createSlice({
  name: 'search',
  initialState: initialSearchState,
  reducers: {
    clearSearchResults(state) {
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload ?? 'Something went wrong';
      })

      .addCase(handleSearch.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(handleSearch.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.results = action.payload;
      })
      .addCase(handleSearch.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload ?? 'Something went wrong';
      })

      .addCase(handleSearchBusiness.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(handleSearchBusiness.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.collabs = action.payload;
      })
      .addCase(handleSearchBusiness.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload ?? 'Something went wrong';
      });
  },
});

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
