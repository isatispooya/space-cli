import { lazy } from "react";

const InsuranceapplicationMain = lazy(() =>
  import("..").then((module) => ({
    default: module.InsuranceapplicationMain,
  }))
);

const InsuranceapplicationTable = lazy(() =>
  import("../features/Insuranceapplication").then((module) => ({
    default: module.InsuranceappTable,
  }))
);

const InsuranceapplicationCreate = lazy(() =>
  import("..").then((module) => ({
    default: module.InsuranceapplicationCreate,
  }))
);

const InsuranceAppRoutes = [
  {
    path: "/requestinsurance",
    element: <InsuranceapplicationMain />,
    children: [
      {
        path: "table",
        element: <InsuranceapplicationTable />,
      },
      {
        path: "create",
        element: <InsuranceapplicationCreate />,
      },
    ],
  },
];

export default InsuranceAppRoutes;
