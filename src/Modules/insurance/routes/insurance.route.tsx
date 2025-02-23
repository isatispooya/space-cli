import { lazy } from "react";

const InsuranceMain = lazy(() =>
  import("..").then((module) => ({
    default: module.InsuranceRequestMain,
  }))
);

const InsuranceTable = lazy(() =>
  import("..").then((module) => ({
    default: module.InsuranceRequestTable,
  }))
);

const InsuranceCreate = lazy(() =>
  import("..").then((module) => ({
    default: module.InsuranceRequestCreate,
  }))
);

const InsuranceRoutes = [
  {
    path: "/insurance",
    element: <InsuranceMain />,
    children: [
      {
        path: "table",
        element: <InsuranceTable />,
      },
      {
        path: "create",
        element: <InsuranceCreate />,
      },
    ],
  },
];

export default InsuranceRoutes;
