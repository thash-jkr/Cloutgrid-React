import { Button } from 'actify';
import ProfileInsightsInfo, {
  InstagramConstants,
  MediaInsightsInfo,
  ReachInfo,
} from './IntegrationConstants';
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
import { GlobeOff, Info, RefreshCcw, Share } from 'lucide-react';
import { timeAgo } from '@/utils/timeAgo';
import CloutAlert from '@/components/CloutAlert';
import toast, { Toaster } from 'react-hot-toast';
import { ApiConfig } from '@/app/apiConfig';
import { useNavigate } from 'react-router-dom';
import { compactCount } from '@/utils/compactCount';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';
import { copyToClipboard } from '@/utils/copyToClipboard';
import noProfile from '@/assets/default_profile.png';
import noImage from '@/assets/noMedia.jpg';
import CloutImage from '@/components/CloutImage';
import CloutEmpty from '@/components/CloutEmpty';
import instagramIcon from '@/assets/isometric/instagram_insight.png';
import CloutModal from '@/components/CloutModal';
import ProfileHero, { MediaHero } from './InsightsHero';

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

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
    if (user && !instagramPage) {
      dispatch(loadOwnInstagramProfile(user.username));
      dispatch(loadOwnInstagramMedia(user.username));
    }
  }, [user, dispatch]);

  return (
    <div className="w-full flex flex-col justify-start items-center gap-5">
      {instagramPage && (
        <IGProfileInsights page={instagramPage} onSync={onSync} username={user?.username} />
      )}
      {instagramMedia && <IGMediaInsights mediaList={instagramMedia} />}
    </div>
  );
};

