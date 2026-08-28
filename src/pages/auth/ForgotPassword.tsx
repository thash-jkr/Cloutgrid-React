import reg_bg from '@/assets/gradient_bg.jpg';
import { Link } from 'react-router-dom';
import logo from '@/assets/cloutgrid_logo_icon.png';
import { Button, TextField } from 'actify';

const ForgotPassword = () => {
  return (
    <div className="min-h-dvh mx-auto">
      <Link to="/" className="p-0 absolute top-1 left-1">
        <img src={logo} alt="Cloutgrid logo" className="h-14 w-14 object-center" />
      </Link>

      <div className="flex">
        <div className="flex flex-col flex-1 justify-center items-center gap-7 h-dvh">
          <h1 className="text-3xl font-bold">Forgot Password?</h1>

          <div className="flex flex-col gap-5 w-full px-5">
            <p>
              Enter your email here. We will send you a mail with the link to reset your password
            </p>
            <TextField label="Email" variant="outlined" />
          </div>

          <Button color="primary" variant="filled">
            Submit
          </Button>
        </div>

        <div className="hidden lg:flex flex-2 h-dvh">
          <img className="object-cover" src={reg_bg} alt="Login Cover" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

//
