import { lazy } from "react";

const TimeFlowMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.TimeFlowMainPage,
  }))
);

const VerifyTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.VerifyTablePage,
  }))
);

const UsersTimeflowsPage = lazy(() =>
  import("..").then((module) => ({
    default: module.UsersTimeflowsPage,
  }))
);

const DetailsTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.DetailsTablePage,
  }))
);

const TimeflowReportPage = lazy(() =>
  import("..").then((module) => ({
    default: module.TimeflowReportPage,
  }))
);

const TimeflowRoutes = [
  {
    path: "/timeflow",
    element: <TimeFlowMainPage />,
    children: [
      {
        path: "users-timeflows",
        element: <UsersTimeflowsPage />,
      },

      {
        path: "verify-table",
        element: <VerifyTablePage />,
      },

      {
        path: "details-table",
        element: <DetailsTablePage />,
      },
    ],
  },
  {
    path: "/timeflow-report/:id",
    element: <TimeflowReportPage />,
  },
];

export default TimeflowRoutes;
