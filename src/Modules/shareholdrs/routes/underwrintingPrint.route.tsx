import { lazy } from "react";

const UnderwritingPrintPage = lazy(() =>
  import("..").then((module) => ({
    default: module.PrintUnderwritingPage,
  }))
);

const UnderwritingPrintRoute = [
  {
    path: "underwriting/print/:id",
    element: <UnderwritingPrintPage />,
  },
];

export default UnderwritingPrintRoute;
