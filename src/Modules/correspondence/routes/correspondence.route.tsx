import { lazy } from "react";

const CorrespondencePage = lazy(() =>
  import("..").then((module) => ({
    default: module.CorrespondencePage,
  }))
);
const CorrespondenceChatPage = lazy(() =>
  import("..").then((module) => ({
    default: module.CorrespondenceChatPage,
  }))
);
const CorrespondenceRoutes = [
  {
    path: "/correspondence",
    element: <CorrespondencePage />,
    children: [
      {
        path: "create",
        element: <CorrespondenceChatPage />,
      },
    ],
  },
];

export default CorrespondenceRoutes;
