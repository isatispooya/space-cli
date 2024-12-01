import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import LoaderLg from "../components/loader-lg";
import NotFoundPage from "../pages/not_found.page";

const LoginPage = lazy(() => import("../pages/login.page"));
const ProfilePage = lazy(() =>
  import("../Modules/profile").then((module) => ({
    default: module.ProfilePage,
  }))
);
const Settings = lazy(() => import("../Modules/settings/components/settings"));
const DashboardPage = lazy(() =>
  import("../Modules/dasboard").then((module) => ({
    default: module.DashboardPage,
  }))
);

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
      path: "/",
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
      path: "*",
      element: (
        <Suspense fallback={<Loader />}>
          <NotFoundPage />
        </Suspense>
      ),
    },
    {
      path: "/settings",
      element: (
        <Suspense fallback={<Loader />}>
          <Settings />
        </Suspense>
      ),
    },
  ]);

  return routes;
}
