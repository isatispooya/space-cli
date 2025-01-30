import { lazy } from "react";

const CompanyMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.CompanyMainPage,
  }))
);

const CompanyTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.CompanyTablePage,
  }))
);

const CompanyCreatePage = lazy(() =>
  import("..").then((module) => ({
    default: module.CompanyCreatePage,
  }))
);

const CompanyEditPage = lazy(() =>
  import("..").then((module) => ({
    default: module.CompanyEditPage,
  }))
);

export const CompanyRoutes = [
  {
    path: "/companies",
    element: <CompanyMainPage />,
    children: [
      {
        path: "table",
        element: <CompanyTablePage />,
      },
      {
        path: "create",
        element: <CompanyCreatePage />,
      },
      {
        path: "edit/:id",
        element: <CompanyEditPage />,
      },
    ],
  },
];
