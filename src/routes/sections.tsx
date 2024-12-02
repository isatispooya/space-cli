import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import LoaderLg from "../components/loader-lg";
import NotFoundPage from "../pages/not_found.page";
import Dashboard from "../components/dashboard";


const LoginPage = lazy(() => import("../pages/login.page"));
const ProfilePage = lazy(() =>
  import("../Modules/profile").then((module) => ({
    default: module.ProfilePage,
  }))
);
const SettingsPage = lazy(() =>
  import("../Modules/settings").then((module) => ({
    default: module.SettingsPage,
  }))
);

const CompanyPage = lazy(() =>
  import("../Modules/companies").then((module) => ({
    default: module.CompanyPage,
  }))
);
const PositionsPage = lazy(() =>
  import("../Modules/positions").then((module) => ({
    default: module.PositionsPage,
  }))
);

const CorrespondencePage = lazy(() =>
  import("../Modules/correspondence").then((module) => ({
    default: module.CorrespondencePage,
  }))
);

const CorrespondenceCreatePage = lazy(() =>
  import("../Modules/correspondence").then((module) => ({
    default: module.CorrespondenceCreatePage,
  }))
);
const CorrespondenceTablePage = lazy(() =>
  import("../Modules/correspondence").then((module) => ({
    default: module.CorrespondenceTablePage,
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
      path: "/profile",
      element: (
        <Suspense fallback={<Loader />}>
          <ProfilePage />
        </Suspense>
      ),
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<Loader />}>
          <Dashboard />
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
          <SettingsPage />
        </Suspense>
      ),
    },
    {
      path: "/companies",
      element: (
        <Suspense fallback={<Loader />}>
          <CompanyPage />
        </Suspense>
      ),
    },
    {
      path: "/positions",
      element: (
        <Suspense fallback={<Loader />}>
          <PositionsPage />
        </Suspense>
      ),
      path: "/correspondence",
      element: (
        <Suspense fallback={<Loader />}>
          <CorrespondencePage />
        </Suspense>
      ),
      children: [
        {
          path: "table",
          element: (
            <Suspense fallback={<Loader />}>
              <CorrespondenceTablePage />
            </Suspense>
          ),
        },
        {
          path: "create",
          element: (
            <Suspense fallback={<Loader />}>
              <CorrespondenceCreatePage />
            </Suspense>
          ),
        },
      ],
    },
  ]);
  return routes;
}
