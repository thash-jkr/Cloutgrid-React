import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/slices/authSlice';
import feedReducer from '@/slices/feedSlice';
import profileReducer from '@/slices/profileSlice';
import jobReducer from '@/slices/jobSlice';
import createReducer from '@/slices/createSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    feed: feedReducer,
    profile: profileReducer,
    job: jobReducer,
    create: createReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
