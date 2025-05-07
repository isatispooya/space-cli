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

const MessengerRoutes = [
  {
    path: "/letter-sent",
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
    ],
  },
];

export default MessengerRoutes;
