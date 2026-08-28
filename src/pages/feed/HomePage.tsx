import { useAppSelector } from '@/app/hooks';
import LandingPage from '@/pages/auth/LandingPage';
import FeedPage from '@/pages/feed/FeedPage';

export default function HomePage() {
  const { isAuth, isInitializing } = useAppSelector((state) => state.auth);

  if (isInitializing) {
    return <p className="p-4 text-sm text-gray-500">Loading…</p>;
  }

  return isAuth ? <FeedPage /> : <LandingPage />;
}
