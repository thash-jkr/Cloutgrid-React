import { Button } from 'actify';
import { YoutubeConstants } from './IntegrationConstants';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';
import {
  fetchYoutubeChannel,
  fetchYoutubeMedia,
  loadOwnYoutubeChannel,
  loadOwnYoutubeMedia,
} from '@/slices/integrationSlice';
import toast from 'react-hot-toast';
import type { YoutubeChannelModel, YoutubeMediaModel } from '@/types/integrationTypes';
import { GlobeOff, RefreshCcw } from 'lucide-react';
import CloutButton from '@/components/CloutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

const NotConnected = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Button variant="filled">
          <span>Connect YouTube</span>
        </Button>
        <span className="text-xs text-gray-500">This feature is in development</span>
      </div>

      <YoutubeConstants />
    </>
  );
};

const Connected = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { youtubeChannel, youtubeMedia } = useAppSelector((state) => state.integration);

  useEffect(() => {
    // console.log(youtubeMedia);

    if (user && !youtubeChannel) {
      dispatch(loadOwnYoutubeChannel(user.username));
      dispatch(loadOwnYoutubeMedia(user.username));
    }
  }, [user, dispatch]);

  const syncInstagram = () => {
    const page_id = toast.loading('Syncing Instagram Page...');
    const media_id = toast.loading('Syncing Instagram Media...');

    dispatch(fetchYoutubeChannel())
      .unwrap()
      .then(() => {
        user && dispatch(loadOwnYoutubeChannel(user.username));
        toast.success('Instagram Page Synced', { id: page_id });
      })
      .catch((error) => {
        toast.error('Failed to sync Instagram Page: ' + error, { id: page_id });
      });

    dispatch(fetchYoutubeMedia())
      .unwrap()
      .then(() => {
        user && dispatch(loadOwnYoutubeMedia(user.username));
        toast.success('Instagram Media Synced', { id: media_id });
      })
      .catch((error) => {
        toast.error('Failed to sync Instagram Media: ' + error, { id: media_id });
      });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center gap-5">
      {youtubeChannel && <YTChannel channel={youtubeChannel} onSync={syncInstagram} />}
      {youtubeChannel && <YTMedia mediaList={youtubeMedia} />}
    </div>
  );
};

export const YTChannel = ({
  channel,
  onSync,
  other = false,
}: {
  channel: YoutubeChannelModel;
  onSync: () => void;
  other?: boolean;
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <img src={channel.profile_picture_url} alt="Profile" className="w-32 h-32 rounded-full" />

      <div className="flex justify-center items-center gap-3">
        <Button
          variant="outlined"
          onPress={() =>
            window.open(
              'https://www.youtube.com/channel/' + channel.id,
              '_blank',
              'noopener,noreferrer',
            )
          }
        >
          <FontAwesomeIcon icon={faYoutube} />
          <span className="font-bold">{channel.title}</span>
        </Button>

        {!other && <CloutButton icon={RefreshCcw} onClick={() => onSync()} />}
        {!other && <CloutButton icon={GlobeOff} onClick={() => {}} />}
      </div>

      <div className="flex justify-center items-center gap-10">
        <div className="flex flex-col justify-center items-center">
          <span className="font-bold">{channel.subscriber_count}</span>
          <span className="text-sm text-gray-500">Subscribers</span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <span className="font-bold">{channel.video_count}</span>
          <span className="text-sm text-gray-500">Videos</span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <span className="font-bold">{channel.view_count}</span>
          <span className="text-sm text-gray-500">Views</span>
        </div>
      </div>
    </div>
  );
};

export const YTMedia = ({ mediaList }: { mediaList: YoutubeMediaModel[] }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full p-3">
      <h2 className="font-semibold text-lg">Media Insights</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
        {mediaList.map((media) => (
          <div
            key={media.id}
            className="flex flex-col justify-start items-center
              w-full shadow rounded-xl font-semibold aspect-3/4 overflow-hidden 
              transition-transform duration-300 ease-in-out 
              transform hover:scale-95 hover:shadow-none relative"
          >
            <img src={media.thumbnail_url} alt="Media" className="h-full object-cover" />

            <div className="bg-white flex absolute bottom-1 left-1 p-1 rounded-lg gap-2">
              <MediaStats name="likes" value={media.likes} />
              <MediaStats name="comments" value={media.comments} />
              <MediaStats name="views" value={media.views} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MediaStats = ({ name, value }: { name: string; value: number }) => {
  const StatIcon = (name: string) => {
    switch (name) {
      case 'likes':
        return <span>❤️</span>;
      case 'comments':
        return <span>💬</span>;
      case 'views':
        return <span>👁️</span>;
      default:
        return <span>📊</span>;
    }
  };

  return (
    <div className="flex justify-center items-center gap-1">
      <span className="text-xs">{StatIcon(name)}</span>
      <span className="text-xs">{value}</span>
    </div>
  );
};

const YouTube = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="flex flex-col justify-start items-center gap-5 py-5">
      <h1 className="font-bold text-xl">YouTube Analytics 📈</h1>

      {user ? <Connected /> : <NotConnected />}
    </div>
  );
};

export default YouTube;
