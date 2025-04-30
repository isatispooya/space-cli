import { lazy } from "react";

const FinToolsMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.FinToolsMainPage,
  }))
);

const SymbolsMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.SymbolsMainPage,
  }))
);

const FinToolsRoutes = [
  {
    path: "/finTools",
    element: <FinToolsMainPage />,
  },
  {
    path: "/symbols/:id",
    element: <SymbolsMainPage />,
  },
];

export default FinToolsRoutes;
