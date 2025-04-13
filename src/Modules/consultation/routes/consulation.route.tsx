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
const AdminConsultationPage = lazy(() =>
  import("../pages").then((module) => ({
    default: module.AdminConsultationPage,
  }))
);
const AdminConsultationTablePage = lazy(() =>
  import("../pages").then((module) => ({
    default: module.AdminConsultationTablePage,
  }))
);
const AdminConsultationFormPage = lazy(() =>
  import("../pages").then((module) => ({
    default: module.AdminConsultationFormPage,
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

  {
    path: "/admin",
    element: <AdminConsultationPage />,
    children: [
      { path: "table", element: <AdminConsultationTablePage /> },
      { path: "form/:id", element: <AdminConsultationFormPage /> },
    ],
  },
];

export default ConsultationRoutes;
