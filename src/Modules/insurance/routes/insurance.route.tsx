import { lazy } from "react";

const InsuranceMain = lazy(() =>
  import("../page/Insurance").then((module) => ({
    default: module.InsuranceMain,
  }))
);

const InsuranceTable = lazy(() =>
  import("../page/Insurance").then((module) => ({
    default: module.InsuranceTable,
  }))
);

const InsuranceCreate = lazy(() =>
  import("../page/Insurance").then((module) => ({
    default: module.InsurancePage,
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
