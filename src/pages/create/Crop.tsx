import { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Cropper, { type Area } from 'react-easy-crop';
import { Button } from 'actify';
import { getCroppedImageBlob } from '@/utils/cropImage';

interface CropProps {
  imageSrc: string;
  onCancel: () => void;
  onComplete: (blob: Blob, previewUrl: string, aspect: number) => void;
  squareOnly?: boolean;
}

const ASPECT_OPTIONS = [
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '3:4', value: 3 / 4 },
];

export default function Crop({ imageSrc, onCancel, onComplete, squareOnly = false }: CropProps) {
  const [aspect, setAspect] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleNext = async () => {
    if (!croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const blob = await getCroppedImageBlob(imageSrc, croppedAreaPixels);
      const previewUrl = URL.createObjectURL(blob);
      onComplete(blob, previewUrl, aspect);
    } finally {
      setIsProcessing(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-60 flex flex-col bg-black/60">
      <div className="relative flex-1">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      </div>

      <div className="flex flex-col gap-4 bg-black/50 p-4">
        {!squareOnly && (
          <div className="flex justify-center gap-2">
            {ASPECT_OPTIONS.map((option) => (
              <Button
                key={option.label}
                variant={aspect === option.value ? 'filled' : 'outlined'}
                color="primary"
                onPress={() => setAspect(option.value)}
              >
                <span className="text-white">{option.label}</span>
              </Button>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="outlined" color="secondary" onPress={onCancel}>
            <span className="text-white">Cancel</span>
          </Button>
          <Button variant="filled" color="primary" isDisabled={isProcessing} onPress={handleNext}>
            {isProcessing ? 'Processing…' : 'Next'}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
