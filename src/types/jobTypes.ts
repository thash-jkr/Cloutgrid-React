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

export interface RequirementModel {
  id: number;
  content: string;
}

export interface JobModel {
  id: number;
  posted_by: UserProfile;
  questions: QuestionModel[];
  is_applied: boolean;
  title: string;
  description: string;
  requirements: RequirementModel[];
  target_creator: string;
  created_at: string;
}

export interface CampaignModel {
  id: number;
  title: string;
  description: string;
  target_creator: string;
  created_at: string;
  questions: QuestionModel[];
  applications: ApplicationModel[];
  requirements: RequirementModel[];
}

export interface ApplicationModel {
  id: number;
  creator: UserProfile;
  job: JobModel;
  answers: AnswerModel[];
}

export interface JobState {
  jobs: JobModel[];
  campaigns: CampaignModel[];
  jobLoading: boolean;
  jobError: string | null;
}

export const initialJobState: JobState = {
  jobs: [],
  campaigns: [],
  jobLoading: false,
  jobError: null,
};
