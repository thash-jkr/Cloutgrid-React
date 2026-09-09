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
import CloutAlert from '@/components/CloutAlert';
import { Flag, Menu, SquareArrowOutUpRight, User } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { MenuAction } from '@/components/CloutMenu';
import CloutMenu from '@/components/CloutMenu';

interface JobDetailScope {
  id: number | null;
}

const JobDetail = ({ id }: JobDetailScope) => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [applyConfirm, setApplyConfirm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showReportBrand, setShowReportBrand] = useState(false);
  const [showReportCampaign, setShowReportCampaign] = useState(false);

  const { jobs } = useAppSelector((state) => state.job);

  const job = jobs.find((j) => j.id === id) ?? null;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const actions: MenuAction[] = [
    {
      icon: User,
      label: `Report ${job?.posted_by.name}`,
      action: () => {
        setShowReportBrand(true);
        setShowMenu(false);
      },
    },
    {
      icon: Flag,
      label: 'Report Campaign',
      action: () => {
        setShowReportCampaign(true);
        setShowMenu(false);
      },
    },
  ];

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
            <span className="flex items-center gap-1">
              Posted by:{' '}
              <span
                className="flex items-center gap-1 text-secondary cursor-pointer font-semibold transition-transform duration-300 ease-in-out transform hover:scale-105"
                onClick={() => navigate(`/profile/${job.posted_by.username}`)}
              >
                <span>{job.posted_by.name}</span>
                <SquareArrowOutUpRight className="h-4 w-4" />
              </span>
            </span>
            <span>Posted on: {job.created_at.split('T')[0]}</span>
            <span>Category: {getCategoryLabel(job.target_creator)}</span>
          </div>

          <div className="flex justify-start items-center gap-3 w-full">
            <Button
              variant="outlined"
              isDisabled={job.is_applied}
              onPress={() => {
                job.questions.length > 0 ? setShowQuestions(true) : setApplyConfirm(true);
              }}
            >
              <span>{job.is_applied ? 'Applied' : 'Apply'}</span>
            </Button>

            <div
              className="w-10 h-10 border rounded-full flex justify-center 
              items-center cursor-pointer transition-transform duration-300 
              ease-in-out transform hover:scale-105 hover:shadow"
              onClick={() => setShowMenu(true)}
            >
              <Menu className="h-5 w-5" />
            </div>
          </div>

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

      <CloutAlert
        title="Apply for the campaign?"
        body="Are you sure you want to apply for this campaign?"
        isOpen={applyConfirm}
        onClose={() => setApplyConfirm(false)}
        onSubmit={() => {
          handleApply({});
          setApplyConfirm(false);
        }}
      />

      <CloutAlert
        title="Report Brand"
        body="If you think this brand is violating our terms of service, you can report it here."
        isOpen={showReportBrand}
        onClose={() => setShowReportBrand(false)}
        onSubmit={() => {
          setShowReportBrand(false);
        }}
        textField={true}
      />

      <CloutAlert
        title="Report Campaign"
        body="If you think this campaign is violating our terms of service, you can report it here."
        isOpen={showReportCampaign}
        onClose={() => setShowReportCampaign(false)}
        onSubmit={() => {
          setShowReportCampaign(false);
        }}
        textField={true}
      />

      <CloutMenu isOpen={showMenu} onClose={() => setShowMenu(false)} actions={actions} />
    </div>
  );
};

export default JobDetail;
