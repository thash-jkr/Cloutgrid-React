import { useRef } from 'react';
import { useAppSelector } from '@/app/hooks';
import postIcon from '@/assets/isometric/3d-speaker.png';
import collabIcon from '@/assets/isometric/deal.png';

interface CreateProps {
  onPostSelect: (file: File) => void;
  onCampaignSelect: () => void
}

const Create = ({ onPostSelect, onCampaignSelect }: CreateProps) => {
  const { type } = useAppSelector((state) => state.auth);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onPostSelect(file);
    e.target.value = '';
  };

  return (
    <div className='bg-background h-full p-3'>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div
        className="flex cursor-pointer items-start justify-center gap-3 rounded-2xl
          border bg-white p-3 transition-transform duration-300 hover:scale-95"
        onClick={() => fileInputRef.current?.click()}
      >
        <img src={postIcon} className="h-28 w-28" />
        <div>
          <h1 className="font-semibold">Post</h1>
          <p>
            {type === 'creator'
              ? `Upload an image from a previous brand collaboration or campaign you've been part of.`
              : `Share visuals from previous influencer campaigns or highlight your products/services.`}
          </p>
        </div>
      </div>

      {type === 'business' && (
        <div
          className="m-3 flex items-start justify-center gap-3 rounded-2xl
            border bg-white p-3 shadow transition-transform duration-300 hover:scale-95"
            onClick={() => onCampaignSelect}
        >
          <div>
            <h1 className="font-semibold">Campaign</h1>
            <p>Post a campaign to connect with creators who match your brand.</p>
          </div>
          <img src={collabIcon} className="h-28 w-28" />
        </div>
      )}
    </div>
  );
};

export default Create;