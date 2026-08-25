import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { logout } from '@/slices/authSlice';
import { Button } from 'actify';
import { useEffect } from 'react';

export default function FeedPage() {
  const dispatch = useAppDispatch();
  const { user, type } = useAppSelector((state) => state.auth);

  useEffect(() => {
    console.log(user)
  }, [])

  if (!user?.profile) {
    return <p className="p-4 text-sm text-gray-500">No user data available.</p>;
  }

  

  return (
    <div className="mx-auto max-w-xl p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Feed</h1>
        <Button variant="outlined" color="error" onPress={() => dispatch(logout())}>
          Logout
        </Button>
      </div>

      <div className="rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={user.profile.profile_photo}
            alt={user.profile.username}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-bold">{user.profile.name}</p>
            <p className="text-sm text-gray-500">@{user.profile.username}</p>
          </div>
        </div>

        {user.profile.bio && <p className="mt-4 text-sm text-gray-700">{user.profile.bio}</p>}

        <div className="mt-4 flex gap-6 text-sm">
          <span>
            <span className="font-semibold">{user.profile.followers_count}</span>{' '}
            <span className="text-gray-500">Followers</span>
          </span>
          <span>
            <span className="font-semibold">{user.profile.following_count}</span>{' '}
            <span className="text-gray-500">Following</span>
          </span>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-gray-500">Email</dt>
            <dd className="font-medium">{user.profile.email}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Account type</dt>
            <dd className="font-medium capitalize">{type ?? user.profile.user_type}</dd>
          </div>
          {user.area && (
            <div>
              <dt className="text-gray-500">Area</dt>
              <dd className="font-medium">{user.area}</dd>
            </div>
          )}
          {user.website && (
            <div>
              <dt className="text-gray-500">Website</dt>
              <dd className="font-medium">{user.website}</dd>
            </div>
          )}
        </dl>

        <div className="mt-5 flex gap-2 text-sm">
          <span
            className={`rounded-full px-3 py-1 ${
              user.instagram_connected
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            Instagram {user.instagram_connected ? 'connected' : 'not connected'}
          </span>
          <span
            className={`rounded-full px-3 py-1 ${
              user.youtube_connected
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            YouTube {user.youtube_connected ? 'connected' : 'not connected'}
          </span>
        </div>
      </div>
    </div>
  );
}