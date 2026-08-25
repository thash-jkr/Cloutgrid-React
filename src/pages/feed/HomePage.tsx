import { useAppSelector } from '@/app/hooks';
import LandingPage from '@/pages/auth/LandingPage';
import FeedPage from '@/pages/feed/FeedPage';

export default function HomePage() {
  const { isAuth, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <p className="p-4 text-sm text-gray-500">Loading…</p>;
  }

  return isAuth ? <FeedPage /> : <LandingPage />;
}