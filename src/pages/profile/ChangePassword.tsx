import { useAppDispatch } from '@/app/hooks';
import { changePassword } from '@/slices/authSlice';
import { Button, TextField } from 'actify';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface ChangePasswordProps {
  onSuccess: () => void;
}

const ChangePassword = ({ onSuccess }: ChangePasswordProps) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useAppDispatch();

  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-5 p-3">
      <Toaster />
      <div className="w-full flex flex-col gap-3">
        <TextField
          variant="outlined"
          label="Current Password"
          type="password"
          value={oldPassword}
          onChange={setOldPassword}
        />
        <TextField
          variant="outlined"
          label="New Password"
          type="password"
          value={newPassword}
          onChange={setNewPassword}
        />
        <TextField
          variant="outlined"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
      </div>

      <Button
        variant="filled"
        onPress={() => {
          if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error('Please fill in all fields.');
            return;
          }

          if (newPassword !== confirmPassword) {
            toast.error('New password and confirm password do not match.');
            return;
          }

          dispatch(changePassword({ oldPassword, newPassword })).unwrap()
            .then(() => {
              toast.success('Password changed successfully.');
              onSuccess();
            })
            .catch((error) => {
              toast.error(`Error changing password: ${error}`);
            });
        }}
      >
        <span>Change Password</span>
      </Button>
    </div>
  );
};

export default ChangePassword;
