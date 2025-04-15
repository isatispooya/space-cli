import { lazy } from "react";

const MessengerPage = lazy(() =>
  import("..").then((module) => ({
    default: module.MessengerPage,
  }))
);
const SentPage = lazy(() =>
  import("..").then((module) => ({
    default: module.SentPage,
  }))
);
const ReceivePage = lazy(() =>
  import("..").then((module) => ({
    default: module.ReceivePage,
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
const SentFormPage = lazy(() =>
  import("..").then((module) => ({
    default: module.SentFormPage,
  }))
);
const SentUpdateFormPage = lazy(() =>
  import("..").then((module) => ({
    default: module.SentUpdateFormPage,
  }))
);


const MessengerRoutes = [
  {
    path: "/messenger",
    element: <MessengerPage />,
  },

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
        element: <SentFormPage />,
      },
      {
        path: "update-form/:id",
        element: <SentUpdateFormPage />,
      },
    ],
  },
  {
    path: "/letter-receive",
    element: <ReceivePage />,
    children: [
      {
        path: "table",
        element: <ReceiveTablePage />,
      },
      {
        path: "message/:id",
        element: <ReceiveMessagePage />,
      },
    ],
  },
];

export default MessengerRoutes;
