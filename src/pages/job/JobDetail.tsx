import CloutEmpty from '@/components/CloutEmpty';
import collabIcon from '@/assets/isometric/deal.png';
import type { JobModel } from '@/types/jobTypes';
import { Button } from 'actify';
import { getCategoryLabel } from '@/utils/categories';

interface JobDetailScope {
  job: JobModel | null;
}

const JobDetail = ({ job }: JobDetailScope) => {
  return (
    <div
      className="flex h-full w-full
    items-center justify-center rounded-xl bg-white shadow p-3 overflow-y-auto"
    >
      {job != null ? (
        <div className="flex flex-col justify-start items-start w-full h-full gap-5">
          <h1 className="font-semibold text-xl">{job.title}</h1>

          <div className="flex flex-col text-gray-500 text-sm">
            <span>Posted by: {job.posted_by.name}</span>
            <span>Posted on: {job.created_at.split("T")[0]}</span>
            <span>Category: {getCategoryLabel(job.target_creator)}</span>
          </div>

          <Button variant="outlined" isDisabled={job.is_applied}>
            <span>{job.is_applied ? 'Applied' : 'Apply'}</span>
          </Button>

          <div className="flex flex-col">
            <h1 className="font-semibold">Description:</h1>
            <p className="whitespace-pre-line">{job.description}</p>
          </div>

          <div className="flex flex-col">
            <h1 className="font-semibold">Requirements:</h1>
            <ul>
              {job.requirements.split(',').map((req, index) => (
                <li key={index}>• {req}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <CloutEmpty icon={collabIcon} message="Select a campaign to view details" />
      )}
    </div>
  );
};

export default JobDetail;
