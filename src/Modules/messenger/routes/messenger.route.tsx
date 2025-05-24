import { lazy } from "react";

const SentPage = lazy(() =>
  import("..").then((module) => ({
    default: module.SentPage,
  }))
);
const TablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.TablePage,
  }))
);
const ReceiveMessagePage = lazy(() =>
  import("..").then((module) => ({
    default: module.ReceiveMessagePage,
  }))
);

const SentMessagePage = lazy(() =>
  import("..").then((module) => ({
    default: module.SentMessagePage,
  }))
);
const MakeFormPage = lazy(() =>
  import("..").then((module) => ({
    default: module.MakeFormPage,
  }))
);

const MessengerPage = lazy(() => import("../pages/messenger_main.page"));
const ReceiveRefferalPage = lazy(() =>
  import("..").then((module) => ({
    default: module.ReceiveRefferalPage,
  }))
);

const MessengerRoutes = [
  {
    path: "/messenger",
    element: <MessengerPage />,
  },
  {
    path: "/letter",
    element: <SentPage />,
    children: [
      {
        path: "table",
        element: <TablePage />,
      },
      {
        path: "Outtable",
        element: <TablePage />,
      },
      {
        path: "message/:id",
        element: <SentMessagePage />,
      },
      {
        path: "form",
        element: <MakeFormPage />,
      },
      {
        path: "Outform",
        element: <MakeFormPage />,
      },
      {
        path: "draft",
        element: <TablePage />,
      },
      {
        path: "OutformMake",
        element: <MakeFormPage />,
      },
      {
        path: "update-form/:id",
        element: <MakeFormPage />,
      },
    
      {
        path: "receive-table",
        element: <TablePage />,
      },
      {
        path: "Outreceive-table",
        element: <TablePage />,
      },
      {
        path: "receive-table/:id",
        element: <TablePage />,
      },
      {
        path: "receive-message/:id",
        element: <ReceiveMessagePage />,
      },
      {
        path: "Outreceive-message/:id",
        element: <ReceiveMessagePage />,
      },
      {
        path: "receive-refferal/:id",
        element: <ReceiveRefferalPage />,
      },
      {
        path: "Outreceive-refferal/:id",
        element: <ReceiveRefferalPage />,
      },
    ],
  },
];

export default MessengerRoutes;
