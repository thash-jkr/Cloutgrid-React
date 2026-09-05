import { Route, Routes } from 'react-router-dom';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import RegisterCreator from '@/pages/auth/RegisterCreator';
import RegisterBrand from '@/pages/auth/RegisterBrand';
import ResetPassword from '@/pages/auth/ResetPassword';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import PublicRoute from '@/navigation/PublicRoute';
import PrivateRoute from '@/navigation/PrivateRoute';
import HomePage from '@/pages/feed/HomePage';
import ProfilePage from '@/pages/profile/ProfilePage';
import JobPage from '@/pages/job/JobPage';
import EULA from '@/legal/EULA';
import PrivacyPolicy from '@/legal/PrivacyPolicy';
import DataDeletion from '@/legal/DataDeletion';
import OtherProfile from '@/pages/profile/OtherProfile';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/eula" element={<EULA />} />
      <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      <Route path="/deletionpolicy" element={<DataDeletion />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/creator" element={<RegisterCreator />} />
        <Route path="/register/brand" element={<RegisterBrand />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:uid/:token" element={<ResetPassword />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:username" element={<OtherProfile />} />
        <Route path="/campaigns" element={<JobPage />} />
      </Route>
    </Routes>
  );
}
