import login_bg from '@/assets/carol-magalhaes-dSsXm15D9hg-unsplash.jpg';
import { Button, IconButton, TextField } from 'actify';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/cloutgrid_logo_icon.png';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { login } from '@/slices/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isCreator, setIsCreator] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { authLoading } = useAppSelector((state) => state.auth);

  const handleLogin = async () => {
    const loadingToast = toast.loading('Logging in...');

    if (!email || !password) {
      toast.error('Fields are empty', { id: loadingToast });
      return;
    }

    await dispatch(login({ email, password, type: isCreator ? 'creator' : 'business' }))
      .unwrap()
      .then(() => {
        toast.success('Login successful!', { id: loadingToast });
        navigate('/', { replace: true });
      })
      .catch((error) => {
        toast.error(`Login failed: ${error}`, { id: loadingToast });
      });
  };

  return (
    <div className="min-h-dvh mx-auto noselect">
      <Toaster position="top-left" />
      <Link to="/" className="p-0 absolute top-1 left-1">
        <img src={logo} alt="Cloutgrid logo" className="h-14 w-14 object-center" />
      </Link>

      <div className="flex">
        <div className="flex flex-col flex-1 justify-center items-center gap-7 h-dvh">
          <div></div>
          <h1 className="text-3xl font-bold">{isCreator ? 'Creator' : 'Brand'} Login</h1>

          <div className="flex flex-col gap-5 w-full px-5">
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={setEmail}
              leadingIcon={<Mail className="h-5 w-5" />}
            />

            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={setPassword}
              leadingIcon={<Lock className="h-5 w-5" />}
              trailingIcon={
                <IconButton onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </IconButton>
              }
            />
          </div>

          <Button color="primary" variant="filled" onPress={handleLogin} isDisabled={authLoading}>
            {authLoading ? 'Logging in…' : 'Login'}
          </Button>

          <div className="flex flex-col justify-center items-center gap-2">
            <div className=" hover:text-secondary font-bold">
              <Link to={'/password/forgot'}>Forgot password?</Link>
            </div>

            <div
              className="group cursor-pointer"
              onClick={() => setIsCreator(!isCreator)}
            >
              <span className="flex justify-center items-center gap-2">
                Not a {isCreator ? 'brand' : 'creator'}?{' '}
                <span className="group-hover:text-secondary font-bold">
                  {isCreator ? 'Brand' : 'Creator'} Login
                </span>
              </span>
            </div>

            <div
              className="group cursor-pointer"
              onClick={() => navigate("/register")}
            >
              <span className="flex justify-center items-center gap-2">
                Don't have an account?
                <span className="group-hover:text-secondary font-bold">
                  Register
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-2 h-dvh">
          <img className="object-cover" src={login_bg} alt="Login Cover" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
