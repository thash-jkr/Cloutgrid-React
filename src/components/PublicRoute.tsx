import { useAppSelector } from '@/app/hooks';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const { isAuth, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <p className="p-4 text-sm text-gray-500">Loading…</p>;
  }

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PublicRoute