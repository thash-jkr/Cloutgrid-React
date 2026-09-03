import { useState } from 'react';
import { Button, IconButton, TextField } from 'actify';
import imageCompression from 'browser-image-compression';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { handlePostImage } from '@/slices/createSlice';
import { aspectToString } from '@/utils/cropImage';
import Crop from './Crop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';

interface CreatePostProps {
  file: File;
  onClose: () => void;
}

type Step = 'crop' | 'details';

export default function CreatePost({ file, onClose }: CreatePostProps) {
  const dispatch = useAppDispatch();
  const { createLoading } = useAppSelector((state) => state.create);

  const [step, setStep] = useState<Step>('crop');
  const [imageSrc] = useState(() => URL.createObjectURL(file));
  const [aspect, setAspect] = useState(1);
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
  const [croppedPreviewUrl, setCroppedPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState('');

  const handleCropComplete = (blob: Blob, previewUrl: string, usedAspect: number) => {
    setCroppedBlob(blob);
    setCroppedPreviewUrl(previewUrl);
    setAspect(usedAspect);
    setStep('details');
  };

  const handleCropCancel = () => {
    if (croppedBlob) {
      setStep('details');
    } else {
      onClose();
    }
  };

  const handlePost = async () => {
    if (!croppedBlob) return;

    const compressedBlob = await imageCompression(croppedBlob as File, {
      maxSizeMB: 2,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
    });

    dispatch(
      handlePostImage({
        imageBlob: compressedBlob,
        caption,
        aspect: aspectToString(aspect),
      }),
    )
      .unwrap()
      .then(() => {
        toast.success('Posted');
        onClose();
      })
      .catch((error) => toast.error('Error posting: ' + error));
  };

  if (step === 'crop') {
    return (
      <Crop
        imageSrc={imageSrc}
        initialAspect={aspect}
        onCancel={handleCropCancel}
        onComplete={handleCropComplete}
      />
    );
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-y-auto gap-3 pb-6">
      <Toaster />
      <div className="relative w-full">
        <img src={croppedPreviewUrl!} alt="Preview" className="w-full object-cover" />

        <div className="absolute bottom-3 right-3 transition-transform duration-300 hover:scale-105">
          <IconButton onPress={() => setStep('crop')}>
            <div
              className="flex h-10 w-10 items-center justify-center 
            rounded-full border bg-white shadow"
            >
              <FontAwesomeIcon icon={faEdit} />
            </div>
          </IconButton>
        </div>
      </div>

      <div className="flex flex-col px-3 gap-3 justify-center items-center w-full">
        <div className="w-full">
          <TextField
            label="Caption"
            type="textarea"
            variant="outlined"
            inputProps={
              {
                rows: 3,
                value: caption,
                onChange: (e) => setCaption(e.target.value),
              } as React.InputHTMLAttributes<HTMLInputElement>
            }
          />
        </div>

        <div>
          <Button variant="filled" color="primary" isDisabled={createLoading} onPress={handlePost}>
            {createLoading ? 'Posting…' : 'Post'}
          </Button>
        </div>
      </div>
    </div>
  );
}
