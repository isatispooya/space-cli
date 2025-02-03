import { lazy } from "react";

const InsuranceRequestMain = lazy(() =>
  import("..").then((module) => ({
    default: module.InsuranceRequestMain,
  }))
);

const InsuranceRequestTable = lazy(() =>
  import("../features/InsuranceRequest").then((module) => ({
    default: module.InsuranceRequestTable,
  }))
);

const InsuranceRequestCreate = lazy(() =>
  import("..").then((module) => ({
    default: module.InsuranceRequestCreate,
  }))
);

const InsuranceAppRoutes = [
  {
    path: "/requestinsurance",
    element: <InsuranceRequestMain />,
    children: [
      {
        path: "table",
        element: <InsuranceRequestTable />,
      },
      {
        path: "create",
        element: <InsuranceRequestCreate />,
      },
    ],
  },
];

export default InsuranceAppRoutes;
