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

const InsuranceRequestUpdate = lazy(() =>
  import("../page/Insuranceapplication").then((module) => ({
    default: module.InsuranceRequestUpdate,
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
      {
        path: "update/:id",
        element: <InsuranceRequestUpdate />,
      },
    ],
  },
];

export default InsuranceAppRoutes;
