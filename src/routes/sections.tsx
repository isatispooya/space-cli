import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import LoaderLg from "../components/loader-lg";
import ResetPasswordPage from "../pages/resetPasswordPage";

const LoginPage = lazy(() => import("../pages/loginPage"));
const DashboardPage = lazy(() => import("../pages/dashboardPage"));
const ProfilePage = lazy(() => import("../Modules/profile/profile"));

const Loader = () => <LoaderLg />;

export default function Router() {
  const routes = useRoutes([
    {
      path: "/login",
      element: (
        <Suspense fallback={<Loader />}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <Suspense fallback={<Loader />}>
          <DashboardPage />
        </Suspense>
      ),
    },
    {
      path: "/profile",
      element: (
        <Suspense fallback={<Loader />}>
          <ProfilePage />
        </Suspense>
      ),
    },
    {
      path: "/reset-password/:uuid",
      element: (
        <Suspense fallback={<Loader />}>
          <ResetPasswordPage />
        </Suspense>
      ),
    },
  ]);

  return routes;
}
