import { lazy } from "react";

const ShiftsMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.ShiftsMainPage,
  }))
);

const ShiftsTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.ShiftsTablePage,
  }))
);

const ShiftsFormPage = lazy(() =>
  import("..").then((module) => ({
    default: module.ShiftsFormPage,
  }))
);

const ShiftsAssignPage = lazy(() =>
  import("..").then((module) => ({
    default: module.ShiftsAssignPage,
  }))
);

const ShiftsRoutes = [
  {
    path: "/shifts",
    element: <ShiftsMainPage />,
    children: [
      {
        path: "table",
        element: <ShiftsTablePage />,
      },
      {
        path: "form",
        element: <ShiftsFormPage />,
      },
      {
        path: "assign",
        element: <ShiftsAssignPage />,
      },
    ],
  },
];

export default ShiftsRoutes;
