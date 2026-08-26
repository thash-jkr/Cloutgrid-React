import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { apiClient } from "@/app/client";
import { saveUser } from "./authSlice";
import { likePost as likeFeedPost } from "./feedSlice";
import { initialProfileState } from "@/types/profileTypes";
import type { UserProfile } from "@/types/authTypes";
import type { PostModel } from "@/types/feedTypes";
import type { AppDispatch, RootState } from "@/app/store";

interface ThunkConfig {
  rejectValue: string;
  state: RootState;
  dispatch: AppDispatch;
}

export const fetchProfile = createAsyncThunk<
  { user: UserProfile; other: boolean },
  { username: string; other: boolean },
  ThunkConfig
>(
  "profile/fetchProfile",
  async ({ username, other }, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiClient.get<UserProfile>(
        `/profiles/${username}/`,
      );
      if (!other) {
        dispatch(saveUser(response.data));
      }
      return { user: response.data, other };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchPosts = createAsyncThunk<
  { posts: PostModel[]; other: boolean },
  { username: string; other?: boolean },
  ThunkConfig
>(
  "profile/fetchPosts",
  async ({ username, other = false }, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<PostModel[]>(`/posts/${username}/`);
      return { posts: response.data, other };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchCollabs = createAsyncThunk<
  { collabs: PostModel[]; other: boolean },
  { username?: string; other?: boolean },
  ThunkConfig
>(
  "profile/fetchCollabs",
  async ({ username, other = false }, { rejectWithValue }) => {
    const endpoint = other ? `/posts/collabs/${username}/` : "/posts/collabs/";
    try {
      const response = await apiClient.get<PostModel[]>(endpoint);
      return { collabs: response.data, other };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const handleBlock = createAsyncThunk<
  boolean,
  { username: string; block: boolean },
  ThunkConfig
>("profile/handleBlock", async ({ username, block }, { rejectWithValue }) => {
  const action = block ? "block" : "unblock";
  try {
    await apiClient.post(`/profiles/${username}/${action}/`);
    return block;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const handleFollow = createAsyncThunk<
  boolean,
  { username: string; follow: boolean },
  ThunkConfig
>("profile/handleFollow", async ({ username, follow }, { rejectWithValue }) => {
  const action = follow ? "follow" : "unfollow";
  try {
    await apiClient.post(`/profiles/${username}/${action}/`);
    return follow;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const likePost = createAsyncThunk<
  { postId: number; liked: boolean; likeCount: number },
  number,
  ThunkConfig
>("profile/likePost", async (postId, { dispatch, rejectWithValue }) => {
  try {
    const result = await dispatch(likeFeedPost(postId)).unwrap();
    return { postId, liked: result.liked, likeCount: result.like_count };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// --- slice ---

const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,
  reducers: {
    clearOtherProfileData(state) {
      state.otherProfile = null;
      state.otherPosts = [];
      state.otherCollabs = [];
    },
    removePost(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    },
    addNewPost(state, action: PayloadAction<PostModel>) {
      state.posts.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        if (action.payload.other) {
          state.otherProfile = action.payload.user;
        }
        // own-profile case handled by authSlice via the saveUser dispatch above
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload ?? "Something went wrong";
      })

      .addCase(fetchPosts.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.profileLoading = false;
        if (action.payload.other) {
          state.otherPosts = action.payload.posts;
        } else {
          state.posts = action.payload.posts;
          state.profile = true;
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload ?? "Something went wrong";
      })

      .addCase(fetchCollabs.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(fetchCollabs.fulfilled, (state, action) => {
        state.profileLoading = false;
        if (action.payload.other) {
          state.otherCollabs = action.payload.collabs;
        } else {
          state.collabs = action.payload.collabs;
        }
      })
      .addCase(fetchCollabs.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload ?? "Something went wrong";
      })

      .addCase(handleBlock.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(handleBlock.fulfilled, (state, action) => {
        state.profileLoading = false;
        if (state.otherProfile) {
          state.otherProfile.is_blocking = action.payload;
        }
      })
      .addCase(handleBlock.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload ?? "Something went wrong";
      })

      .addCase(handleFollow.fulfilled, (state, action) => {
        if (state.otherProfile) {
          state.otherProfile.is_following = action.payload;
          state.otherProfile.followers_count += action.payload ? 1 : -1;
        }
      })
      .addCase(handleFollow.rejected, (state, action) => {
        state.profileError = action.payload ?? "Something went wrong";
      })

      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, liked, likeCount } = action.payload;
        const updateIfMatch = (p: PostModel): PostModel =>
          p.id === postId
            ? { ...p, is_liked: liked, like_count: likeCount }
            : p;
        state.posts = state.posts.map(updateIfMatch);
        state.collabs = state.collabs.map(updateIfMatch);
        state.otherPosts = state.otherPosts.map(updateIfMatch);
        state.otherCollabs = state.otherCollabs.map(updateIfMatch);
      })
      .addCase(likePost.rejected, (state, action) => {
        state.profileError = action.payload ?? "Something went wrong";
      });
  },
});

export const { clearOtherProfileData, removePost, addNewPost } =
  profileSlice.actions;
export default profileSlice.reducer;
