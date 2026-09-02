import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '@/app/client';
import type {
  CommentModel,
  FeedState,
  LikeResponse,
  NotificationModel,
  PostModel,
  PostResponse,
} from '@/types/feedTypes';

const initialState: FeedState = {
  posts: [],
  postsNextPageUrl: null,
  postsHasMore: true,
  comments: [],
  notifications: [],
  feedLoading: false,
  feedError: null,
};

// --- thunks ---

export const fetchNotifications = createAsyncThunk<
  NotificationModel[],
  void,
  { rejectValue: string }
>('feed/fetchNotifications', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get<NotificationModel[]>('/notifications/?all=false/');
    return response.data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const readNotification = createAsyncThunk<number, number, { rejectValue: string }>(
  'feed/readNotification',
  async (id, { rejectWithValue }) => {
    try {
      await apiClient.post(`/notifications/${id}/mark_as_read/`);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchFeed = createAsyncThunk<
  { response: PostResponse; isFirstPage: boolean },
  { isFirstPage: boolean },
  { rejectValue: string; state: { feed: FeedState } }
>('feed/fetchFeed', async ({ isFirstPage }, { getState, rejectWithValue }) => {
  const url = isFirstPage ? '/posts/' : getState().feed.postsNextPageUrl;
  if (!url) {
    return rejectWithValue('No more posts to load');
  }
  try {
    // Non-first-page URLs from DRF pagination are absolute — axios uses them
    // as-is when they start with http, ignoring baseURL automatically.
    const response = await apiClient.get<PostResponse>(url);
    return { response: response.data, isFirstPage };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const likePost = createAsyncThunk<
  LikeResponse & { postId: number },
  number,
  { rejectValue: string }
>('feed/likePost', async (postId, { rejectWithValue }) => {
  try {
    const response = await apiClient.post<LikeResponse>(`/posts/${postId}/like/`, {});
    return { ...response.data, postId };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const deletePost = createAsyncThunk<number, number, { rejectValue: string }>(
  'feed/deletePost',
  async (postId, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/posts/${postId}/`);
      return postId;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchComments = createAsyncThunk<CommentModel[], number, { rejectValue: string }>(
  'feed/fetchComments',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<CommentModel[]>(`/posts/${postId}/comments/`);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const addComment = createAsyncThunk<
  { comment: CommentModel; postId: number },
  { postId: number; content: string },
  { rejectValue: string }
>('feed/addComment', async ({ postId, content }, { rejectWithValue }) => {
  try {
    const response = await apiClient.post<CommentModel>(`/posts/${postId}/comments/`, { content });
    return { comment: response.data, postId };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const deleteComment = createAsyncThunk<
  { commentId: number; postId: number },
  { postId: number; commentId: number },
  { rejectValue: string }
>('feed/deleteComment', async ({ postId, commentId }, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/posts/${postId}/comment/${commentId}/`);
    return { commentId, postId };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    addNewPost(state, action: PayloadAction<PostModel>) {
      state.posts.unshift(action.payload);
    },
    handleBlock(state, action: PayloadAction<string>) {
      const username = action.payload;
      state.posts = state.posts.filter((p) => p.posted_by.username !== username);
    },
    clearFeed(state) {
      Object.assign(state, initialState);
    },
    clearComments(state) {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
      })

      .addCase(readNotification.fulfilled, (state, action) => {
        state.notifications = state.notifications.filter((n) => n.id !== action.payload);
      })

      .addCase(fetchFeed.pending, (state) => {
        state.feedLoading = true;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        const { response, isFirstPage } = action.payload;
        state.posts = isFirstPage ? response.results : [...state.posts, ...response.results];
        state.postsNextPageUrl = response.next ?? null;
        state.postsHasMore = Boolean(response.next);
        state.feedLoading = false;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.feedLoading = false;
      })

      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, liked, like_count } = action.payload;
        state.posts = state.posts.map((p) =>
          p.id === postId ? { ...p, is_liked: liked, like_count } : p,
        );
      })
      .addCase(likePost.rejected, (state, action) => {
        state.feedError = action.payload ?? 'Something went wrong';
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p.id !== action.payload);
      })

      .addCase(fetchComments.pending, (state) => {
        state.comments = [];
        state.feedLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.feedLoading = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.feedLoading = false;
      })

      .addCase(addComment.fulfilled, (state, action) => {
        const { comment, postId } = action.payload;
        state.comments.push(comment);
        state.posts = state.posts.map((p) =>
          p.id === postId ? { ...p, comment_count: p.comment_count + 1 } : p,
        );
      })

      .addCase(deleteComment.fulfilled, (state, action) => {
        const { commentId, postId } = action.payload;
        state.comments = state.comments.filter((c) => c.id !== commentId);
        state.posts = state.posts.map((p) =>
          p.id === postId ? { ...p, comment_count: p.comment_count - 1 } : p,
        );
      });
  },
});

export const { addNewPost, handleBlock, clearFeed, clearComments } = feedSlice.actions;
export default feedSlice.reducer;
