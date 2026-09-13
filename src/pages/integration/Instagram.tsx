import { Button } from 'actify';
import { InstagramConstants } from './IntegrationConstants';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect, useState } from 'react';
import {
  connectInstagram,
  disconnectInstagram,
  fetchInstagramMedia,
  fetchInstagramProfile,
  loadOwnInstagramMedia,
  loadOwnInstagramProfile,
} from '@/slices/integrationSlice';
import type { InstagramMediaModel, InstagramPageModel } from '@/types/integrationTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import CloutButton from '@/components/CloutButton';
import { GlobeOff, RefreshCcw } from 'lucide-react';
import { timeAgo } from '@/utils/timeAgo';
import CloutAlert from '@/components/CloutAlert';
import toast, { Toaster } from 'react-hot-toast';
import { ApiConfig } from '@/app/apiConfig';
import { useNavigate } from 'react-router-dom';

const NotConnected = () => {
  const { access } = useAppSelector((state) => state.auth);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Button
          variant="filled"
          onPress={() =>
            window.open(`${ApiConfig.baseUrl}/auth/instagram/start?token=${access}&medium=web`)
          }
        >
          <span>Connect Instagram</span>
        </Button>
        <span className="text-xs text-gray-500">This feature is in development</span>
      </div>

      <InstagramConstants />
    </>
  );
};

const Connected = ({ onSync }: { onSync: () => void }) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { instagramPage, instagramMedia } = useAppSelector((state) => state.integration);

  useEffect(() => {
    // console.log(instagramMedia);

    if (user && !instagramPage) {
      dispatch(loadOwnInstagramProfile(user.username));
      dispatch(loadOwnInstagramMedia(user.username));
    }
  }, [user, dispatch]);

  return (
    <div className="w-full flex flex-col justify-start items-center gap-5">
      {instagramPage && <IGProfileInsights page={instagramPage} onSync={onSync} />}
      {instagramMedia && <IGMediaInsights mediaList={instagramMedia} />}
    </div>
  );
};

export const IGProfileInsights = ({
  page,
  other = false,
  onSync,
}: {
  page: InstagramPageModel;
  other?: boolean;
  onSync: () => void;
}) => {
  const [confirmSync, setConfirmSync] = useState(false);
  const [confirmDisconnect, setConfirmDisconnect] = useState(false);

  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col justify-start items-center gap-3">
      <img src={page.profile_picture_url} alt="Profile" className="w-52 h-52 rounded-full" />

      <div className="flex justify-center items-center gap-3">
        <Button
          variant="outlined"
          onPress={() =>
            window.open(
              'https://www.instagram.com/' + page.username,
              '_blank',
              'noopener,noreferrer',
            )
          }
        >
          <FontAwesomeIcon icon={faInstagram} />
          <span className="font-bold">@{page.username}</span>
        </Button>

        {!other && <CloutButton icon={RefreshCcw} onClick={() => setConfirmSync(true)} />}

        {!other && <CloutButton icon={GlobeOff} onClick={() => setConfirmDisconnect(true)} />}
      </div>

      <span className="text-xs text-gray-500">Last synced {timeAgo(page.last_synced_at)}</span>

      <div className="flex justify-center items-center gap-10">
        <div className="flex flex-col justify-center items-center">
          <span className="font-bold">{page.followers}</span>
          <span className="text-sm text-gray-500">Followers</span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <span className="font-bold">{page.followings}</span>
          <span className="text-sm text-gray-500">Following</span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <span className="font-bold">{page.media_count}</span>
          <span className="text-sm text-gray-500">Posts</span>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-3 w-full text-xs lg:text-base">
        <h2 className="font-semibold text-lg">Profile Insights</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
          {page.insights_raw.map((insight) => (
            <div
              key={insight.id}
              className="flex flex-col justify-center items-center gap-1 
              w-full border shadow rounded-2xl p-3 aspect-video font-semibold"
            >
              <span className="">{insight.title}</span>
              <span className="">{insight.total_value?.value ?? 0}</span>
            </div>
          ))}
        </div>
      </div>

      <CloutAlert
        isOpen={confirmSync}
        onClose={() => setConfirmSync(false)}
        onSubmit={() => {
          onSync();
          setConfirmSync(false);
        }}
        title="Sync Instagram"
        body="Do you want to sync Instagram account?"
      />

      <CloutAlert
        isOpen={confirmDisconnect}
        onClose={() => setConfirmDisconnect(false)}
        onSubmit={() => {
          dispatch(disconnectInstagram())
            .unwrap()
            .then(() => {
              toast.success('Instagram disconnected');
              setConfirmDisconnect(false);
            })
            .catch((error) => {
              toast.error('Failed to disconnect Instagram: ' + error);
            });
        }}
        title="Disconnect Instagram"
        body="Are you sure you want to disconnect your Instagram account? 
        This will remove all your Instagram data from Cloutgrid."
        timed={true}
      />
    </div>
  );
};

export const IGMediaInsights = ({ mediaList }: { mediaList: InstagramMediaModel[] }) => {
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
            <img src={media.media_url} alt="Media" className="h-full object-cover" />

            <div className="bg-white flex absolute bottom-1 left-1 p-1 rounded-lg gap-2">
              <MediaStats name="likes" value={media.like_count} />

              {media.insights_raw.length > 0 ? (
                media.insights_raw.map((insight) => (
                  <MediaStats name={insight.name} value={insight.values[0]?.value ?? 0} />
                ))
              ) : (
                <MediaStats name="comments" value={media.comments_count} />
              )}
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

const Instagram = () => {
  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const connected = params.get('instagram') === 'connected';
    if ((user?.type === 'creator' && user?.instagram_connected) || !connected) {
      return;
    }

    const id = toast.loading('Connecting Instagram...');

    params.delete('instagram');

    navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });

    dispatch(connectInstagram())
      .unwrap()
      .then(() => {
        toast.success('Instagram connected successfully!', { id });
        syncInstagram();
      })
      .catch((error) => {
        toast.error(`Failed to connect Instagram: ${error}`, { id });
      });
  }, [location.pathname, location.search, navigate]);

  const syncInstagram = () => {
    const page_id = toast.loading('Syncing Instagram Page...');
    const media_id = toast.loading('Syncing Instagram Media...');

    dispatch(fetchInstagramProfile())
      .unwrap()
      .then(() => {
        user && dispatch(loadOwnInstagramProfile(user.username));
        toast.success('Instagram Page Synced', { id: page_id });

        dispatch(fetchInstagramMedia())
          .unwrap()
          .then(() => {
            user && dispatch(loadOwnInstagramMedia(user.username));
            toast.success('Instagram Media Synced', { id: media_id });
          })
          .catch((error) => {
            toast.error('Failed to sync Instagram Media: ' + error, { id: media_id });
          });
      })
      .catch((error) => {
        toast.error('Failed to sync Instagram Page: ' + error, { id: page_id });
      });
  };

  return (
    <div className="flex flex-col justify-start items-center gap-5 py-5">
      <Toaster />
      <h1 className="font-bold text-xl">Instagram Insights 📊</h1>

      {user?.type === 'creator' && user?.instagram_connected ? (
        <Connected onSync={syncInstagram} />
      ) : (
        <NotConnected />
      )}
    </div>
  );
};

export default Instagram;
