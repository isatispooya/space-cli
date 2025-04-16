import { lazy } from "react";

const FinToolsMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.FinToolsMainPage,
  }))
);

const KhatamMainPage = lazy(() =>
  import("../modules").then((module) => ({
    default: module.KhatamMainPage,
  }))
);

const FinToolsRoutes = [
  {
    path: "/finTools",
    element: <FinToolsMainPage />,
  },
  {
    path: "/khatam",
    element: <KhatamMainPage />,
  },
];

export default FinToolsRoutes;
