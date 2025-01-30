import { lazy } from "react";

const CapitalMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.CapitalMainPage,
  }))
);
const CapitalTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.CapitalTablePage,
  }))
);
const CapitalIncreaseFormPage = lazy(() =>
  import("..").then((module) => ({
    default: module.CapitalIncreaseFormPage,
  }))
);

const CapitalRoutes = [
  {
    path: "/capital",
    element: <CapitalMainPage />,
    children: [
      {
        path: "table",
        element: <CapitalTablePage />,
      },
      {
        path: "create",
        element: <CapitalIncreaseFormPage />,
      },
    ],
  },
];

export default CapitalRoutes;
