import { useAppSelector } from '@/app/hooks';
import CloutLoading from '@/components/CloutLoading';
import LandingPage from '@/pages/auth/LandingPage';
import FeedPage from '@/pages/feed/FeedPage';
import JobPage from '../job/JobPage';

export default function HomePage() {
  const { isAuth, isInitializing, type } = useAppSelector((state) => state.auth);

  if (isInitializing) {
    return (
      <div className="w-full flex justify-center items-center min-h-lvh">
        <CloutLoading />
      </div>
    );
  }

  return isAuth ? type == "creator" ? <FeedPage /> : <JobPage /> : <LandingPage />;
}
