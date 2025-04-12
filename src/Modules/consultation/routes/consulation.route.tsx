import { lazy } from "react";

const ConsultationMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.ConsultationMainPage,
  }))
);

const ConsultationRequestPage = lazy(() =>
  import("../pages").then((module) => ({
    default: module.ConsultationRequestPage,
  }))
);

const ConsultationRoutes = [
  {
    path: "/consultation",
    element: <ConsultationMainPage />,
    children: [
      {
        path: "request",
        element: <ConsultationRequestPage />,
      },
    ],
  },
];

export default ConsultationRoutes;
