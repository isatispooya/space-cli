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

const VerifyTimeflowPage = lazy(() =>
  import("..").then((module) => ({
    default: module.VerifyTimeflowPage,
  }))
);

const UpdateTimeFlowPage = lazy(() =>
  import("..").then((module) => ({
    default: module.UpdateTimeFlowPage,
  }))
);

const TimeflowEditPage = lazy(() =>
  import("..").then((module) => ({
    default: module.TimeflowEditPage,
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
      {
        path: "verify",
        element: <VerifyTimeflowPage />,
      },
      {
        path: "update-timeflow/:id",
        element: <UpdateTimeFlowPage />,
      },
      {
        path: "edit/:id",
        element: <TimeflowEditPage />,
      },
    ],
  },
  {
    path: "/timeflow-report/:id",
    element: <TimeflowReportPage />,
  },
];

export default TimeflowRoutes;
