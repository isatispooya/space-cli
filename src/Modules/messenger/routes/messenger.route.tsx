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
  },
];

export default MessengerRoutes;
