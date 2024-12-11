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

const CompanyMainPage = lazy(() =>
  import("../Modules/companies").then((module) => ({
    default: module.CompanyMainPage,
  }))
);
const CompanyTablePage = lazy(() =>
  import("../Modules/companies").then((module) => ({
    default: module.CompanyTablePage,
  }))
);
const CompanyCreatePage = lazy(() =>
  import("../Modules/companies").then((module) => ({
    default: module.CompanyCreatePage,
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
const PositionCreatePage = lazy(() =>
  import("../Modules/positions").then((module) => ({
    default: module.PositionCreatePage,
  }))
);
const PositionMainPage = lazy(() =>
  import("../Modules/positions").then((module) => ({
    default: module.PositionMainPage,
  }))
);
const PositionsTablePage = lazy(() =>
  import("../Modules/positions").then((module) => ({
    default: module.PositionsTablePage,
  }))
);

const ShareholdersPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.ShareholdersPage,
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
          <CompanyMainPage />
        </Suspense>
      ),
      children: [
        {
          path: "table",
          element: (
            <Suspense fallback={<Loader />}>
              <CompanyTablePage />
            </Suspense>
          ),
        },
        {
          path: "create",
          element: (
            <Suspense fallback={<Loader />}>
              <CompanyCreatePage />
            </Suspense>
          ),
        },
      ],
    },

    {
      path: "/positions",
      element: (
        <Suspense fallback={<Loader />}>
          <PositionMainPage />
        </Suspense>
      ),
      children: [
        {
          path: "create",
          element: (
            <Suspense fallback={<Loader />}>
              <PositionCreatePage />
            </Suspense>
          ),
        },
        {
          path: "table",
          element: (
            <Suspense fallback={<Loader />}>
              <PositionsTablePage />
            </Suspense>
          ),
        },
      ],
    },
    {
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
    {
      path: "/shareholders",
      element: (
        <Suspense fallback={<Loader />}>
          <ShareholdersPage />
        </Suspense>
      ),
    },
  ]);
  return routes;
}
