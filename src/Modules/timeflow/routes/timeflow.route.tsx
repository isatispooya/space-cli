import { lazy } from "react";
import UserVerifyPage from "../page/userVerify.page";
import { ListPage } from "../page";

const TimeFlowMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.TimeFlowMainPage,
  }))
);

const UsersTimeflowsPage = lazy(() =>
  import("..").then((module) => ({
    default: module.UsersTimeflowsPage,
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

const ParentVerifyPage = lazy(() =>
  import("..").then((module) => ({
    default: module.ListPage,
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
        element: <UserVerifyPage />,
      },
      {
        path: "parent-verify",
        element: <ParentVerifyPage />,
      },
      {
        path: "verify",
        element: <VerifyTimeflowPage />,
      },

      {
        path: "list",
        element: <ListPage />,
      },
    ],
  },
  {
    path: "/timeflow-report/:id",
    element: <TimeflowReportPage />,
  },
];

export default TimeflowRoutes;
