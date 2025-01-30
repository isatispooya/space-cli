import { lazy } from "react";

const EmploymentsMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.EmploymentsMainPage,
  }))
);
const EmploymentsTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.EmploymentsTablePage,
  }))
);

const EmploymentsCreatePage = lazy(() =>
  import("..").then((module) => ({
    default: module.EmploymentsCreatePage,
  }))
);

const EmploymentsRoutes = [
  {
    path: "/employments",
    element: <EmploymentsMainPage />,
    children: [
      {
        path: "table",
        element: <EmploymentsTablePage />,
      },
      {
        path: "create",
        element: <EmploymentsCreatePage />,
      },
    ],
  },
];

export default EmploymentsRoutes;
