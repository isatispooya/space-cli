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
    ],
  },
];

export default ShiftsRoutes;
