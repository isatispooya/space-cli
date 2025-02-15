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

const UserViewPage = lazy(() =>
  import("..").then((module) => ({
    default: module.UserViewPage,
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
      {
        path: "view/:id",
        element: <UserViewPage />,
      },
    ],
  },
];

export default UsersRoutes;
