import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '@/app/client';
import { setInstagramConnected, setYoutubeConnected } from './authSlice';
import {
  initialIntegrationState,
  type InstagramMediaModel,
  type InstagramMediaResponse,
  type InstagramPageModel,
  type InstagramPageResponse,
  type InstagramResponseModel,
  type YoutubeChannelModel,
  type YoutubeChannelResponse,
  type YoutubeMediaModel,
  type YoutubeMediaResponse,
} from '@/types/integrationTypes';
import type { AppDispatch, RootState } from '@/app/store';

interface ThunkConfig {
  rejectValue: string;
  state: RootState;
  dispatch: AppDispatch;
}

// --- Instagram ---

export const connectInstagram = createAsyncThunk<string, void, ThunkConfig>(
  'integration/connectInstagram',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiClient.post<InstagramResponseModel>('/instagram/connect/', {});
      dispatch(setInstagramConnected(true));
      return `@${response.data.ig_page} connected`;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const disconnectInstagram = createAsyncThunk<void, void, ThunkConfig>(
  'integration/disconnectInstagram',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setInstagramConnected(false));
      await apiClient.post('/auth/instagram/disconnect/', {});
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const purgeInstagram = createAsyncThunk<void, void, ThunkConfig>(
  'integration/purgeInstagram',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setInstagramConnected(false));
      await apiClient.post('/auth/instagram/purge/', {});
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchInstagramProfile = createAsyncThunk<void, void, ThunkConfig>(
  'integration/fetchInstagramProfile',
  async (_, { rejectWithValue }) => {
    try {
      await apiClient.post('/instagram/profile/fetch/', {});
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

async function readInstagramProfile(username: string): Promise<InstagramPageModel> {
  const response = await apiClient.get<InstagramPageResponse>(
    `/instagram/profile/read/${username}/`,
  );
  return response.data.profile_data;
}

export const loadOwnInstagramProfile = createAsyncThunk<InstagramPageModel, string, ThunkConfig>(
  'integration/loadOwnInstagramProfile',
  async (username, { rejectWithValue }) => {
    try {
      return await readInstagramProfile(username);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const readOtherInstagramProfile = createAsyncThunk<InstagramPageModel, string, ThunkConfig>(
  'integration/readOtherInstagramProfile',
  async (username, { rejectWithValue }) => {
    try {
      return await readInstagramProfile(username);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchInstagramMedia = createAsyncThunk<void, void, ThunkConfig>(
  'integration/fetchInstagramMedia',
  async (_, { rejectWithValue }) => {
    try {
      await apiClient.post('/instagram/media/fetch/', {});
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

async function readInstagramMedia(username: string): Promise<InstagramMediaModel[]> {
  const response = await apiClient.get<InstagramMediaResponse>(
    `/instagram/media/read/${username}/`,
  );
  return response.data.media;
}

export const loadOwnInstagramMedia = createAsyncThunk<InstagramMediaModel[], string, ThunkConfig>(
  'integration/loadOwnInstagramMedia',
  async (username, { rejectWithValue }) => {
    try {
      return await readInstagramMedia(username);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const readOtherInstagramMedia = createAsyncThunk<InstagramMediaModel[], string, ThunkConfig>(
  'integration/readOtherInstagramMedia',
  async (username, { rejectWithValue }) => {
    try {
      return await readInstagramMedia(username);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

// --- YouTube ---

export const disconnectYoutube = createAsyncThunk<void, void, ThunkConfig>(
  'integration/disconnectYoutube',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setYoutubeConnected(false));
      await apiClient.post('/auth/google/disconnect/', {});
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchYoutubeChannel = createAsyncThunk<void, void, ThunkConfig>(
  'integration/fetchYoutubeChannel',
  async (_, { rejectWithValue }) => {
    try {
      await apiClient.post('/youtube/channel/fetch/', {});
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

async function readYoutubeChannel(username: string): Promise<YoutubeChannelModel> {
  const response = await apiClient.get<YoutubeChannelResponse>(
    `/youtube/channel/read/${username}/`,
  );
  return response.data.channel_data;
}

export const loadOwnYoutubeChannel = createAsyncThunk<YoutubeChannelModel, string, ThunkConfig>(
  'integration/loadOwnYoutubeChannel',
  async (username, { rejectWithValue }) => {
    try {
      return await readYoutubeChannel(username);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const readOtherYoutubeChannel = createAsyncThunk<YoutubeChannelModel, string, ThunkConfig>(
  'integration/readOtherYoutubeChannel',
  async (username, { rejectWithValue }) => {
    try {
      return await readYoutubeChannel(username);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchYoutubeMedia = createAsyncThunk<void, void, ThunkConfig>(
  'integration/fetchYoutubeMedia',
  async (_, { rejectWithValue }) => {
    try {
      await apiClient.post('/youtube/media/fetch/', {});
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

async function readYoutubeMedia(username: string): Promise<YoutubeMediaModel[]> {
  const response = await apiClient.get<YoutubeMediaResponse>(`/youtube/media/read/${username}/`);
  return response.data.media_data;
}

export const loadOwnYoutubeMedia = createAsyncThunk<YoutubeMediaModel[], string, ThunkConfig>(
  'integration/loadOwnYoutubeMedia',
  async (username, { rejectWithValue }) => {
    try {
      return await readYoutubeMedia(username);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const readOtherYoutubeMedia = createAsyncThunk<YoutubeMediaModel[], string, ThunkConfig>(
  'integration/readOtherYoutubeMedia',
  async (username, { rejectWithValue }) => {
    try {
      return await readYoutubeMedia(username);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

// --- slice ---

const integrationSlice = createSlice({
  name: 'integration',
  initialState: initialIntegrationState,
  reducers: {
    clearIntegrationError(state) {
      state.integrationError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- connectInstagram ---
      .addCase(connectInstagram.pending, (state) => {
        state.integrationLoading = true;
        state.integrationError = null;
      })
      .addCase(connectInstagram.fulfilled, (state) => {
        state.integrationLoading = false;
      })
      .addCase(connectInstagram.rejected, (state, action) => {
        state.integrationLoading = false;
        state.integrationError = action.payload ?? 'Something went wrong';
      })

      // --- disconnectInstagram ---
      .addCase(disconnectInstagram.pending, (state) => {
        state.integrationLoading = true;
        state.integrationError = null;
      })
      .addCase(disconnectInstagram.fulfilled, (state) => {
        state.integrationLoading = false;
        state.instagramPage = null;
        state.instagramMedia = [];
      })
      .addCase(disconnectInstagram.rejected, (state, action) => {
        state.integrationLoading = false;
        state.integrationError = action.payload ?? 'Something went wrong';
      })

      // --- purgeInstagram ---
      .addCase(purgeInstagram.pending, (state) => {
        state.integrationLoading = true;
        state.integrationError = null;
      })
      .addCase(purgeInstagram.fulfilled, (state) => {
        state.integrationLoading = false;
        state.instagramPage = null;
        state.instagramMedia = [];
      })
      .addCase(purgeInstagram.rejected, (state, action) => {
        state.integrationLoading = false;
        state.integrationError = action.payload ?? 'Something went wrong';
      })

      // --- fetchInstagramProfile ---
      .addCase(fetchInstagramProfile.pending, (state) => {
        state.integrationLoading = true;
        state.integrationError = null;
      })
      .addCase(fetchInstagramProfile.fulfilled, (state) => {
        state.integrationLoading = false;
      })
      .addCase(fetchInstagramProfile.rejected, (state, action) => {
        state.integrationLoading = false;
        state.integrationError = action.payload ?? 'Something went wrong';
      })

      // --- loadOwnInstagramProfile ---
      .addCase(loadOwnInstagramProfile.pending, (state) => {
        state.integrationLoading = true;
        state.integrationError = null;
      })
      .addCase(loadOwnInstagramProfile.fulfilled, (state, action) => {
        state.integrationLoading = false;
        state.instagramPage = action.payload;
      })
      .addCase(loadOwnInstagramProfile.rejected, (state, action) => {
        state.integrationLoading = false;
        state.integrationError = action.payload ?? 'Something went wrong';
      })

      // --- readOtherInstagramProfile ---
      .addCase(readOtherInstagramProfile.pending, (state) => {
        state.integrationLoading = true;
        state.integrationError = null;
      })
      .addCase(readOtherInstagramProfile.fulfilled, (state, action) => {
        state.integrationLoading = false;
        state.otherInstagramPage = action.payload;
      })
      .addCase(readOtherInstagramProfile.rejected, (state, action) => {
        state.integrationLoading = false;
        state.integrationError = action.payload ?? 'Something went wrong';
      })

      // --- fetchInstagramMedia ---
      .addCase(fetchInstagramMedia.pending, (state) => {
        state.integrationLoading = true;
        state.integrationError = null;
      })
      .addCase(fetchInstagramMedia.fulfilled, (state) => {
        state.integrationLoading = false;
      })
      .addCase(fetchInstagramMedia.rejected, (state, action) => {
        state.integrationLoading = false;
        state.integrationError = action.payload ?? 'Something went wrong';
      })

      // --- loadOwnInstagramMedia ---
      .addCase(loadOwnInstagramMedia.pending, (state) => {
        state.integrationLoading = true;
        state.integrationError = null;
      })
      .addCase(loadOwnInstagramMedia.fulfilled, (state, action) => {
        state.integrationLoading = false;
        state.instagramMedia = action.payload;
      })
      .addCase(loadOwnInstagramMedia.rejected, (state, action) => {
        state.integrationLoading = false;
        state.integrationError = action.payload ?? 'Something went wrong';
      })

      // --- readOtherInstagramMedia ---
      .addCase(readOtherInstagramMedia.pending, (state) => {
        state.integrationLoading = true;
        state.integrationError = null;
      })
      .addCase(readOtherInstagramMedia.fulfilled, (state, action) => {
        state.integrationLoading = false;
        state.otherInstagramMedia = action.payload;
      })
      .addCase(readOtherInstagramMedia.rejected, (state, action) => {
        state.integrationLoading = false;
        state.integrationError = action.payload ?? 'Something went wrong';
      })

      // --- disconnectYoutube ---
      .addCase(disconnectYoutube.pending, (state) => {
        state.integrationLoading = true;
        state.integrationError = null;
      })
      .addCase(disconnectYoutube.fulfilled, (state) => {
        state.integrationLoading = false;
        state.youtubeChannel = null;
        state.youtubeMedia = [];
      })
      .addCase(disconnectYoutube.rejected, (state, action) => {
        state.integrationLoading = false;
        state.integrationError = action.payload ?? 'Something went wrong';
      })

      // --- fetchYoutubeChannel ---
      .addCase(fetchYoutubeChannel.pending, (state) => {
        state.integrationLoading = true;
        state.integrationError = null;
      })
      .addCase(fetchYoutubeChannel.fulfilled, (state) => {
        state.integrationLoading = false;
      })
      .addCase(fetchYoutubeChannel.rejected, (state, action) => {
        state.integrationLoading = false;
        state.integrationError = action.payload ?? 'Something went wrong';
      })

      // --- loadOwnYoutubeChannel ---
      .addCase(loadOwnYoutubeChannel.pending, (state) => {
        state.integrationLoading = true;
        state.integrationError = null;
      })
      .addCase(loadOwnYoutubeChannel.fulfilled, (state, action) => {
        state.integrationLoading = false;
        state.youtubeChannel = action.payload;
      })
      .addCase(loadOwnYoutubeChannel.rejected, (state, action) => {
        state.integrationLoading = false;
        state.integrationError = action.payload ?? 'Something went wrong';
      })

      // --- readOtherYoutubeChannel ---
      .addCase(readOtherYoutubeChannel.pending, (state) => {
        state.integrationLoading = true;
        state.integrationError = null;
      })
      .addCase(readOtherYoutubeChannel.fulfilled, (state, action) => {
        state.integrationLoading = false;
        state.otherYoutubeChannel = action.payload;
      })
      .addCase(readOtherYoutubeChannel.rejected, (state, action) => {
        state.integrationLoading = false;
        state.integrationError = action.payload ?? 'Something went wrong';
      })

      // --- fetchYoutubeMedia ---
      .addCase(fetchYoutubeMedia.pending, (state) => {
        state.integrationLoading = true;
        state.integrationError = null;
      })
      .addCase(fetchYoutubeMedia.fulfilled, (state) => {
        state.integrationLoading = false;
      })
      .addCase(fetchYoutubeMedia.rejected, (state, action) => {
        state.integrationLoading = false;
        state.integrationError = action.payload ?? 'Something went wrong';
      })

      // --- loadOwnYoutubeMedia ---
      .addCase(loadOwnYoutubeMedia.pending, (state) => {
        state.integrationLoading = true;
        state.integrationError = null;
      })
      .addCase(loadOwnYoutubeMedia.fulfilled, (state, action) => {
        state.integrationLoading = false;
        state.youtubeMedia = action.payload;
      })
      .addCase(loadOwnYoutubeMedia.rejected, (state, action) => {
        state.integrationLoading = false;
        state.integrationError = action.payload ?? 'Something went wrong';
      })

      // --- readOtherYoutubeMedia ---
      .addCase(readOtherYoutubeMedia.pending, (state) => {
        state.integrationLoading = true;
        state.integrationError = null;
      })
      .addCase(readOtherYoutubeMedia.fulfilled, (state, action) => {
        state.integrationLoading = false;
        state.otherYoutubeMedia = action.payload;
      })
      .addCase(readOtherYoutubeMedia.rejected, (state, action) => {
        state.integrationLoading = false;
        state.integrationError = action.payload ?? 'Something went wrong';
      });
  },
});

export const { clearIntegrationError } = integrationSlice.actions;
export default integrationSlice.reducer;
