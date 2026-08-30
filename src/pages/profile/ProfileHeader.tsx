import { useAppSelector } from '@/app/hooks';
import { getCategoryLabel } from '@/utils/categories';
import Settings from './Settings';

const ProfileHeader = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { posts, collabs } = useAppSelector((state) => state.profile);

  return (
    <div className="flex flex-col justify-center items-center w-full gap-3">
      <div
        className="flex flex-col justify-center items-center shadow w-full rounded-xl bg-white font-semibold text-xl 
          xl:text-lg md:text-base"
      >
        <div className="flex flex-col justify-center items-center w-full border-b gap-3 py-3">
          <h1 className="text-center">
            {user?.name} • <span className="text-gray-600">@{user?.username}</span>
          </h1>

          <p
            className="px-5 py-2 bg-secondary text-white rounded-full font-extrabold text-sm 
               transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow"
          >
            {getCategoryLabel(user?.category)}
          </p>
        </div>

        <div className="flex flex-col justify-center items-center w-full p-5 border-b">
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
                <h1 className="mr-2">{posts.length}</h1>
                <h1>Posts</h1>
              </div>
              {user?.type === 'business' && (
                <div className="flex justify-center items-center">
                  <h1 className="mr-2">{collabs.length}</h1>
                  <h1>Collabs</h1>
                </div>
              )}
            </div>
          </div>

          {user?.type === 'business' && user?.website && (
            <p
              className="px-3 py-2 bg-orange-500 text-white my-2 mt-5 rounded-full font-extrabold text-sm 
               transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow"
            >
              {user?.website}
            </p>
          )}
        </div>

        <div className="p-3 w-full flex flex-col justify-start items-start font-normal text-base">
          <span>{user?.bio}</span>
        </div>
      </div>

      <div className="w-full lg:hidden">
        <Settings />
      </div>
    </div>
  );
};

export default ProfileHeader;
