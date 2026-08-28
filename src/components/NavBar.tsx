import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'actify';
import logo from '@/assets/cloutgrid_logo_icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircle, faClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import defaultProfilePhoto from '@/assets/default_profile.png';
import { useAppSelector } from '@/app/hooks';

export default function NavBar() {
  const [menu, setMenu] = useState(false);

  const { user, isAuth } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  return (
    <div
      className={`container mx-auto fixed z-50  transition-all duration-700 
      top-3
      ease-in-out left-0 right-0 px-3 lg:px-0`}
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
            <Link to="/login">
              <Button color="primary" variant="filled">
                Connect
              </Button>
            </Link>

            <Link to="/login">
              <Button color="primary" variant="filled">
                Create
              </Button>
            </Link>

            <Link to="/login">
              <Button color="primary" variant="filled">
                Collaborate
              </Button>
            </Link>

            <Link to="/login">
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
        </div>
      </nav>
    </div>
  );
}
