import { lazy } from "react";

const DisplacementMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.DisplacementMainPage,
  }))
);
const DisplacementTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.DisplacementTablePage,
  }))
);
const DisplacementFormPage = lazy(() =>
  import("..").then((module) => ({
    default: module.DisplacementFormPage,
  }))
);
const DisplacementUpdatePage = lazy(() =>
  import("..").then((module) => ({
    default: module.DisplacementUpdatePage,
  }))
);

const DisplacementRoutes = [
  {
    path: "/displacement",
    element: <DisplacementMainPage />,
    children: [
      {
        path: "table",
        element: <DisplacementTablePage />,
      },
      {
        path: "create",
        element: <DisplacementFormPage />,
      },
      {
        path: "update/:id",
        element: <DisplacementUpdatePage />,
      },
    ],
  },
];

export default DisplacementRoutes;
