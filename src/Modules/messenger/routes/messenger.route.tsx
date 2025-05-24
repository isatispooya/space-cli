import { lazy } from "react";

const SentPage = lazy(() =>
  import("..").then((module) => ({
    default: module.SentPage,
  }))
);
const ReceiveTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.ReceiveTablePage,
  }))
);
const ReceiveMessagePage = lazy(() =>
  import("..").then((module) => ({
    default: module.ReceiveMessagePage,
  }))
);

const SentTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.SentTablePage,
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
        element: <SentTablePage />,
      },
      {
        path: "Outtable",
        element: <SentTablePage />,
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
        path: "update-form/:id",
        element: <MakeFormPage />,
      },

      {
        path: "receive-table",
        element: <ReceiveTablePage />,
      },
      {
        path: "Outreceive-table",
        element: <ReceiveTablePage />,
      },
      {
        path: "receive-table/:id",
        element: <ReceiveTablePage />,
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
