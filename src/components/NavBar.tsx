import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'actify';
import logo from '@/assets/cloutgrid_logo_icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAdd,
  faBars,
  faBell,
  faCircle,
  faClose,
  faHandshake,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import defaultProfilePhoto from '@/assets/default_profile.png';
import { useAppSelector } from '@/app/hooks';
import CloutModal from './CloutModal';
import Notifications from '@/pages/feed/Notifications';
import Create from '@/pages/create/Create';
import CreatePost from '@/pages/create/CreatePost';

export default function NavBar() {
  const [menu, setMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { user, isAuth } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  return (
    <div
      className={`container mx-auto fixed z-50  transition-all duration-700 
      top-3
      ease-in-out left-0 right-0 px-3 lg:px-0 noselect`}
    >
      <nav className="flex flex-wrap justify-between items-center px-1 py-0 rounded-2xl shadow bg-white h-12 lg:h-16">
        <Link to="/" className="h-full">
          <img src={logo} alt="Cloutgrid logo" className="h-full w-auto object-contain" />
        </Link>

        {!isAuth && (
          <div className="hidden lg:flex justify-center items-center text-xl font-bold">
            <Link to={'/register/creator/'}>
              <h6 className="mr-5 hover:scale-105 hover:text-secondary transition-all duration-500">
                Creator
              </h6>
            </Link>
            <span className="text-[7px]">
              <FontAwesomeIcon icon={faCircle} />
            </span>
            <Link to={'/register/brand/'}>
              <h6 className="ml-5 hover:scale-105 hover:text-secondary transition-all duration-500">
                Brand
              </h6>
            </Link>
          </div>
        )}

        {isAuth ? (
          <div className="hidden lg:flex items-center gap-3 pr-3">
            <Link to="/" className="group">
              <Button color="primary" variant="filled">
                <div className="center flex items-center">
                  <div
                    className="lg:max-w-0 overflow-hidden group-hover:max-w-200 
                      transition-all duration-1000 ease-in-out"
                  >
                    <h3 className="mr-2 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                      Connect
                    </h3>
                  </div>
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="transition-transform duration-1000 group-hover:rotate-360"
                  />
                </div>
              </Button>
            </Link>

            <Button
              color="primary"
              variant="filled"
              onPress={() => setShowCreate(true)}
              className="group"
            >
              <div className="center flex items-center">
                <div
                  className="overflow-hidden transition-all duration-1000 ease-in-out
        group-hover:max-w-200 lg:max-w-0"
                >
                  <h3 className="mr-2 opacity-100 transition-opacity duration-1000 group-hover:opacity-100 lg:opacity-0">
                    Create
                  </h3>
                </div>
                <FontAwesomeIcon
                  icon={faAdd}
                  className="transition-transform duration-1000 group-hover:rotate-360"
                />
              </div>
            </Button>

            <Button
              color="primary"
              variant="filled"
              onPress={() => navigate('/campaigns')}
              className="group"
            >
              <div className="center flex items-center">
                <div
                  className="overflow-hidden transition-all duration-1000 ease-in-out
        group-hover:max-w-200 lg:max-w-0"
                >
                  <h3 className="mr-2 opacity-100 transition-opacity duration-1000 group-hover:opacity-100 lg:opacity-0">
                    Collaborate
                  </h3>
                </div>
                <FontAwesomeIcon
                  icon={faHandshake}
                  className="transition-transform duration-1000 group-hover:rotate-360"
                />
              </div>
            </Button>

            <Link to="/profile">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={user ? `${user.profile_photo}` : defaultProfilePhoto}
                alt="Profile"
              />
            </Link>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-3 pr-3">
            <Link to="/login">
              <Button color="primary" variant="filled">
                Login
              </Button>
            </Link>

            <Link to="/register">
              <Button color="primary" variant="elevated" className="gap-0">
                <span>
                  Join the <span className="font-bold text-secondary">grid</span>
                </span>
              </Button>
            </Link>
          </div>
        )}

        <button
          className={`lg:hidden text-black text-lg focus:outline-none transition-transform duration-300 pr-3`}
          onClick={() => setMenu(!menu)}
        >
          <FontAwesomeIcon icon={menu ? faClose : faBars} />
        </button>

        <div
          className={`absolute right-3 top-12 my-3 w-1/2 flex-col rounded-xl bg-white p-0 text-lg font-semibold
    shadow transition-all duration-300 ease-in-out lg:hidden ${
      menu
        ? 'flex translate-x-0 opacity-100'
        : 'pointer-events-none flex translate-x-full opacity-0'
    }`}
        >
          {isAuth ? (
            <div className="flex flex-col divide-y">
              <div
                className="flex items-center justify-between p-3 hover:text-secondary"
                onClick={() => {
                  setMenu(false);
                  navigate('/login');
                }}
              >
                <h1 className="mr-1">Connect</h1>
                <FontAwesomeIcon icon={faSearch} />
              </div>
              <div
                className="flex items-center justify-between p-3 hover:text-secondary"
                onClick={() => {
                  setMenu(false);
                  setShowCreate(true);
                }}
              >
                <h1 className="mr-1">Create</h1>
                <FontAwesomeIcon icon={faAdd} />
              </div>
              <div
                className="flex items-center justify-between p-3 hover:text-secondary"
                onClick={() => {
                  setMenu(false);
                  navigate('/campaigns');
                }}
              >
                <h1 className="mr-1">Collaborate</h1>
                <FontAwesomeIcon icon={faHandshake} />
              </div>
              <div
                className="flex items-center justify-between p-3 hover:text-secondary"
                onClick={() => {
                  setMenu(false);
                  setShowNotifications(true);
                }}
              >
                <h1 className="mr-1">Notifications</h1>
                <FontAwesomeIcon icon={faBell} />
              </div>
              <div
                className="flex items-center justify-between p-3 hover:text-secondary"
                onClick={() => {
                  setMenu(false);
                  navigate('/profile');
                }}
              >
                <h1 className="mr-1">Profile</h1>
                <img src={user?.profile_photo} className="w-6 h-auto object-cover rounded-full" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col divide-y">
              <div
                className="flex items-center justify-start p-3 hover:text-secondary"
                onClick={() => {
                  setMenu(false);
                  navigate('/login');
                }}
              >
                <h1 className="mr-1">Login</h1>
              </div>
              <div
                className="flex items-center justify-start p-3 hover:text-secondary"
                onClick={() => {
                  setMenu(false);
                  navigate('/register');
                }}
              >
                <h1 className="mr-1">Register</h1>
              </div>
            </div>
          )}
        </div>
      </nav>

      <CloutModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        title="Notifications"
      >
        <Notifications />
      </CloutModal>

      <CloutModal
        isOpen={selectedFile != null}
        onClose={() => setSelectedFile(null)}
        title={'Create Post'}
      >
        {selectedFile && <CreatePost file={selectedFile} onClose={() => setSelectedFile(null)} />}
      </CloutModal>

      <CloutModal isOpen={showCreate} title={'Create'} onClose={() => setShowCreate(false)}>
        <Create
          onPostSelect={(file) => {
            setSelectedFile(file);
            setShowCreate(false);
          }}
          onCampaignSelect={() => {
            setShowCreate(false);
          }}
        />
      </CloutModal>
    </div>
  );
}
