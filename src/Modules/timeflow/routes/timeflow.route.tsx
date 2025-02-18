import { lazy } from "react";

const TimeFlowMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.TimeFlowMainPage,
  }))
);

const VerifyTimeFlowPage = lazy(() =>
  import("..").then((module) => ({
    default: module.VerifyTimeFlowPage,
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
        element: <VerifyTimeFlowPage />,
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
