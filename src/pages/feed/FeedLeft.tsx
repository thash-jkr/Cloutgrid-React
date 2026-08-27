import defaultProfilePhoto from "@/assets/default_profile.png";
import { useAppSelector } from "@/app/hooks";
import { getCategoryLabel } from "@/utils/categories";

export default function FeedLeft() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="flex flex-col justify-center items-center w-full gap-3">
      <div className="flex flex-col justify-center items-center w-full rounded-xl bg-white shadow gap-3 py-3">
        <h3 className="text-xl font-semibold">{user?.name}</h3>
        <img
          className="h-32 w-32 rounded-full object-cover"
          src={user ? `${user.profile_photo}` : defaultProfilePhoto}
          alt="Profile"
        />
        <div className="flex justify-center items-center w-full text-xl font-bold">
          <p
            className="my-2 mt-1 rounded-full bg-secondary px-3 py-2 text-sm
               font-semibold text-white transition-transform duration-300
               ease-in-out hover:scale-105 hover:shadow"
          >
            {getCategoryLabel(user?.category)}
          </p>
        </div>
      </div>
    </div>
  );
}
