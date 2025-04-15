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

const MessengerRoutes = [
  {
    path: "/messenger",
    element: <MessengerPage />,
  },

  {
    path: "/letter-sent",
    element: <SentPage />,
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
