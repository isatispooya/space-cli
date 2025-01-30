import { lazy } from "react";

const InsuranceapplicationMain = lazy(() =>
  import("../page/Insuranceapplication").then((module) => ({
    default: module.InsuranceapplicationMain,
  }))
);

const InsuranceapplicationTable = lazy(() =>
  import("../page/Insuranceapplication").then((module) => ({
    default: module.InsuranceapplicationTable,
  }))
);

const InsuranceapplicationCreate = lazy(() =>
  import("../page/Insuranceapplication").then((module) => ({
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
