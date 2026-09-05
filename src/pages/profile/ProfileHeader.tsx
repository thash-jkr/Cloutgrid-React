import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getCategoryLabel } from '@/utils/categories';
import Settings from './Settings';
import CloutCapsule from '@/components/CloutCapsule';
import { Button } from 'actify';
import { handleBlock, handleFollow } from '@/slices/profileSlice';
import { useState } from 'react';
import CloutAlert from '@/components/CloutAlert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faBars, faWarning } from '@fortawesome/free-solid-svg-icons';
import type { MenuAction } from '@/components/CloutMenu';
import CloutMenu from '@/components/CloutMenu';

interface Props {
  other?: boolean;
}

const ProfileHeader = ({ other = false }: Props) => {
  const [unFollowConfirm, setUnFollowConfirm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showReportAlert, setShowReportAlert] = useState(false);
  const [showBlockAlert, setShowBlockAlert] = useState(false);

  const { user: authUser } = useAppSelector((state) => state.auth);
  const { posts, collabs, otherProfile, otherPosts, otherCollabs } = useAppSelector(
    (state) => state.profile,
  );

  const dispatch = useAppDispatch();

  const user = other ? otherProfile : authUser;

  const actions: MenuAction[] = [
    { icon: faBan, label: `Block @${user?.username}`, action: () => setShowBlockAlert(true) },
    { icon: faWarning, label: `Report @${user?.username}`, action: () => setShowReportAlert(true) },
  ];

  return (
    <div className="flex flex-col justify-center items-center w-full gap-3">
      <div
        className="flex flex-col justify-center items-center shadow w-full rounded-xl bg-white font-semibold text-xl 
          xl:text-lg md:text-base"
      >
        <div className="flex flex-col justify-center items-center w-full border-b gap-1 p-3">
          <h1 className="text-center">{user?.name}</h1>

          <span className="text-gray-600">@{user?.username}</span>
        </div>

        <div className="flex flex-col justify-center items-center w-full p-3 border-b gap-3">
          <div className="flex justify-around items-center w-full">
            <div className="w-1/2 flex flex-col justify-center items-center">
              <img
                className="w-28 h-28 rounded-full object-cover"
                src={`${user?.profile_photo}`}
                alt="Profile"
              />
            </div>
            <div className="w-1/2 h-full flex flex-col justify-around items-end">
              <div className="flex justify-center items-center">
                <h1 className="mr-2">{user?.followers_count}</h1>
                <h1>Followers</h1>
              </div>
              <div className="flex justify-center items-center">
                <h1 className="mr-2">{user?.following_count}</h1>
                <h1>Following</h1>
              </div>
              <div className="flex justify-center items-center">
                <h1 className="mr-2">{other ? otherPosts.length : posts.length}</h1>
                <h1>Posts</h1>
              </div>
              {user?.type === 'business' && (
                <div className="flex justify-center items-center">
                  <h1 className="mr-2">{other ? otherCollabs.length : collabs.length}</h1>
                  <h1>Collabs</h1>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-around w-full gap-1">
            <CloutCapsule text={getCategoryLabel(user?.category)} />

            {user?.type === 'business' && user?.website && (
              <CloutCapsule text={user.website} bg="bg-primary" />
            )}
          </div>

          {other && otherProfile && (
            <div className="flex justify-center items-center gap-3 w-full">
              <Button
                variant={otherProfile.is_following ? 'outlined' : 'filled'}
                onPress={() => {
                  if (otherProfile.is_following) {
                    setUnFollowConfirm(true);
                  } else {
                    dispatch(
                      handleFollow({
                        username: otherProfile.username,
                        follow: true,
                      }),
                    );
                  }
                }}
              >
                {otherProfile?.is_following ? 'Following' : 'Follow'}
              </Button>

              <div
                className="w-10 h-10 border rounded-full flex justify-center 
              items-center cursor-pointer transition-transform duration-300 
              ease-in-out transform hover:scale-105 hover:shadow"
                onClick={() => setShowMenu(true)}
              >
                <FontAwesomeIcon icon={faBars} />
              </div>
            </div>
          )}
        </div>

        <div className="p-3 w-full flex flex-col justify-start items-start font-normal text-base">
          <span>{user?.bio}</span>
        </div>
      </div>

      {!other && (
        <div className="w-full">
          <Settings />
        </div>
      )}

      <CloutAlert
        isOpen={unFollowConfirm}
        onClose={() => setUnFollowConfirm(false)}
        title={`Unfollow @${otherProfile?.username}?`}
        body={`Are you sure you want to unfollow @${otherProfile?.username}?`}
        onSubmit={() => {
          otherProfile &&
            dispatch(
              handleFollow({
                username: otherProfile.username,
                follow: false,
              }),
            );
          setUnFollowConfirm(false);
        }}
      />

      <CloutMenu isOpen={showMenu} onClose={() => setShowMenu(false)} actions={actions} />

      <CloutAlert
        isOpen={showReportAlert}
        onClose={() => setShowReportAlert(false)}
        title={`Report @${user?.username}?`}
        body={`Tell us why you are reporting @${user?.username}. This will be sent to our moderation team for review.`}
        onSubmit={() => {
          setShowReportAlert(false);
        }}
        textField={true}
      />

      <CloutAlert
        isOpen={showBlockAlert}
        onClose={() => setShowBlockAlert(false)}
        title={`Block @${user?.username}?`}
        body={`Are you sure you want to block @${user?.username}?`}
        onSubmit={() => {
          user && dispatch(handleBlock({ username: user.username, block: true }));
          setShowBlockAlert(false);
        }}
      />
    </div>
  );
};

export default ProfileHeader;
