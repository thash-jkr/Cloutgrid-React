import NavBar from '@/components/NavBar';
import JobList from './JobList';
import JobDetail from './JobDetail';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect, useState } from 'react';
import { fetchCampaigns, fetchJobs } from '@/slices/jobSlice';
import type { CampaignModel, JobModel } from '@/types/jobTypes';
import CloutModal from '@/components/CloutModal';
import { Toaster } from 'react-hot-toast';
import Applications from './Applications';

const JobPage = () => {
  const [selectedJob, setSelectedJob] = useState<JobModel | CampaignModel | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const { jobs, campaigns } = useAppSelector((state) => state.job);
  const { type } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    type === 'creator' && jobs.length == 0 && dispatch(fetchJobs());
    type === 'business' && campaigns.length == 0 && dispatch(fetchCampaigns());
  }, [dispatch]);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mql.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="container h-dvh mx-auto flex items-start pt-18 pb-7 lg:pb-3 lg:pt-22 gap-3">
      <Toaster />
      <NavBar />

      <div className="flex lg:basis-1/3 w-full h-full noselect px-3 lg:px-0">
        <JobList jobs={type === 'creator' ? jobs : campaigns} onSelect={setSelectedJob} />
      </div>

      <div className="hidden lg:flex w-full h-full lg:basis-2/3 px-3 lg:px-0">
        {type == 'creator' ? (
          <JobDetail id={selectedJob?.id ?? null} />
        ) : (
          <Applications id={selectedJob?.id ?? null} />
        )}
      </div>

      <CloutModal
        isOpen={selectedJob !== null && !isDesktop}
        onClose={() => setSelectedJob(null)}
        title="Campaign"
      >
        {type == 'creator' ? (
          <JobDetail id={selectedJob?.id ?? null} />
        ) : (
          <Applications id={selectedJob?.id ?? null} />
        )}
      </CloutModal>
    </div>
  );
};

export default JobPage;
