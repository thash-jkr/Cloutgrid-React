import { useAppDispatch, useAppSelector } from '@/app/hooks';
import CloutEmpty from '@/components/CloutEmpty';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ApplicationIcon from '@/assets/isometric/deal.png';
import { getCategoryLabel } from '@/utils/categories';
import { ClipboardList, Download, Menu, Trash2, User } from 'lucide-react';
import { useState } from 'react';
import type { MenuAction } from '@/components/CloutMenu';
import CloutMenu from '@/components/CloutMenu';
import EmptyIcon from '@/assets/isometric/box.png';
import CloutModal from '@/components/CloutModal';
import Answers from './Answers';
import type { ApplicationModel } from '@/types/jobTypes';
import CloutAlert from '@/components/CloutAlert';
import { deleteJob } from '@/slices/jobSlice';

interface ApplicationsProps {
  id: number | null;
}

const Applications = ({ id }: ApplicationsProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationModel | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { campaigns } = useAppSelector((state) => state.job);

  const job = campaigns.find((j) => j.id === id) ?? null;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const actions: MenuAction[] = [
    {
      icon: Download,
      label: 'Download Applications',
      action: () => {
        job && job.applications.length > 0
          ? handleDownload()
          : toast.error('No applications to download.');
        setShowMenu(false);
      },
    },
    {
      icon: Trash2,
      label: 'Delete Campaign',
      action: () => {
        setShowDeleteConfirm(true);
      },
    },
  ];

  const escapeCsvValue = (value: string | number): string => {
    const stringValue = String(value ?? '');

    if (/[",\n]/.test(stringValue)) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  const handleDownload = () => {
    const id = toast.loading('Preparing download...');

    const rows: Record<string, string | number>[] = [];

    job &&
      job.applications.forEach((application, index) => {
        const row: Record<string, string | number> = {
          id: index + 1,
          application_id: application.id,
          creator_name: application.creator.name,
          creator_username: application.creator.username,
          creator_email: application.creator.email,
          creator_category: application.creator.category ?? '',
        };

        job.questions.forEach((question: { id: number; content: string }) => {
          const answer = application.answers.find((a) => a.question === question.id);
          row[`Question: ${question.content}`] = answer?.content ?? '';
        });

        rows.push(row);
      });

    if (rows.length === 0) {
      toast.error('No applications to download.', { id });
      return;
    }

    const headers = Object.keys(rows[0]);
    const csvLines = [
      headers.map(escapeCsvValue).join(','),
      ...rows.map((row) => headers.map((header) => escapeCsvValue(row[header])).join(',')),
    ];

    const csvContent = csvLines.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'applications.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('Applications downloaded successfully.', { id });
  };

  return (
    <div
      className="flex h-full w-full
    items-center justify-center rounded-xl bg-white shadow p-3 overflow-y-auto"
    >
      <Toaster />

      {job ? (
        <div className="flex flex-col justify-start items-start w-full h-full gap-5">
          <h1 className="font-semibold text-xl">{job.title}</h1>

          <div className="flex flex-col text-gray-500 text-sm">
            <span>Posted on: {job.created_at.split('T')[0]}</span>
            <span>Category: {getCategoryLabel(job.target_creator)}</span>
          </div>

          <div className="flex justify-start items-center gap-3 w-full">
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
            <h1 className="font-semibold">Applications:</h1>
            <div className="flex flex-col border rounded-xl divide-y cursor-pointer overflow-hidden">
              {job.applications.length > 0 ? (
                job.applications.map((app) => (
                  <div
                    className="flex justify-between items-center gap-6 p-3 hover:bg-slate-50"
                    key={app.id}
                  >
                    <div className="flex justify-start items-center gap-3">
                      <img
                        src={app.creator.profile_photo}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                      <span>{app.creator.name}</span>
                    </div>

                    <div className="flex gap-3">
                      {job.questions.length > 0 && (
                        <div
                          className="w-10 h-10 border rounded-full flex justify-center 
              items-center cursor-pointer transition-transform duration-300 
              ease-in-out transform hover:scale-105 hover:shadow"
                          onClick={() => {
                            setSelectedApplication(app);
                            setShowAnswers(true);
                          }}
                        >
                          <ClipboardList className="h-5 w-5" />
                        </div>
                      )}

                      <div
                        className="w-10 h-10 border rounded-full flex justify-center 
              items-center cursor-pointer transition-transform duration-300 
              ease-in-out transform hover:scale-105 hover:shadow"
                        onClick={() => navigate(`/profile/${app.creator.username}`)}
                      >
                        <User className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <CloutEmpty icon={EmptyIcon} message="No applications yet!" />
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="font-semibold">Campaign Requirements:</h1>
            <ul>
              {job.requirements.map((req, index) => (
                <li key={index}>• {req.content}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h1 className="font-semibold">Campaign Questions:</h1>
            {job.questions.length > 0 ? (
              <ul>
                {job.questions.map((question, index) => (
                  <li key={index}>
                    <span>{index + 1}</span>. {question.content}
                  </li>
                ))}
              </ul>
            ) : (
              <CloutEmpty icon={EmptyIcon} message="No questions for this campaign!" />
            )}
          </div>
        </div>
      ) : (
        <CloutEmpty icon={ApplicationIcon} message="Select a campaign to view applications" />
      )}

      <CloutMenu actions={actions} isOpen={showMenu} onClose={() => setShowMenu(false)} />

      <CloutModal
        isOpen={showAnswers}
        onClose={() => setShowAnswers(false)}
        title="Application Answers"
      >
        {job && selectedApplication && (
          <Answers questions={job.questions} answers={selectedApplication.answers} />
        )}
      </CloutModal>

      <CloutAlert
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Delete Campaign"
        body="Are you sure you want to delete this campaign? This will permanently delete all application data."
        onSubmit={() => {
          job && dispatch(deleteJob(job.id));
          setShowDeleteConfirm(false);
        }}
        timed={true}
      />
    </div>
  );
};

export default Applications;
