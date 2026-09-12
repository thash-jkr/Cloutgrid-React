import CloutEmpty from '@/components/CloutEmpty';
import type { CampaignModel, JobModel } from '@/types/jobTypes';
import { timeAgo } from '@/utils/timeAgo';
import collabImage from '@/assets/isometric/office.png';
import { useAppSelector } from '@/app/hooks';

interface JobListScope {
  jobs: JobModel[] | CampaignModel[];
  onSelect: (job: JobModel | CampaignModel) => void;
}

const JobList = ({ jobs, onSelect }: JobListScope) => {
  const { jobLoading } = useAppSelector((state) => state.job);
  const { user, type } = useAppSelector((state) => state.auth);

  return (
    <div
      className="flex h-full w-full flex-col 
    items-center justify-start"
    >
      <h1 className="font-semibold text-xl my-3">Campaigns</h1>

      <div className="h-full w-full overflow-y-auto rounded-xl bg-white shadow">
        {jobs.length > 0 ? (
          <ul className="w-full divide-y">
            {jobs.map((job) => (
              <li key={job.id} className="group/item w-full" onClick={() => onSelect(job)}>
                <div className="flex w-full items-center justify-between gap-1 p-2 hover:bg-slate-50">
                  <div className="flex w-full items-start justify-center gap-3">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={
                        type == 'business'
                          ? user?.profile_photo
                          : 'posted_by' in job
                            ? job.posted_by.profile_photo
                            : undefined
                      }
                      alt="Profile"
                    />
                    <div className="flex w-full flex-col">
                      <span className="text-sm font-semibold">{job.title}</span>
                      <span className="text-xs text-slate-500">
                      {type == 'creator' && 'posted_by' in job && <span>{job.posted_by.name} • </span>}{' '}
                      {timeAgo(job.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <CloutEmpty icon={collabImage} message="No new campaigns!" isLoading={jobLoading} />
        )}
      </div>
    </div>
  );
};

export default JobList;
