import { lazy } from "react";

const PositionCreatePage = lazy(() =>
  import("..").then((module) => ({
    default: module.PositionCreatePage,
  }))
);
const PositionMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.PositionMainPage,
  }))
);
const PositionsTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.PositionsTablePage,
  }))
);

const PositionRoutes = [
  {
    path: "/positions",
    element: <PositionMainPage />,
    children: [
      {
        path: "create",
        element: <PositionCreatePage />,
      },
      {
        path: "table",
        element: <PositionsTablePage />,
      },

    ],
  },
];

export default PositionRoutes;
