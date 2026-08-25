import NavBar from "@/components/NavBar";
import login_bg from "@/assets/carol-magalhaes-dSsXm15D9hg-unsplash.jpg";
import { Button, IconButton, TextField } from "actify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [type, setType] = useState("creator");

  return (
    <div className="min-h-dvh mx-auto">
      <NavBar />

      <div className="flex">
        <div className="flex flex-col flex-1 justify-center items-center gap-7 h-dvh">
          <h1 className="text-3xl font-bold">
            {type == "creator" ? "Creator" : "Brand"} Login
          </h1>

          <div className="flex flex-col gap-5 w-full px-5">
            <TextField
              label="Email"
              variant="outlined"
              leadingIcon={<FontAwesomeIcon icon={faEnvelope} />}
            />

            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              leadingIcon={<FontAwesomeIcon icon={faLock} />}
              trailingIcon={
                <IconButton onPress={() => setShowPassword(!showPassword)}>
                  {<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />}
                </IconButton>
              }
            />
          </div>

          <Button color="primary" variant="filled">
            Login
          </Button>

          <div className="flex flex-col justify-center items-center font-semibold gap-2">
            <div className=" hover:text-secondary font-extrabold">
              <Link to={"/forgot-password"}>Forgot password?</Link>
            </div>
            <div>
              <span>
                Not a {type}?{" "}
                <span
                  className=" hover:text-secondary font-extrabold cursor-pointer"
                  onClick={() =>
                    setType(type == "creator" ? "brand" : "creator")
                  }
                >
                  {type == "creator" ? "Brand" : "Creator"} Login
                </span>
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span>Don't have an account?</span>
              <Link
                className=" hover:text-secondary font-extrabold ml-1"
                to={"/register"}
              >
                Register
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-2 h-dvh">
          <img className="object-cover" src={login_bg} alt="Couples" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
