import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '@/app/client';
import { ApiConfig } from '@/app/apiConfig';
import { addNewPost as addFeedPost } from './feedSlice';
import { addNewPost as addProfilePost } from './profileSlice';
import { initialCreateState } from '@/types/createTypes';
import type { UserProfile } from '@/types/authTypes';
import type { PostModel } from '@/types/feedTypes';
import type { AppDispatch, RootState } from '@/app/store';

interface ThunkConfig {
  rejectValue: string;
  state: RootState;
  dispatch: AppDispatch;
}

// --- thunks ---

export const searchBusiness = createAsyncThunk<UserProfile[], string, ThunkConfig>(
  'create/searchBusiness',
  async (query, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<UserProfile[]>('/search-business', {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const handlePostImage = createAsyncThunk<
  boolean,
  { imageBlob: Blob; caption: string; aspect: string; collab?: string },
  ThunkConfig
>(
  'create/handlePostImage',
  async ({ imageBlob, caption, aspect, collab }, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', imageBlob, 'post.jpg');
      formData.append('caption', caption);
      formData.append('aspect', aspect);
      formData.append('collaboration', collab ?? 'null');

      const response = await apiClient.post<PostModel>('/posts/', formData);

      const newPost: PostModel = {
        ...response.data,
        image: response.data.image.startsWith('http')
          ? response.data.image
          : ApiConfig.baseUrl + response.data.image,
      };

      dispatch(addFeedPost(newPost));
      dispatch(addProfilePost(newPost));

      return true;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

// --- slice ---

const createSlice_ = createSlice({
  name: 'create',
  initialState: initialCreateState,
  reducers: {
    clearCreateError(state) {
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBusiness.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(searchBusiness.fulfilled, (state, action) => {
        state.createLoading = false;
        state.collabs = action.payload;
      })
      .addCase(searchBusiness.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload ?? 'Something went wrong';
      })

      .addCase(handlePostImage.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(handlePostImage.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(handlePostImage.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload ?? 'Something went wrong';
      });
  },
});

export const { clearCreateError } = createSlice_.actions;
export default createSlice_.reducer;
