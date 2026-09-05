import { useAppDispatch, useAppSelector } from '@/app/hooks';
import CategoryModal from '@/components/CategoryModal';
import CloutModal from '@/components/CloutModal';
import { updateProfile } from '@/slices/authSlice';
import { checkLabel, getCategoryIcon, getCategoryLabel } from '@/utils/categories';
import { Button, TextField } from 'actify';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Crop from '../create/Crop';
import imageCompression from 'browser-image-compression';
import { Pencil } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const EditProfile = ({ onClose }: Props) => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [category, setCategory] = useState('');
  const [website, setWebsite] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
  const [croppedPreviewUrl, setCroppedPreviewUrl] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user, type } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setBio(user.bio || '');
      setCategory(user.category || '');
      user.type == 'business' && setWebsite(user.website || '');
    }
  }, [user]);

  const handleSubmit = async () => {
    const toastId = toast.loading('Updating profile...');

    if (name.trim() === '' || bio.trim() === '' || category.trim() === '') {
      toast.error('Fields cannot be empty', { id: toastId });
      return;
    }

    if (checkLabel(category)) {
      toast.error('Please select a valid category', { id: toastId });
      return;
    }

    const data: Record<string, string> = {
      name: name,
      bio: bio,
      category: category,
    };

    if (type == 'business') {
      data['website'] = website;
    }

    let finalBlob: Blob | undefined = croppedBlob ?? undefined;

    if (croppedBlob) {
      finalBlob = await imageCompression(croppedBlob as File, {
        maxSizeMB: 2,
        maxWidthOrHeight: 1080,
        useWebWorker: true,
      });
    }

    type &&
      dispatch(updateProfile({ type, data, imageBlob: finalBlob }))
        .unwrap()
        .then(() => {
          toast.success('Profile updated', { id: toastId });
          onClose();
        })
        .catch((error) => {
          toast.error('Error: ' + error, { id: toastId });
        });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
    e.target.value = '';
  };

  const handleCropComplete = (blob: Blob, previewUrl: string) => {
    setCroppedBlob(blob);
    setCroppedPreviewUrl(previewUrl);
    setSelectedFile(null);
  };

  return (
    <div className="flex flex-col justify-start items-center p-3 h-full min-h-0 w-full overflow-y-auto gap-3">
      <Toaster />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="p-5 relative group" onClick={() => fileInputRef.current?.click()}>
        <img
          src={croppedPreviewUrl ? croppedPreviewUrl : user?.profile_photo}
          className="w-32 h-32 rounded-full cursor-pointer"
        />

        <div
          className="absolute bg-white shadow border 
        rounded-full h-7 w-7 flex items-center justify-center bottom-8 left-17
        transition-transform duration-300 group-hover:scale-110"
        >
          <Pencil className='h-4 w-4' />
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <TextField label="Name" variant="outlined" value={name} onChange={setName} />

        <TextField
          label="Bio"
          variant="outlined"
          type="textarea"
          inputProps={
            {
              rows: 5,
              value: bio,
              onChange: (e) => setBio(e.target.value),
            } as React.InputHTMLAttributes<HTMLInputElement>
          }
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

        {type == 'business' && (
          <TextField label="Website" variant="outlined" value={website} onChange={setWebsite} />
        )}
      </div>

      <Button variant="filled" onPress={handleSubmit}>
        Save
      </Button>

      <CloutModal isOpen={showCategories} onClose={() => setShowCategories(false)}>
        <CategoryModal selectedValue={category} onSelect={setCategory} />
      </CloutModal>

      {selectedFile && (
        <Crop
          imageSrc={URL.createObjectURL(selectedFile)}
          onCancel={() => setSelectedFile(null)}
          onComplete={handleCropComplete}
          squareOnly={true}
        />
      )}
    </div>
  );
};

export default EditProfile;
