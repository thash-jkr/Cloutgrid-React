import CloutEmpty from '@/components/CloutEmpty';
import collabIcon from '@/assets/isometric/deal.png';
import { Button } from 'actify';
import { getCategoryLabel } from '@/utils/categories';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { submitApplication } from '@/slices/jobSlice';
import toast, { Toaster } from 'react-hot-toast';
import CloutModal from '@/components/CloutModal';
import Questions from './Questions';

interface JobDetailScope {
  id: number | null;
}

const JobDetail = ({ id }: JobDetailScope) => {
  const [showQuestions, setShowQuestions] = useState(false);

  const { jobs } = useAppSelector((state) => state.job);

  const job = jobs.find((j) => j.id === id) ?? null;

  const dispatch = useAppDispatch();

  const handleApply = (answers: Record<number, string>) => {
    const loadingToast = toast.loading('Submitting...');

    if (job != null) {
      dispatch(submitApplication({ id: job.id, answers: answers }))
        .unwrap()
        .then(() => {
          toast.success('Application submitted', { id: loadingToast });
          setShowQuestions(false);
          return;
        })
        .catch((error) => {
          toast.error(`Error submitting application: ${error}`, { id: loadingToast });
        });
    }
  };

  return (
    <div
      className="flex h-full w-full
    items-center justify-center rounded-xl bg-white shadow p-3 overflow-y-auto"
    >
      <Toaster />
      {job != null ? (
        <div className="flex flex-col justify-start items-start w-full h-full gap-5">
          <h1 className="font-semibold text-xl">{job.title}</h1>

          <div className="flex flex-col text-gray-500 text-sm">
            <span>Posted by: {job.posted_by.name}</span>
            <span>Posted on: {job.created_at.split('T')[0]}</span>
            <span>Category: {getCategoryLabel(job.target_creator)}</span>
          </div>

          <Button
            variant="outlined"
            isDisabled={job.is_applied}
            onPress={() => {
              job.questions.length > 0 ? setShowQuestions(true) : handleApply({});
            }}
          >
            <span>{job.is_applied ? 'Applied' : 'Apply'}</span>
          </Button>

          <div className="flex flex-col">
            <h1 className="font-semibold">Description:</h1>
            <p className="whitespace-pre-line">{job.description}</p>
          </div>

          <div className="flex flex-col">
            <h1 className="font-semibold">Requirements:</h1>
            <ul>
              {job.requirements.map((req, index) => (
                <li key={index}>• {req.content}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <CloutEmpty icon={collabIcon} message="Select a campaign to view details" />
      )}

      <CloutModal
        isOpen={showQuestions}
        onClose={() => setShowQuestions(false)}
        title="Campaign Questions"
      >
        <Questions questions={job?.questions ?? []} onSubmit={handleApply} />
      </CloutModal>
    </div>
  );
};

export default JobDetail;
