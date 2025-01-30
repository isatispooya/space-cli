import { lazy } from "react";

const UsersMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.UsersMainPage,
  }))
);

const UserProTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.UserProTablePage,
  }))
);

const UsersRoutes = [
  {
    path: "/users",
    element: <UsersMainPage />,
    children: [
      {
        path: "table",
        element: <UserProTablePage />,
      },
    ],
  },
];

export default UsersRoutes;
