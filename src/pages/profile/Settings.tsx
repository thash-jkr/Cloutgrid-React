import {
  faArrowRightFromBracket,
  faChevronDown,
  faComments,
  faEdit,
  faFileContract,
  faGear,
  faHandshake,
  faLifeRing,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [settingsDropdown, setSettingsDropdown] = useState(false);

  const navigate = useNavigate();

  return (
    <div
      className="group relative flex w-full cursor-pointer flex-col items-center justify-center
          rounded-xl bg-white shadow hover:shadow"
    >
      <div
        className="flex w-full items-center justify-center"
        onClick={() => setSettingsDropdown(!settingsDropdown)}
      >
        <div className="my-3 flex items-center justify-center text-lg font-semibold transition-all duration-300 ease-in-out">
          <h1 className="mr-1">Settings</h1>
          <span className={`transition-transform duration-500 ${settingsDropdown ? 'rotate-180' : ''}`}>
            <FontAwesomeIcon icon={faGear} />
          </span>
          <span
            className={`absolute right-3 transition-transform duration-500 ${
              settingsDropdown ? 'rotate-180' : ''
            }`}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
        </div>
      </div>

      <div
        className={`grid w-full transition-[grid-template-rows] duration-300 ease-in-out ${
          settingsDropdown ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex w-full flex-col divide-y font-regular border-t">
            <div className="flex items-center justify-start p-3 hover:bg-slate-50" onClick={() => {}}>
              <FontAwesomeIcon icon={faLifeRing} />
              <h1 className="ml-1">Help</h1>
            </div>
            <div
              className="flex items-center justify-start p-3 hover:bg-slate-50"
              onClick={() => navigate('/privacypolicy')}
            >
              <FontAwesomeIcon icon={faFileContract} />
              <h1 className="ml-1">Privacy Policy</h1>
            </div>
            <div
              className="flex items-center justify-start p-3 hover:bg-slate-50"
              onClick={() => navigate('/eula')}
            >
              <FontAwesomeIcon icon={faHandshake} />
              <h1 className="ml-1">EULA</h1>
            </div>
            <div
              className="flex items-center justify-start p-3 hover:bg-slate-50"
              onClick={() => navigate('/deletionpolicy')}
            >
              <FontAwesomeIcon icon={faLock} />
              <h1 className="ml-1">Data Deletion</h1>
            </div>
            <div className="flex items-center justify-start p-3 hover:bg-slate-50" onClick={() => {}}>
              <FontAwesomeIcon icon={faComments} />
              <h1 className="ml-1">Feedback</h1>
            </div>
            <div className="flex items-center justify-start p-3 hover:bg-slate-50" onClick={() => {}}>
              <FontAwesomeIcon icon={faEdit} />
              <h1 className="ml-1">Edit Profile</h1>
            </div>
            <div
              className="flex items-center justify-start rounded-b-2xl p-3 hover:bg-slate-50"
              onClick={() => navigate('/logout')}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              <h1 className="ml-1">Logout</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;