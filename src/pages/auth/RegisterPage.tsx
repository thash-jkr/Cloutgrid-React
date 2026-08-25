import reg_bg from "@/assets/gradient_bg.jpg";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import logo from "@/assets/cloutgrid_logo_icon.png"

const RegisterPage = () => {
  return (
    <div className="min-h-dvh mx-auto">
      <Link to="/" className="p-0 absolute top-1 left-1">
        <img
          src={logo}
          alt="Cloutgrid logo"
          className="h-14 w-14 object-center"
        />
      </Link>

      <div className="flex">
        <div className="flex flex-col flex-1 justify-center items-center h-dvh gap-7">
          <h1 className="text-3xl font-semibold">
            Join the <span className="font-bold text-secondary">grid</span>
          </h1>

          <div className="flex w-full flex-col items-center justify-center gap-7 lg:gap-5 px-5 text-xl lg:flex-row xl:text-2xl">
            <Link
              to="/register/creator"
              className="flex flex-1 justify-center w-3/4"
            >
              <div
                className="group flex h-50 w-full items-center justify-center rounded-2xl
        shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl
        lg:aspect-3/4 lg:h-auto lg:w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(150deg,rgba(143, 128, 255, 1) 0%, rgba(206, 193, 248, 1) 51%)",
                }}
              >
                <div className="flex flex-col items-center justify-center">
                  <h3 className="mb-1 font-bold">Creator</h3>
                  <FontAwesomeIcon
                    className="transition-all duration-500 ease-in-out group-hover:translate-x-4"
                    icon={faArrowRight}
                  />
                </div>
              </div>
            </Link>

            <Link
              to="/register/brand"
              className="flex flex-1 justify-center w-3/4"
            >
              <div
                className="group flex h-50 w-full items-center justify-center rounded-2xl
        shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl
        lg:aspect-3/4 lg:h-auto lg:w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(150deg,rgba(143, 128, 255, 1) 0%, rgba(206, 193, 248, 1) 51%)",
                }}
              >
                <div className="flex flex-col items-center justify-center">
                  <h3 className="mb-1 font-bold">Brand</h3>
                  <FontAwesomeIcon
                    className="transition-all duration-500 ease-in-out group-hover:translate-x-4"
                    icon={faArrowRight}
                  />
                </div>
              </div>
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center font-semibold gap-2">
            <div className="flex justify-center items-center gap-2">
              <span>Already have an account?</span>
              <Link className=" hover:text-secondary font-bold" to={"/login"}>
                Login
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-2 h-dvh">
          <img className="object-cover" src={reg_bg} alt="Registration Cover" />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
