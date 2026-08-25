import { Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import RegisterCreator from "@/pages/auth/RegisterCreator";
import RegisterBrand from "@/pages/auth/RegisterBrand";
import ResetPassword from "@/pages/auth/ResetPassword";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import PublicRoute from "@/components/PublicRoute";
import PrivateRoute from "@/components/PrivateRoute";
import HomePage from "@/pages/feed/HomePage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/creator" element={<RegisterCreator />} />
        <Route path="/register/brand" element={<RegisterBrand />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:uid/:token" element={<ResetPassword />} />
      </Route>

      <Route element={<PrivateRoute />}></Route>
    </Routes>
  );
}
