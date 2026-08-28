import type { UserProfile } from './authTypes';

export interface QuestionModel {
  id: number;
  content: string;
  job: number;
}

export interface AnswerModel {
  id: number;
  content: string;
  application: number;
  question: number;
}

export interface JobModel {
  id: number;
  posted_by: UserProfile;
  questions: QuestionModel[];
  is_applied: boolean;
  title: string;
  description: string;
  requirements: string;
  target_creator: string;
  created_at: string;
}

export interface ApplicationModel {
  id: number;
  creator: UserProfile;
  job: JobModel;
  answers: AnswerModel[];
}

export interface JobState {
  jobs: JobModel[];
  applications: ApplicationModel[];
  jobLoading: boolean;
  jobError: string | null;
  jobSuccessMessage: string | null;
}

export const initialJobState: JobState = {
  jobs: [],
  applications: [],
  jobLoading: false,
  jobError: null,
  jobSuccessMessage: null,
};
