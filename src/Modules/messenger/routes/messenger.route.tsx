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
const SentUpdateFormPage = lazy(() =>
  import("..").then((module) => ({
    default: module.SentUpdateFormPage,
  }))
);
const MessengerPage = lazy(() =>
  import("../pages/messenger_main.page")
);
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
        path: "message/:id",
        element: <SentMessagePage />,
      },
      {
        path: "form",
        element: <SentUpdateFormPage />,
      },
      {
        path: "update-form/:id",
        element: <SentUpdateFormPage />,
      },
      {
        path: "receive-table",
        element: <ReceiveTablePage />,
      },
      {
        path: "receive-message/:id",
        element: <ReceiveMessagePage />,
      },
      {
        path: "receive-refferal/:id",
        element: <ReceiveRefferalPage />,
      },
    ],
  },
];

export default MessengerRoutes;
