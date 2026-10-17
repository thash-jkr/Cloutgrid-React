import { apiClient } from '@/app/client';
import CloutCapsule from '@/components/CloutCapsule';
import CloutEmpty from '@/components/CloutEmpty';
import collabImage from '@/assets/isometric/office.png';

import type { UserProfile } from '@/types/authTypes';
import type { JobModel } from '@/types/jobTypes';
import { getCategoryLabel } from '@/utils/categories';
import { timeAgo } from '@/utils/timeAgo';
import { useEffect, useState } from 'react';

const BrandProfile = ({ brand }: { brand: UserProfile }) => {
  const [jobs, setJobs] = useState<JobModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    apiClient
      .get(`/jobs/brand/${brand.username}/`)
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [brand]);

  return (
    <div
      className="flex flex-col justify-start items-center w-full h-full font-semibold text-xl 
          xl:text-lg md:text-base overflow-y-auto pb-10"
    >
      <div className="flex flex-col justify-center items-start w-full gap-1 p-3">
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-28 h-28 rounded-full object-cover"
            src={`${brand.profile_photo}`}
            alt="Profile"
          />
        </div>

        <h1 className="text-center">{brand.name}</h1>

        <p className="whitespace-pre-line font-normal text-base">{brand.bio}</p>

        <div className="flex w-full gap-3">
          <CloutCapsule text={getCategoryLabel(brand.category)} />

          {brand.type === 'business' && brand.website && (
            <CloutCapsule text={brand.website} bg="bg-primary" />
          )}
        </div>
      </div>

      <div className='py-3 w-full'>
        <h1 className='text-center'>Active Campaigns</h1>

        {jobs.length > 0 ? (
          <ul className="w-full divide-y">
            {jobs.map((job) => (
              <li key={job.id} className="group/item w-full" onClick={() => {}}>
                <div className="flex w-full items-center justify-between gap-1 p-2 hover:bg-slate-50">
                  <div className="flex w-full items-start justify-center gap-3">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={brand.profile_photo}
                      alt="Profile"
                    />
                    <div className="flex w-full flex-col">
                      <span className="text-sm font-semibold">{job.title}</span>
                      <span className="text-xs text-slate-500">{timeAgo(job.created_at)}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <CloutEmpty icon={collabImage} message="No new campaigns!" isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};

export default BrandProfile;
