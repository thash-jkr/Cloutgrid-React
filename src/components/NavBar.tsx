import { Link } from "react-router-dom";
import { Button } from "actify";
import logo from "@/assets/cloutgrid_logo_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  return (
    <div
      className={`container mx-auto fixed z-50  transition-all duration-700 
      top-4 lg:top-6
      ease-in-out left-0 right-0 px-3 lg:px-0`}
    >
      <nav className=" flex flex-wrap justify-between items-center px-1 py-1 rounded-2xl shadow backdrop-blur-md">
        <Link to="/" className="p-0">
          <img
            src={logo}
            alt="Cloutgrid logo"
            className="h-14 w-14 object-center"
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
          <Link to={"/register/business/"}>
            <h6 className="ml-5 hover:scale-105 hover:text-secondary transition-all duration-500">
              Brand
            </h6>
          </Link>
        </div>

        <div className="flex items-center gap-3 pr-3">
          <Link to="/login">
            <Button color="primary" variant="filled">
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button color="primary" variant="filled" className="gap-0">
              <span>
                Join the <span className="font-bold text-secondary">grid</span>
              </span>
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
