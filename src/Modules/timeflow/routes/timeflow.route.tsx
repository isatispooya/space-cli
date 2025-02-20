import { lazy } from "react";

const TimeFlowMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.TimeFlowMainPage,
  }))
);

const VerifyPage = lazy(() =>
  import("..").then((module) => ({
    default: module.VerifyPage,
  }))
);

const VerifyTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.VerifyTablePage,
  }))
);

const LeavePage = lazy(() =>
  import("..").then((module) => ({
    default: module.LeavePage,
  }))
);

const MissionPage = lazy(() =>
  import("..").then((module) => ({
    default: module.MissionPage,
  }))
);

const TimeflowRoutes = [
  {
    path: "/timeflow",
    element: <TimeFlowMainPage />,
    children: [
      {
        path: "verify",
        element: <VerifyPage />,
      },
      {
        path: "verify-table",
        element: <VerifyTablePage />,
      },
      {
        path: "leave",
        element: <LeavePage />,
      },
      {
        path: "mission",
        element: <MissionPage />,
      },
    ],
  },
];

export default TimeflowRoutes;
