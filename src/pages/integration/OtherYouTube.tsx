import { useAppDispatch, useAppSelector } from '@/app/hooks';
import youtubeIcon from '@/assets/isometric/youtube_analytics.png';
import CloutEmpty from '@/components/CloutEmpty';
import { readOtherYoutubeChannel, readOtherYoutubeMedia } from '@/slices/integrationSlice';
import type { UserProfile } from '@/types/authTypes';
import { useEffect } from 'react';
import { YTChannel, YTMedia } from './YouTube';

const NotConnected = ({ username }: { username: string }) => {
  return (
    <div>
      <CloutEmpty icon={youtubeIcon} message={`@${username} hasn't connected their YouTube yet!`} />
    </div>
  );
};

const Connected = ({ username }: { username: string }) => {
  const { otherYoutubeChannel, otherYoutubeMedia } = useAppSelector((state) => state.integration);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(readOtherYoutubeChannel(username));
    dispatch(readOtherYoutubeMedia(username));
  }, [dispatch]);

  return (
    <div className="w-full flex flex-col justify-start items-center gap-5">
      {otherYoutubeChannel && (
        <YTChannel channel={otherYoutubeChannel} other={true} onSync={() => {}} />
      )}
      {otherYoutubeChannel && <YTMedia mediaList={otherYoutubeMedia} />}
    </div>
  );
};

const OtherYouTube = ({ user }: { user: UserProfile }) => {
  return (
    <div className="flex flex-col justify-start items-center gap-5 py-5">
      <h1 className="font-bold text-xl">YouTube Analytics 📈</h1>

      {user.type == 'creator' && user.youtube_connected ? (
        <Connected username={user.username} />
      ) : (
        <NotConnected username={user.username} />
      )}
    </div>
  );
};

export default OtherYouTube;
