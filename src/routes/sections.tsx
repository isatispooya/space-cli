import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import LoaderLg from "../components/loader-lg";
import NotFoundPage from "../pages/not_found.page";
import NewPass from "../Modules/newPassword/pages/newPass.page";

const LoginPage = lazy(() => import("../pages/login.page"));
const ProfilePage = lazy(() => import("../Modules/profile").then(module => ({ default: module.ProfilePage })));

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
      path: "/reset-password",
      element: (  
        <Suspense fallback={<Loader />}>
          <NewPass />
        </Suspense>
      ),
    },
  ]);

  return routes;
}
