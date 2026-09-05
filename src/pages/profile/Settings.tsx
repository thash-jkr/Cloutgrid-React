import CloutAlert from '@/components/CloutAlert';
import CloutModal from '@/components/CloutModal';
import {
  LogOut,
  ChevronDown,
  MessageCircle,
  Pencil,
  FileText,
  Settings as SettingsIcon,
  HeartHandshake,
  LifeBuoy,
  Lock,
  Trash,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile';
import type { MenuAction } from '@/components/CloutMenu';
import CloutMenu from '@/components/CloutMenu';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { deleteAccount, logout } from '@/slices/authSlice';

const Settings = () => {
  const [settingsDropdown, setSettingsDropdown] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showPrivacyMenu, setShowPrivacyMenu] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const navigate = useNavigate();

  const { type } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const actions: MenuAction[] = [
    {
      icon: FileText,
      label: 'Privacy Policy',
      action: () => navigate('/privacypolicy'),
    },
    {
      icon: HeartHandshake,
      label: 'EULA',
      action: () => navigate('/eula'),
    },
    {
      icon: Lock,
      label: 'Data Deletion',
      action: () => navigate('/deletionpolicy'),
    },
    {
      icon: Trash,
      label: 'Delete Account',
      action: () => setShowDeleteAlert(true),
    },
  ];

  return (
    <div
      className="group relative flex w-full cursor-pointer flex-col items-center justify-center
          rounded-xl bg-white shadow hover:shadow"
    >
      <div
        className="flex w-full items-center justify-center"
        onClick={() => setSettingsDropdown(!settingsDropdown)}
      >
        <div className="my-3 flex items-center justify-center gap-1 text-lg font-semibold transition-all duration-300 ease-in-out">
          <h1>Settings</h1>
          <span
            className={`transition-transform duration-500 ${settingsDropdown ? 'rotate-180' : ''}`}
          >
            <SettingsIcon className="h-5 w-5" />
          </span>
          <span
            className={`absolute right-3 transition-transform duration-500 ${
              settingsDropdown ? 'rotate-180' : ''
            }`}
          >
            <ChevronDown className="h-5 w-5" />
          </span>
        </div>
      </div>

      <div
        className={`grid w-full transition-[grid-template-rows] duration-300 ease-in-out ${
          settingsDropdown ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="font-regular flex w-full flex-col divide-y border-t">
            <div
              className="flex items-center justify-start gap-2 p-3 hover:bg-slate-50"
              onClick={() => setShowHelp(true)}
            >
              <LifeBuoy className="h-5 w-5" />
              <h1>Help</h1>
            </div>
            <div
              className="flex items-center justify-start gap-2 p-3 hover:bg-slate-50"
              onClick={() => setShowFeedback(true)}
            >
              <MessageCircle className="h-5 w-5" />
              <h1>Feedback</h1>
            </div>
            <div
              className="flex items-center justify-start gap-2 p-3 hover:bg-slate-50"
              onClick={() => setShowEditProfile(true)}
            >
              <Pencil className="h-5 w-5" />
              <h1>Edit Profile</h1>
            </div>
            <div
              className="flex items-center justify-start gap-2 p-3 hover:bg-slate-50"
              onClick={() => setShowPrivacyMenu(true)}
            >
              <Lock className="h-5 w-5" />
              <h1>Privacy</h1>
            </div>
            <div
              className="flex items-center justify-start gap-2 rounded-b-2xl p-3 hover:bg-slate-50"
              onClick={() => setShowLogoutAlert(true)}
            >
              <LogOut className="h-5 w-5" />
              <h1>Logout</h1>
            </div>
          </div>
        </div>
      </div>

      <CloutAlert
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
        onSubmit={() => setShowHelp(false)}
        title="Need Help?"
        body="If you face any issues using Cloutgrid, please reach out to us at"
        textField={true}
      />

      <CloutAlert
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        onSubmit={() => setShowFeedback(false)}
        title="Feedback"
        body="We would love to hear your feedback! Please share your thoughts with us."
        textField={true}
      />

      <CloutModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        title="Edit Profile"
      >
        <EditProfile onClose={() => setShowEditProfile(false)} />
      </CloutModal>

      <CloutMenu
        isOpen={showPrivacyMenu}
        onClose={() => setShowPrivacyMenu(false)}
        actions={actions}
      />

      <CloutAlert
        isOpen={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        onSubmit={() => {
          type && dispatch(deleteAccount(type));
          setShowDeleteAlert(false);
        }}
        title="Delete Account"
        body="Are you sure you want to delete your account? This action is 
        irreversible and will permanently remove all your data from our servers."
        timed={true}
      />

      <CloutAlert
        isOpen={showLogoutAlert}
        onClose={() => setShowLogoutAlert(false)}
        onSubmit={() => {
          dispatch(logout());
          setShowLogoutAlert(false);
        }}
        title="Logout"
        body="Are you sure you want to logout?"
      />
    </div>
  );
};

export default Settings;
