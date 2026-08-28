import { useAppSelector } from '@/app/hooks';
import NavBar from '@/components/NavBar';
import { useEffect } from 'react';
import FeedLeft from './FeedLeft';
import FeedMiddle from './FeedMiddle';
import FeedRight from './FeedRight';

export default function FeedPage() {
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {}, []);

  if (!user) {
    return <p className="p-4 text-sm text-gray-500">No user data available.</p>;
  }

  return (
    <div className="container mx-auto flex items-start mt-18 lg:mt-22 gap-3">
      <NavBar />
      <div className="hidden lg:flex basis-1/4 w-full noselect">
        <FeedLeft />
      </div>
      <div className="flex lg:basis-2/4">
        <FeedMiddle />
      </div>
      <div className="hidden lg:flex basis-1/4 w-full noselect">
        <FeedRight />
      </div>
    </div>
  );
}
