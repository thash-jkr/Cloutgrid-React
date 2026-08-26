import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '@/app/client';
import { buildFormData } from '@/utils/formData';
import { initialAuthState, type AuthState, type LoginResponse, type UserProfile } from '@/types/authTypes';

function persistSession(refresh: string, user: UserProfile, type: string) {
  localStorage.setItem('refresh', refresh);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('type', type);
}
function persistUser(user: UserProfile) {
  localStorage.setItem('user', JSON.stringify(user));
}
function clearStoredSession() {
  localStorage.removeItem('refresh');
  localStorage.removeItem('user');
  localStorage.removeItem('type');
}

export const initializeAuth = createAsyncThunk<AuthState>('auth/initializeAuth', async () => {
  const refresh = localStorage.getItem('refresh');
  const userJson = localStorage.getItem('user');
  const type = localStorage.getItem('type');
  const user = userJson ? (JSON.parse(userJson) as UserProfile) : null;

  if (!refresh) {
    return { ...initialAuthState, isInitializing: false };
  }

  try {
    const response = await apiClient.post<{ access: string; refresh?: string }>(
      '/token/refresh/',
      { refresh },
      { requireAuth: false }
    );
    if (response.data.refresh) localStorage.setItem('refresh', response.data.refresh);
    return {
      isAuth: true,
      isInitializing: false,
      user,
      type,
      access: response.data.access,
      isLoading: false,
      errorMessage: null,
    };
  } catch {
    clearStoredSession();
    return { ...initialAuthState, isInitializing: false };
  }
});

export const login = createAsyncThunk<
  { response: LoginResponse; type: string },
  { email: string; password: string; type: string },
  { rejectValue: string }
>('auth/login', async ({ email, password, type }, { rejectWithValue }) => {
  try {
    const response = await apiClient.post<LoginResponse>(
      `/login/${type}/`,
      { email, password },
      { requireAuth: false }
    );
    return { response: response.data, type };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>('auth/logout', async () => {
  const refresh = localStorage.getItem('refresh') ?? '';
  try {
    await apiClient.post('/logout/', { refresh });
  } catch {
    // Matches Flutter: logout failure is swallowed, session is cleared regardless.
  }
});

export const updateProfile = createAsyncThunk<
  UserProfile,
  { type: string; data: Record<string, string>; imageBlob?: Blob },
  { rejectValue: string }
>('auth/updateProfile', async ({ type, data, imageBlob }, { rejectWithValue }) => {
  try {
    const formData = buildFormData(
      data,
      imageBlob ? { blob: imageBlob, key: 'profile_photo', filename: 'profile.jpg' } : undefined
    );
    const response = await apiClient.put<UserProfile>(`/profile/${type}/`, formData);
    return response.data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const register = createAsyncThunk<
  void,
  { type: string; data: Record<string, string> },
  { rejectValue: string }
>('auth/register', async ({ type, data }, { rejectWithValue }) => {
  try {
    await apiClient.post(`/register/${type}/`, buildFormData(data), { requireAuth: false });
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const handleOTP = createAsyncThunk<
  void,
  { type: string; data: Record<string, string> },
  { rejectValue: string }
>('auth/handleOTP', async ({ type, data }, { rejectWithValue }) => {
  try {
    await apiClient.post(`/otp/${type}/`, buildFormData(data), { requireAuth: false });
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const resetPassword = createAsyncThunk<void, string, { rejectValue: string }>(
  'auth/resetPassword',
  async (email, { rejectWithValue }) => {
    try {
      await apiClient.post('/password-reset/', { email }, { requireAuth: false });
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteAccount = createAsyncThunk<void, string, { rejectValue: string }>(
  'auth/deleteAccount',
  async (type, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/delete/${type}/`);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setAccess(state, action: PayloadAction<string>) {
      state.access = action.payload;
      state.isAuth = true;
    },
    clearSession(state) {
      clearStoredSession();
      Object.assign(state, initialAuthState);
    },
    saveUser(state, action: PayloadAction<UserProfile>) {
      state.user = action.payload;
      state.isAuth = true;
      persistUser(action.payload);
    },
    setInstagramConnected(state, action: PayloadAction<boolean>) {
      if (state.user?.type === 'creator') {
        state.user.instagram_connected = action.payload;
        persistUser(state.user);
      }
    },
    setYoutubeConnected(state, action: PayloadAction<boolean>) {
      if (state.user?.type === 'creator') {
        state.user.youtube_connected = action.payload;
        persistUser(state.user);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.fulfilled, (_state, action) => action.payload)

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { response, type } = action.payload;
        persistSession(response.refresh, response.user, type);
        state.isAuth = true;
        state.user = response.user;
        state.type = type;
        state.access = response.access;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload ?? 'Something went wrong';
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        clearStoredSession();
        Object.assign(state, initialAuthState);
      })

      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
        persistUser(action.payload);
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload ?? 'Something went wrong';
      })

      .addCase(deleteAccount.fulfilled, (state) => {
        clearStoredSession();
        Object.assign(state, initialAuthState);
      })

      .addMatcher(
        (action) => [register.pending.type, handleOTP.pending.type, resetPassword.pending.type].includes(action.type),
        (state) => {
          state.isLoading = true;
          state.errorMessage = null;
        }
      )
      .addMatcher(
        (action) => [register.fulfilled.type, handleOTP.fulfilled.type, resetPassword.fulfilled.type].includes(action.type),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => [register.rejected.type, handleOTP.rejected.type, resetPassword.rejected.type].includes(action.type),
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.errorMessage = action.payload ?? 'Something went wrong';
        }
      );
  },
});

export const { setAccess, clearSession, saveUser, setInstagramConnected, setYoutubeConnected } =
  authSlice.actions;
export default authSlice.reducer;