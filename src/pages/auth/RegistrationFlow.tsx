import logo from '@/assets/cloutgrid_logo_icon.png';
import { Button, TextField } from 'actify';
import creator_bg from '@/assets/jamie-street-_94HLr_QXo8-unsplash.jpg';
import brand_bg from '@/assets/marvin-meyer-SYTO3xs06fU-unsplash.jpg';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { getCategoryIcon, getCategoryLabel } from '@/utils/categories';
import CloutModal from '@/components/CloutModal';
import CategoryModal from '@/components/CategoryModal';
import { useAppDispatch } from '@/app/hooks';
import { handleOTP, register } from '@/slices/authSlice';
import { CircleCheckBig } from 'lucide-react';

const VALID_TYPES = ['creator', 'brand'] as const;
type RegisterType = (typeof VALID_TYPES)[number];

function isValidType(value: string | undefined): value is RegisterType {
  return VALID_TYPES.includes(value as RegisterType);
}

const RegistrationFlow = () => {
  const { type } = useParams<{ type: string }>();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [category, setCategory] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [showCategories, setShowCategories] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const reg_bg = type === 'creator' ? creator_bg : brand_bg;

  if (!isValidType(type)) {
    return <Navigate to="/register" replace />;
  }

  const handleContinue = () => {
    if (!name || !username || !email) {
      toast.error('Please fill in all fields');
      return;
    }

    const data: Record<string, string> = {
      name: name,
      username: username,
      email: email,
    };

    if (emailVerified) {
      setIsFirst(false);
    } else if (!emailSent) {
      dispatch(handleOTP({ type: 'send', data }))
        .unwrap()
        .then(() => {
          toast.success('OTP sent to your email');
          setEmailSent(true);
        })
        .catch((error) => toast.error('Error: ' + error));
    } else {
      if (!otp) {
        toast.error('Enter OTP!');
        return;
      }

      data['otp'] = otp;
      dispatch(handleOTP({ type: 'verify', data }))
        .unwrap()
        .then(() => {
          toast.success('Email verified');
          setEmailVerified(true);
          setIsFirst(false);
        })
        .catch((error) => toast.error('Error: ' + error));
    }
  };

  const handleSubmit = () => {
    if (!name || !username || !email) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!password || password != confirmPassword) {
      toast.error('Passwords do not match or are empty');
      return;
    }

    if (!category) {
      toast.error('You have to choose a category');
      return;
    }

    const data: Record<string, string> = {
      'user.name': name,
      'user.username': username,
      'user.email': email,
      'user.password': password,
      category: category,
    };

    dispatch(register({ type: type === 'creator' ? 'creator' : 'business', data }))
      .unwrap()
      .then(() => {
        toast.success('Registration successful! Please login.');
        navigate('/login', { replace: true, state: null });
      })
      .catch((error) => toast.error('Error: ' + error));
  };

  const PartOne = () => {
    return (
      <div className="flex flex-col gap-3 w-full px-3">
        <TextField label="Name" variant="outlined" value={name} onChange={setName} />

        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={setUsername}
          isDisabled={emailSent || emailVerified}
          trailingIcon={
            emailSent ? <CircleCheckBig className="text-secondary w-5 h-5" /> : undefined
          }
        />

        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={setEmail}
          type="email"
          isDisabled={emailSent || emailVerified}
          trailingIcon={
            emailVerified ? <CircleCheckBig className="text-secondary w-5 h-5" /> : undefined
          }
        />

        {emailSent && !emailVerified && (
          <TextField
            value={otp}
            onChange={setOTP}
            label="OTP"
            variant="outlined"
            inputMode="numeric"
          />
        )}
      </div>
    );
  };

  const PartTwo = () => {
    return (
      <div className="flex flex-col gap-3 w-full px-3">
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={setPassword}
          type="password"
        />

        <TextField
          label="Confirm Password"
          variant="outlined"
          value={confirmPassword}
          onChange={setConfirmPassword}
          type="password"
        />

        <TextField
          label="Category"
          variant="outlined"
          trailingIcon={(() => {
            const CategoryIcon = getCategoryIcon(category);
            return CategoryIcon ? <CategoryIcon /> : undefined;
          })()}
          inputProps={
            {
              value: getCategoryLabel(category),
              readOnly: true,
              ref: inputRef,
              className: 'cursor-pointer caret-transparent',
              onFocus: () => setShowCategories(true),
              onClick: () => setShowCategories(true),
            } as React.InputHTMLAttributes<HTMLInputElement>
          }
        />
      </div>
    );
  };

  return (
    <div className="min-h-dvh mx-auto noselect">
      <Toaster position="top-left" />
      <Link to="/" className="p-0 absolute top-1 left-1">
        <img src={logo} alt="Cloutgrid logo" className="h-14 w-14 object-center" />
      </Link>

      <div className="flex">
        <div className="flex flex-col flex-1 justify-center items-center gap-7 h-dvh">
          <h1 className="text-3xl font-bold">
            {`${type === 'creator' ? 'Creator' : 'Brand'} `} Signup
          </h1>

          {isFirst ? PartOne() : PartTwo()}

          <div className="flex justify-center items-center gap-3 w-full">
            {!isFirst && (
              <Button color="primary" variant="filled" onPress={() => setIsFirst(true)}>
                Go Back
              </Button>
            )}

            <Button
              color="primary"
              variant="filled"
              onPress={() => {
                if (isFirst) {
                  handleContinue();
                } else {
                  handleSubmit();
                }
              }}
            >
              {isFirst ? 'Continue' : 'Submit'}
            </Button>
          </div>

          {!isFirst && (
            <span className="text-sm text-center text-gray-500 px-3">
              By continuing, you agree to our{' '}
              <Link to="/eula" className="text-secondary hover:underline">
                License Agreement
              </Link>{' '}
              and{' '}
              <Link to="/privacypolicy" className="text-secondary hover:underline">
                Privacy Policy
              </Link>
            </span>
          )}
        </div>

        <div className="hidden lg:flex flex-2 h-dvh">
          <img className="object-cover" src={reg_bg} alt="Login Cover" />
        </div>
      </div>

      <CloutModal isOpen={showCategories} onClose={() => setShowCategories(false)}>
        <CategoryModal
          selectedValue={category}
          onSelect={(value) => {
            setCategory(value);
            setShowCategories(false);
          }}
        />
      </CloutModal>
    </div>
  );
};

export default RegistrationFlow;
