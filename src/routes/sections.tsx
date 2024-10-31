import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

// Lazy load pages
const LoginPage = lazy(() => import("../pages/loginPage"));
const DashboardPage = lazy(() => import("../pages/dashboardPage"));

// Fallback component
const Loader = () => <div>Loading...</div>;

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
  ]);

  return routes;
}
