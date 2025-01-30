import { lazy } from "react";

const PrecendenceTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.PrecendenceTablePage,
  }))
);
const PrecendenceMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.PrecendenceMainPage,
  }))
);
const PrecendenceFormPage = lazy(() =>
  import("..").then((module) => ({
    default: module.PrecendenceFormPage,
  }))
);
const PercendenceUpdatePage = lazy(() =>
  import("..").then((module) => ({
    default: module.PercendenceUpdatePage,
  }))
);


const PrecendenceRoutes = [
  {
    path: "/precendence",
    element: <PrecendenceMainPage />,
    children: [
      {
        path: "table",
        element: <PrecendenceTablePage />,
      },
      {
        path: "create",
        element: <PrecendenceFormPage />,
      },
      {
        path: "update/:id",
        element: <PercendenceUpdatePage />,
      },
    ],
  },
];



export default PrecendenceRoutes;
