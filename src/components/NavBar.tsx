import { Link, useNavigate } from "react-router-dom";
import { Button } from "actify";
import logo from "@/assets/cloutgrid_logo_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircle,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function NavBar() {
  const [menu, setMenu] = useState(false);

  const navigate = useNavigate();

  return (
    <div
      className={`container mx-auto fixed z-50  transition-all duration-700 
      top-3
      ease-in-out left-0 right-0 px-3 lg:px-0`}
    >
      <nav className="flex flex-wrap justify-between items-center px-1 py-1 rounded-2xl shadow bg-white">
        <Link to="/" className="p-0">
          <img
            src={logo}
            alt="Cloutgrid logo"
            className="h-10 lg:h-14 w-10 lg:w-14 object-center"
          />
        </Link>

        <div className="hidden lg:flex justify-center items-center text-xl font-bold">
          <Link to={"/register/creator/"}>
            <h6 className="mr-5 hover:scale-105 hover:text-secondary transition-all duration-500">
              Creator
            </h6>
          </Link>
          <span className="text-[7px]">
            <FontAwesomeIcon icon={faCircle} />
          </span>
          <Link to={"/register/brand/"}>
            <h6 className="ml-5 hover:scale-105 hover:text-secondary transition-all duration-500">
              Brand
            </h6>
          </Link>
        </div>

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

        <button
          className={`lg:hidden text-black text-lg focus:outline-none transition-transform duration-300 pr-3`}
          onClick={() => setMenu(!menu)}
        >
          <FontAwesomeIcon icon={menu ? faClose : faBars} />
        </button>

        <div
          className={`lg:hidden ${
            menu ? "flex" : "hidden"
          } flex-col w-full p-0 font-bold text-lg my-3  noselect`}
        >
          <div className={`flex flex-col`}>
            <div
              className="p-3 flex items-center justify-start hover:text-secondary"
              onClick={() => {
                setMenu(false);
                navigate("/login");
              }}
            >
              <h1 className="mr-1">Login</h1>
            </div>
            <div
              className="p-3 flex items-center justify-start hover:text-secondary"
              onClick={() => {
                setMenu(false);
                navigate("/register");
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
