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
const TimeFlowShiftPage = lazy(() =>
  import("..").then((module) => ({
    default: module.TimeFlowShiftPage,
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
        path: "users",
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
      {
        path: "shift",
        element: <TimeFlowShiftPage />,
      },
    ],
  },
];

export default TimeflowRoutes;
