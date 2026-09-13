import CloutEmpty from '@/components/CloutEmpty';
import instagramIcon from '@/assets/isometric/instagram_insight.png';
import type { UserProfile } from '@/types/authTypes';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';
import { readOtherInstagramMedia, readOtherInstagramProfile } from '@/slices/integrationSlice';
import { IGMediaInsights, IGProfileInsights } from './Instagram';

const NotConnected = ({ username }: { username: string }) => {
  return (
    <div>
      <CloutEmpty
        icon={instagramIcon}
        message={`@${username} hasn't connected their Instagram yet!`}
      />
    </div>
  );
};

const Connected = ({ username }: { username: string }) => {
  const { otherInstagramPage, otherInstagramMedia } = useAppSelector((state) => state.integration);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(readOtherInstagramProfile(username));
    dispatch(readOtherInstagramMedia(username));
  }, [dispatch]);

  return (
    <div className="w-full flex flex-col justify-start items-center gap-5">
      {otherInstagramPage && (
        <IGProfileInsights page={otherInstagramPage} other={true} onSync={() => {}} />
      )}
      {otherInstagramPage && <IGMediaInsights mediaList={otherInstagramMedia} />}
    </div>
  );
};

const OtherInstagram = ({ user }: { user: UserProfile }) => {
  return (
    <div className="flex flex-col justify-start items-center gap-5 py-5">
      <h1 className="font-bold text-xl">Instagram Insights 📊</h1>

      {user?.type === 'creator' && user?.instagram_connected ? (
        <Connected username={user.username} />
      ) : (
        <NotConnected username={user.username} />
      )}
    </div>
  );
};

export default OtherInstagram;
