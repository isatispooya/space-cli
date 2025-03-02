import { lazy } from "react";

const ConversationPage = lazy(() =>
  import("..").then((module) => ({
    default: module.ConversationPage,
  }))
);
const CorrespondenceRoutes = [
  {
    path: "/correspondence",
    element: <ConversationPage />,
  },
];

export default CorrespondenceRoutes;
