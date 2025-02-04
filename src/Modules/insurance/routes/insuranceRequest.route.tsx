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

const InsurancePayment = lazy(() =>
  import("../features/InsuranceRequest").then((module) => ({
    default: module.InsurancePayment,
  }))
);

const MyRequestsTable = lazy(() =>
  import("../features/InsuranceRequest").then((module) => ({
    default: module.MyRequestsTable,
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

const InsurenceRequestProssesPage = lazy(() =>
  import("../page/Insuranceapplication").then((module) => ({
    default: module.InsurenceRequestProssesPage,
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
        path: "table-requests",
        element: <MyRequestsTable />,
      },
      {
        path: "create",
        element: <InsuranceRequestCreate />,
      },

      {
        path: "update/:id",
        element: <InsuranceRequestUpdate />,
      },
      {
        path: "payment/:id",
        element: <InsurancePayment />,
      },
      {
        path: "prosses/:id",
        element: <InsurenceRequestProssesPage />,
      },
    ],
  },
];

export default InsuranceAppRoutes;
