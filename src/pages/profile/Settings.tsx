import {
  faArrowRightFromBracket,
  faChevronDown,
  faComments,
  faEdit,
  faFileContract,
  faGear,
  faHandshake,
  faLifeRing,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [settingsDropdown, setSettingsDropdown] = useState(false);

  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col justify-center items-center shadow w-full rounded-xl cursor-pointer 
          hover:shadow relative group bg-white center"
    >
      <div className="w-full flex justify-center items-center" onClick={() => setSettingsDropdown(!settingsDropdown)}>
        <div className="font-bold text-xl my-3 flex justify-center items-center">
          <h1 className="mr-1">Settings</h1>
          <span
            className={`transition-transform duration-500 ${settingsDropdown ? 'rotate-180' : ''}`}
          >
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
        className={`${
          settingsDropdown ? 'flex' : 'hidden'
        } flex-col w-full divide-y font-semibold text-lg`}
      >
        <div className="p-3 flex items-center justify-start hover:bg-slate-50" onClick={() => {}}>
          <FontAwesomeIcon icon={faLifeRing} />
          <h1 className="ml-1">Help</h1>
        </div>
        {/* <div className="p-3 flex items-center justify-star hover:bg-slate-50">
                <FontAwesomeIcon icon={faCircleInfo} />
                <h1 className="ml-1">About</h1>
              </div> */}
        <div
          className="p-3 flex items-center justify-start hover:bg-slate-50"
          onClick={() => navigate('/privacypolicy')}
        >
          <FontAwesomeIcon icon={faFileContract} />
          <h1 className="ml-1">Privacy Policy</h1>
        </div>
        <div
          className="p-3 flex items-center justify-start hover:bg-slate-50"
          onClick={() => navigate('/eula')}
        >
          <FontAwesomeIcon icon={faHandshake} />
          <h1 className="ml-1">EULA</h1>
        </div>
        <div className="p-3 flex items-center justify-start hover:bg-slate-50" onClick={() => {}}>
          <FontAwesomeIcon icon={faComments} />
          <h1 className="ml-1">Feedback</h1>
        </div>
        <div className="p-3 flex items-center justify-start hover:bg-slate-50" onClick={() => {}}>
          <FontAwesomeIcon icon={faEdit} />
          <h1 className="ml-1">Edit Profile</h1>
        </div>
        <div
          className="p-3 flex items-center justify-start hover:bg-slate-50 rounded-b-2xl"
          onClick={() => navigate('/logout')}
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          <h1 className="ml-1">Logout</h1>
        </div>
      </div>
    </div>
  );
};

export default Settings;
