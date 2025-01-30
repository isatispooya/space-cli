import { lazy } from "react";

const LoginPage = lazy(() =>
  import("../pages").then((module) => ({
    default: module.LoginPage,
  }))
);

const LoginRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
];

export default LoginRoutes;
