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

const ShiftsCreatePage = lazy(() =>
  import("..").then((module) => ({
    default: module.ShiftsCreatePage,
  }))
);

const ShiftsEditPage = lazy(() =>
  import("..").then((module) => ({
    default: module.ShiftsEditPage,
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
        path: "create",
        element: <ShiftsCreatePage />,
      },
      {
        path: "edit",
        element: <ShiftsEditPage />,
      },
      {
        path: "assign",
        element: <ShiftsAssignPage />,
      },
    ],
  },
];

export default ShiftsRoutes;
