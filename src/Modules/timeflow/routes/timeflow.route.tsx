import { lazy } from "react";

const TimeFlowMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.TimeFlowMainPage,
  }))
);
const TimeFlowTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.TimeFlowTablePage,
  }))
);
const TimeFlowApproachPage = lazy(() =>
  import("..").then((module) => ({
    default: module.TimeFlowApproachPage,
  }))
);
const TimeFlowLeaveTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.TimeFlowLeaveTablePage,
  }))
);
const TimeFlowCreatePage = lazy(() =>
  import("..").then((module) => ({
    default: module.LeaveCreatePage,
  }))
);

const TimeflowRoutes = [
  {
    path: "/timeflow",
    element: <TimeFlowMainPage />,
    children: [
      {
        path: "approach",
        element: <TimeFlowApproachPage />,
      },
      {
        path: "table",
        element: <TimeFlowTablePage />,
      },
      {
        path: "leave",
        element: <TimeFlowLeaveTablePage />,
      },
      {
        path: "addleave",
        element: <TimeFlowCreatePage />,
      },
    ],
  },
];

export default TimeflowRoutes;
