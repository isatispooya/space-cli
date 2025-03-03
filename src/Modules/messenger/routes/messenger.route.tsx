import { lazy } from "react";

const MessengerPage = lazy(() =>
  import("..").then((module) => ({
    default: module.MessengerPage,
  }))
);
const MessengerRoutes = [
  {
    path: "/messenger",
    element: <MessengerPage />,
  },
];

export default MessengerRoutes;
