import { lazy } from "react";

const PrecendencePrintPage = lazy(() =>
  import("..").then((module) => ({
    default: module.PrecendencePrintPage,
  }))
);

const PrecendencePrintRoutes = [
  {
    path: "precendence/print/:id",
    element: <PrecendencePrintPage />,
  },
];

export default PrecendencePrintRoutes;
