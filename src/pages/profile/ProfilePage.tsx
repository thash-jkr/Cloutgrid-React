import NavBar from '@/components/NavBar';
import ProfileHeader from './ProfileHeader';
import Settings from './Settings';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import ProfileBody from './ProfileBody';
import { useEffect } from 'react';
import { fetchPosts } from '@/slices/profileSlice';

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { posts, collabs } = useAppSelector((state) => state.profile);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user != null) {
      dispatch(fetchPosts({ username: user.username }));
    }
  }, [dispatch, user]);

  return (
    <div className="container mx-auto flex flex-col lg:flex-row items-start mt-18 lg:mt-22 gap-3">
      <NavBar />

      <div className="flex lg:basis-1/4 w-full noselect">
        <ProfileHeader />
      </div>

      <div className="flex w-full lg:basis-2/4">
        {user != null && <ProfileBody posts={posts} collabs={collabs} user={user} />}
      </div>

      <div className="hidden lg:flex basis-1/4 w-full noselect">
        <Settings />
      </div>
    </div>
  );
};

export default ProfilePage;
