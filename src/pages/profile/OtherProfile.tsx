import { useAppDispatch, useAppSelector } from '@/app/hooks';
import NavBar from '@/components/NavBar';
import { fetchCollabs, fetchPosts, fetchProfile } from '@/slices/profileSlice';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileBody from './ProfileBody';
import CloutEmpty from '@/components/CloutEmpty';
import blockedIcon from '@/assets/isometric/delete.png';
import { Button } from 'actify';
import { handleBlock } from '@/slices/profileSlice';

const OtherProfile = () => {
  const { username } = useParams();

  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);
  const { otherProfile, otherPosts, otherCollabs } = useAppSelector((state) => state.profile);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (username == user?.username) {
      navigate('/profile', { replace: true });
      return;
    }

    if (username) {
      dispatch(fetchProfile({ username: username, other: true }))
        .unwrap()
        .then(({ user }) => {
          if (user.type == 'business') {
            dispatch(fetchCollabs({ username, other: true }));
          }
        });
      dispatch(fetchPosts({ username: username, other: true }));
    }
  }, [dispatch, username]);

  return (
    <>
      {otherProfile && (otherProfile.is_blocking || otherProfile.is_blocker) ? (
        <div className="container mx-auto flex justify-center items-start mt-18 lg:mt-22 gap-3 mb-20">
          <NavBar />

          <div className="flex flex-col justify-center items-center">
            <CloutEmpty icon={blockedIcon} message={'You cannot view this profile'} />

            {otherProfile.is_blocking && (
              <Button
                variant="filled"
                onPress={() => {
                  otherProfile &&
                    dispatch(handleBlock({ username: otherProfile.username, block: false }));
                }}
              >
                Unblock
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="container mx-auto flex flex-col lg:flex-row items-start mt-18 lg:mt-22 gap-3 mb-20">
          <NavBar />

          <div className="flex lg:basis-1/4 w-full noselect px-3 lg:px-0">
            <ProfileHeader other={true} />
          </div>

          <div className="flex w-full lg:basis-3/4 px-3 lg:px-0">
            {otherProfile && (
              <ProfileBody posts={otherPosts} collabs={otherCollabs} user={otherProfile} other={true} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OtherProfile;
