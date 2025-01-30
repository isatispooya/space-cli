import { lazy } from "react";

const GroupsMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.GroupsMainPage,
  }))
);
const GroupsTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.GroupsTablePage,
  }))
);

const GroupsRoutes = [
  {
    path: "/groups",
    element: <GroupsMainPage />,
    children: [
      {
        path: "table",
        element: <GroupsTablePage />,
      },
    ],
  },
];

export default GroupsRoutes;
