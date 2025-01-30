import { lazy } from "react";

const StockTransferPage = lazy(() =>
  import("..").then((module) => ({
    default: module.StockTransferPage,
  }))
);
const StockTransferTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.StockTransferTablePage,
  }))
);
const StockTransferFormPage = lazy(() =>
  import("..").then((module) => ({
    default: module.StockTransferFormPage,
  }))
);
const StockTransferUpdatePage = lazy(() =>
  import("..").then((module) => ({
    default: module.StockTransferUpdatePage,
  }))
);

const StockTransferRoutes = [
  {
    path: "/transferstock",
    element: <StockTransferPage />,
    children: [
      {
        path: "table",
        element: <StockTransferTablePage />,
      },
      {
        path: "create",
        element: <StockTransferFormPage />,
      },
      {
        path: "update",
        element: <StockTransferUpdatePage />,
      },
    ],
  },
];

export default StockTransferRoutes;
