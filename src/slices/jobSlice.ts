import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '@/app/client';
import { initialJobState, type ApplicationModel, type JobModel } from '@/types/jobTypes';

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

export const fetchBusinessJobs = createAsyncThunk<JobModel[], void, { rejectValue: string }>(
  'job/fetchBusinessJobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<JobModel[]>('/jobs/my-jobs/');
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchApplications = createAsyncThunk<
  ApplicationModel[],
  JobModel,
  { rejectValue: string }
>('job/fetchApplications', async (job, { rejectWithValue }) => {
  try {
    const response = await apiClient.get<ApplicationModel[]>(`/jobs/my-jobs/${job.id}/`);
    return response.data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

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
      state.jobSuccessMessage = null;
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

      .addCase(fetchBusinessJobs.pending, (state) => {
        state.jobLoading = true;
        state.jobError = null;
      })
      .addCase(fetchBusinessJobs.fulfilled, (state, action) => {
        state.jobLoading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchBusinessJobs.rejected, (state, action) => {
        state.jobLoading = false;
        state.jobError = action.payload ?? 'Something went wrong';
      })

      .addCase(fetchApplications.pending, (state) => {
        state.applications = [];
        state.jobLoading = true;
        state.jobError = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.jobLoading = false;
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.jobLoading = false;
        state.jobError = action.payload ?? 'Something went wrong';
      })

      .addCase(createJob.pending, (state) => {
        state.jobLoading = true;
        state.jobError = null;
        state.jobSuccessMessage = null;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.jobLoading = false;
        state.jobSuccessMessage = 'Collaboration Created';
      })
      .addCase(createJob.rejected, (state, action) => {
        state.jobLoading = false;
        state.jobError = action.payload ?? 'Something went wrong';
      })

      .addCase(deleteJob.pending, (state) => {
        state.jobError = null;
        state.jobSuccessMessage = null;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((j) => j.id !== action.payload);
        state.applications = [];
        state.jobSuccessMessage = 'Collaboration Deleted';
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
        state.jobSuccessMessage = 'Application submitted';
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
