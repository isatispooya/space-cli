import { lazy } from "react";

const ConsultationMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.ConsultationMainPage,
  }))
);

const ConsultationFlowPage = lazy(() =>
  import("..").then((module) => ({
    default: module.ConsultationFlowPage,
  }))
);

const ConsultationRequestsPage = lazy(() =>
  import("..").then((module) => ({
    default: module.ConsultationRequestsPage,
  }))
);

const ConsultationRoutes = [
  {
    path: "/consultation",
    element: <ConsultationMainPage />,
    children: [
      {
        path: "request",
        element: <ConsultationFlowPage />,
      },
      {
        path: "requests",
        element: <ConsultationRequestsPage />,
      },
    ],
  },
];

export default ConsultationRoutes;
