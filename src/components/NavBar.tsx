import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'actify';
import logo from '@/assets/cloutgrid_logo_icon.png';
import { useState } from 'react';
import defaultProfilePhoto from '@/assets/default_profile.png';
import { useAppSelector } from '@/app/hooks';
import CloutModal from './CloutModal';
import Notifications from '@/pages/feed/Notifications';
import Create from '@/pages/create/Create';
import CreatePost from '@/pages/create/CreatePost';
import Search from '@/pages/create/Search';
import type { MenuAction } from './CloutMenu';
import {
  Bell,
  Dot,
  Handshake,
  Search as Magnifier,
  Menu,
  Plus,
  User,
  UserKey,
  UserPlus,
} from 'lucide-react';
import CloutMenu from './CloutMenu';
import CloutModalAlt from './CloutModalAlt';
import CreateCampaign from '@/pages/create/CreateCampaign';

export default function NavBar() {
  const [menu, setMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);

  const { user, isAuth } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = window.location.pathname;

  const actions: MenuAction[] = [
    ...(isAuth
      ? [
          { icon: Magnifier, label: 'Connect', action: () => setShowConnect(true) },
          { icon: Plus, label: 'Create', action: () => setShowCreate(true) },
          { icon: Handshake, label: 'Collaborate', action: () => navigate('/campaigns') },
          { icon: Bell, label: 'Notifications', action: () => setShowNotifications(true) },
          { icon: User, label: 'Profile', action: () => navigate('/profile') },
        ]
      : [
          { icon: UserKey, label: 'Login', action: () => navigate('/login') },
          { icon: UserPlus, label: 'Sign Up', action: () => navigate('/register') },
        ]),
  ];

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

        {!isAuth && location == '/' && (
          <div className="hidden lg:flex justify-center items-center text-xl font-bold">
            <Link to={'/register/creator/'}>
              <h6 className="mr-5 hover:scale-105 hover:text-secondary transition-all duration-500">
                Creator
              </h6>
            </Link>

            <Dot className="h-1 w-1 text-gray-400" />

            <Link to={'/register/brand/'}>
              <h6 className="ml-5 hover:scale-105 hover:text-secondary transition-all duration-500">
                Brand
              </h6>
            </Link>
          </div>
        )}

        {isAuth ? (
          <div className="hidden lg:flex items-center gap-3 pr-3">
            <Button
              color="primary"
              variant="filled"
              onPress={() => setShowConnect(true)}
              className="group"
            >
              <div className="center flex items-center">
                <div
                  className="overflow-hidden transition-all duration-1000 ease-in-out
        group-hover:max-w-200 lg:max-w-0"
                >
                  <h3 className="mr-2 opacity-100 transition-opacity duration-1000 group-hover:opacity-100 lg:opacity-0">
                    Connect
                  </h3>
                </div>

                <Magnifier className="transition-transform duration-1000 group-hover:rotate-360 h-5 w-5" />
              </div>
            </Button>

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

                <Plus className="transition-transform duration-1000 group-hover:rotate-360 h-5 w-5" />
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

                <Handshake className="transition-transform duration-1000 group-hover:rotate-360 h-5 w-5" />
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
          <Menu
            className={`h-5 w-5 ${menu ? 'rotate-180' : ''} transition-transform duration-300`}
          />
        </button>
      </nav>

      <CloutModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        title="Notifications"
      >
        <Notifications />
      </CloutModal>

      <CloutModal isOpen={showConnect} onClose={() => setShowConnect(false)} title="Connect">
        <Search />
      </CloutModal>

      <CloutModal
        isOpen={selectedFile != null}
        onClose={() => setSelectedFile(null)}
        title={'Create Post'}
      >
        {selectedFile && <CreatePost file={selectedFile} onClose={() => setSelectedFile(null)} />}
      </CloutModal>

      <CloutModal
        isOpen={showCreateCampaign}
        onClose={() => setShowCreateCampaign(false)}
        title="Create Campaign"
      >
        <CreateCampaign onClose={() => setShowCreateCampaign(false)} />
      </CloutModal>

      <CloutModalAlt isOpen={showCreate} onClose={() => setShowCreate(false)}>
        <Create
          onPostSelect={(file) => {
            setSelectedFile(file);
            setShowCreate(false);
          }}
          onCampaignSelect={() => {
            setShowCreate(false);
            setShowCreateCampaign(true);
          }}
        />
      </CloutModalAlt>

      <CloutMenu isOpen={menu} onClose={() => setMenu(false)} actions={actions} />
    </div>
  );
}