export const IGProfileInsights = ({
  page,
  other = false,
  onSync,
  username,
}: {
  page: InstagramPageModel;
  other?: boolean;
  onSync: () => void;
  username?: string;
}) => {
  const [confirmSync, setConfirmSync] = useState(false);
  const [confirmDisconnect, setConfirmDisconnect] = useState(false);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [showReachInfo, setShowReachInfo] = useState(false);
  const [showMediaInfo, setShowMediaInfo] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const chartData = page.reach.map((point) => ({
    ...point,
    label: formatDate(point.date),
  }));

  const handleCopy = async () => {
    try {
      await copyToClipboard(`https://cloutgrid.com/vitae/${username}/`);
      toast.success('Clout Vitae link copied to clipboard');
      setTimeout(() => navigate(`/vitae/${username}/`), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex flex-col justify-start items-center gap-3 w-full">
      <CloutImage
        src={page.profile_picture_url}
        fallback={noProfile}
        alt="Profile"
        className="w-52 h-52 rounded-full object-cover"
      />

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

        {username && <CloutButton icon={Share} onClick={() => handleCopy()} />}
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

      <div className="flex flex-col justify-center items-center gap-3 w-full lg:w-1/2 p-3 text-xs lg:text-base">
        <h2 className="font-semibold text-lg flex justify-center items-center gap-1">
          Profile Insights{' '}
          <Info
            className="w-4 h-4 hover:text-orange-500 cursor-pointer duration-300"
            onClick={() => setShowProfileInfo(true)}
          />{' '}
        </h2>

        <ProfileHero insights={page.insights} />

        <div className="grid grid-cols-2 gap-3 w-full">
          {page.insights.map((insight) => (
            <div
              key={insight.name}
              className="flex flex-col justify-center items-center gap-1 
              w-full border shadow rounded-2xl p-5 bg-white aspect-video font-semibold"
            >
              <span className="text-xl">
                {compactCount(insight.value)}{' '}
                <span
                  className={`text-sm font-thin ${insight.change > 0 ? 'text-green-500' : 'text-red-500'}`}
                >
                  {insight.change > 0 && '+'}
                  {insight.change}%
                </span>
              </span>
              <span className="w-full truncate text-center text-sm font-normal text-gray-500">
                {insight.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full lg:p-10 flex-col items-center justify-center gap-1 text-xs lg:text-base select-none">
        <h2 className="font-semibold text-lg flex justify-center items-center gap-1">
          Reach over Time{' '}
          <Info
            className="w-4 h-4 hover:text-orange-500 cursor-pointer duration-300"
            onClick={() => setShowReachInfo(true)}
          />{' '}
        </h2>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />

              <XAxis
                dataKey="label"
                tick={{ fontSize: 11 }}
                interval={Math.ceil(chartData.length / 7) - 1}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                width={40}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => compactCount(value)}
              />

              <Tooltip
                labelFormatter={(label) => String(label)}
                formatter={(value) => [
                  typeof value === 'number' ? value.toLocaleString() : String(value ?? ''),
                  'Reach',
                ]}
                contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 12 }}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--color-secondary)"
                strokeWidth={2}
                fill="url(#reachGradient)"
                dot={false}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-3 w-full lg:w-1/2 p-3 text-xs lg:text-base">
        <h2 className="font-semibold text-lg flex justify-center items-center gap-1">
          Media Insights
          <Info
            className="w-4 h-4 hover:text-orange-500 cursor-pointer duration-300"
            onClick={() => setShowMediaInfo(true)}
          />{' '}
        </h2>

        {page.media_insights.length == 0 ? (
          <CloutEmpty message={`Creator has not posted any reels recently!`} icon={instagramIcon} />
        ) : (
          <MediaHero insights={page.media_insights} />
        )}

        <div className="grid grid-cols-2 gap-3 w-full">
          {page.media_insights.map((insight) => (
            <div
              key={insight.name}
              className="flex flex-col justify-center items-center gap-1 
              w-full border shadow rounded-2xl p-5 bg-white aspect-video font-semibold"
            >
              <span className="text-xl">
                {insight.name == 'Avg. Watch Time'
                  ? Math.round(insight.average / 60) + 's'
                  : compactCount(insight.average)}
                {insight.name == 'Skip Rate' ? '% ' : ' '}
                <span
                  className={`text-sm font-thin ${insight.change > 0 ? (insight.name == 'Skip Rate' ? 'text-red-500' : 'text-green-500') : insight.name == 'Skip Rate' ? 'text-green-500' : 'text-red-500'}`}
                >
                  {insight.change > 0 && '+'}
                  {insight.change}%
                </span>
              </span>
              <span className="w-full truncate text-center text-sm font-normal text-gray-500">
                {insight.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <CloutModal
        isOpen={showProfileInfo}
        onClose={() => setShowProfileInfo(false)}
        title="Profile Insights"
        children={<ProfileInsightsInfo />}
      />

      <CloutModal
        isOpen={showReachInfo}
        onClose={() => setShowReachInfo(false)}
        title="Reach over Time"
        children={<ReachInfo />}
      />

      <CloutModal
        isOpen={showMediaInfo}
        onClose={() => setShowMediaInfo(false)}
        title="Media Insights"
        children={<MediaInsightsInfo />}
      />

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
    <div className="flex flex-col justify-center items-center gap-3 w-full p-3 lg:px-10">
      <h2 className="font-semibold text-lg">Recent Posts</h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-10 w-full">
        {mediaList.map((media) => (
          <div
            key={media.id}
            className="flex flex-col justify-start items-center
              w-full shadow rounded-xl font-semibold aspect-9/16 overflow-hidden 
              transition-transform duration-300 ease-in-out 
              transform hover:scale-95 hover:shadow-none relative cursor-pointer"
            onClick={() => window.open(media.link, '_blank', 'noopener,noreferrer')}
          >
            <CloutImage
              src={media.thumbnail_url || media.media_url}
              fallback={noImage}
              alt="Media"
              className="h-full w-full object-cover"
            />

            {/* <img
              src={media.thumbnail_url || media.media_url}
              alt="Media"
              className="object-contain"
            /> */}

            <div className="bg-white flex absolute bottom-1 left-1 p-1 rounded-lg gap-2">
              <MediaStats name="likes" value={media.like_count} />

              {media.media_type == 'VIDEO' ? (
                <MediaStats name="views" value={media.views} />
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
      <span className="text-xs">{compactCount(value)}</span>
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
