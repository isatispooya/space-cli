import { lazy } from "react";

const TimeFlowMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.TimeFlowMainPage,
  }))
);

const UserTimeflowVerifyPage = lazy(() =>
  import("..").then((module) => ({
    default: module.UserTimeflowVerifyPage,
  }))
);

const UsersTimeFlowPage = lazy(() =>
  import("..").then((module) => ({
    default: module.UsersTimeFlowPage,
  }))
);

const LeaveTimeFlowPage = lazy(() =>
  import("..").then((module) => ({
    default: module.LeaveTimeFlowPage,
  }))
);

const TimeflowRoutes = [
  {
    path: "/timeflow",
    element: <TimeFlowMainPage />,
    children: [
      {
        path: "verify",
        element: <UserTimeflowVerifyPage />,
      },
      {
        path: "users",
        element: <UsersTimeFlowPage />,
      },
      {
        path: "leave",
        element: <LeaveTimeFlowPage />,
      },
    ],
  },
];

export default TimeflowRoutes;
