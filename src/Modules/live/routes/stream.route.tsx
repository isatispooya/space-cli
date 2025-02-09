import { lazy } from "react";

const StreamPage = lazy(() =>
  import("..").then((module) => ({
    default: module.StreamPage,
  }))
);

const StreamRoutes = [
  {
    path: "/stream",
    element: <StreamPage />,
  },
];

export default StreamRoutes;
