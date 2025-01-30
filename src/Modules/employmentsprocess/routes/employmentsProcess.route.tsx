import { lazy } from "react";

const EmploymentsProcessMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.EmploymentsProcessMainPage,
  }))
);

const EmploymentsProcessTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.EmploymentsProcessTablePage,
  }))
);

const EmploymentsProcessCreatePage = lazy(() =>
  import("..").then((module) => ({
    default: module.EmploymentsProcessCreatePage,
  }))
);

const EmploymentsProcessRoutes = [
  {
    path: "/employmentsprocess",
    element: <EmploymentsProcessMainPage />,
    children: [
      {
        path: "table",
        element: <EmploymentsProcessTablePage />,
      },
      {
        path: "create",
        element: <EmploymentsProcessCreatePage />,
      },
    ],
  },
];

export default EmploymentsProcessRoutes;
