import { lazy } from "react";

const UserManagementMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.UserManagementMainPage,
  }))
);
const ProfilePage = lazy(() =>
  import("..").then((module) => ({
    default: module.ProfilePage,
  }))
);
const ChangePassPage = lazy(() =>
  import("..").then((module) => ({
    default: module.ChangePassPage,
  }))
);
  const UserManagementRoutes = [
  {
    path: "/userManagement",
    element: <UserManagementMainPage />,
    children: [
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "changePassword",
        element: <ChangePassPage />,
      },
    ],
  },
];

export default UserManagementRoutes;
