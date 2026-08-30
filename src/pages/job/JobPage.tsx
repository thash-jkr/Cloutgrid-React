import NavBar from '@/components/NavBar';
import JobList from './JobList';
import JobDetail from './JobDetail';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect, useState } from 'react';
import { fetchJobs } from '@/slices/jobSlice';
import type { JobModel } from '@/types/jobTypes';

const JobPage = () => {
  const [selectedJob, setSelectedJob] = useState<JobModel | null>(null);

  const { jobs } = useAppSelector((state) => state.job);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <div className="container h-dvh mx-auto flex items-start pt-18 pb-7 lg:pb-3 lg:pt-22 gap-3">
      <NavBar />

      <div className="flex lg:basis-1/3 w-full h-full noselect px-3 lg:px-0">
        <JobList jobs={jobs} onSelect={setSelectedJob} />
      </div>

      <div className="hidden lg:flex w-full h-full lg:basis-2/3 px-3 lg:px-0">
        <JobDetail job={selectedJob} />
      </div>
    </div>
  );
};

export default JobPage;
