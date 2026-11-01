import NavBar from '@/components/NavBar';
import Settings from './Settings';
import FeedRight from '../feed/FeedRight';
import ProfileHeader from './ProfileHeader';

const ProfileAlt = () => {
  return (
    <div className="container mx-auto flex flex-col lg:flex-row items-start mt-18 lg:mt-22 gap-3 mb-20">
      <NavBar />

      <ProfileHeader />
      <Settings />
      <FeedRight />
    </div>
  );
};

export default ProfileAlt;
