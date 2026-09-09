import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '@/app/client';
import { initialJobState, type CampaignModel, type JobModel } from '@/types/jobTypes';

export const fetchJobs = createAsyncThunk<JobModel[], void, { rejectValue: string }>(
  'job/fetchJobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<JobModel[]>('/jobs/');
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchCampaigns = createAsyncThunk<CampaignModel[], void, { rejectValue: string }>(
  'job/fetchCampaigns',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<CampaignModel[]>('/jobs/');
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const createJob = createAsyncThunk<
  void,
  {
    title: string;
    description: string;
    requirements: string;
    targetCreator: string;
    questions: string[];
  },
  { rejectValue: string }
>(
  'job/createJob',
  async ({ title, description, requirements, targetCreator, questions }, { rejectWithValue }) => {
    if (!title || !description || !requirements || !targetCreator) {
      return rejectWithValue('Please fill in all fields');
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('requirements', requirements);
      formData.append('target_creator', targetCreator);
      formData.append('questions', JSON.stringify(questions));

      await apiClient.post('/jobs/', formData);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const deleteJob = createAsyncThunk<number, number, { rejectValue: string }>(
  'job/deleteJob',
  async (id, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/jobs/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const submitApplication = createAsyncThunk<
  number,
  { id: number; answers: Record<number, string> },
  { rejectValue: string }
>('job/submitApplication', async ({ id, answers }, { rejectWithValue }) => {
  try {
    const stringKeyedAnswers = Object.fromEntries(
      Object.entries(answers).map(([key, value]) => [key, value]),
    );
    await apiClient.post(`/jobs/${id}/apply/`, { answers: stringKeyedAnswers });
    return id;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const jobSlice = createSlice({
  name: 'job',
  initialState: initialJobState,
  reducers: {
    clearJobMessages(state) {
      state.jobError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.jobLoading = true;
        state.jobError = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobLoading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.jobLoading = false;
        state.jobError = action.payload ?? 'Something went wrong';
      })

      .addCase(fetchCampaigns.pending, (state) => {
        state.jobLoading = true;
        state.jobError = null;
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.jobLoading = false;
        state.campaigns = action.payload;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.jobLoading = false;
        state.jobError = action.payload ?? 'Something went wrong';
      })

      .addCase(createJob.pending, (state) => {
        state.jobLoading = true;
        state.jobError = null;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.jobLoading = false;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.jobLoading = false;
        state.jobError = action.payload ?? 'Something went wrong';
      })

      .addCase(deleteJob.pending, (state) => {
        state.jobError = null;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.campaigns = state.campaigns.filter((j) => j.id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.jobError = action.payload ?? 'Something went wrong';
      })

      .addCase(submitApplication.pending, (state) => {
        state.jobLoading = true;
        state.jobError = null;
      })
      .addCase(submitApplication.fulfilled, (state, action) => {
        state.jobLoading = false;
        state.jobs = state.jobs.map((j) =>
          j.id === action.payload ? { ...j, is_applied: true } : j,
        );
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.jobLoading = false;
        state.jobError = action.payload ?? 'Something went wrong';
      });
  },
});

export const { clearJobMessages } = jobSlice.actions;
export default jobSlice.reducer;
