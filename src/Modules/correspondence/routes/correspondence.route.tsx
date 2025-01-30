import { lazy } from "react";

const CorrespondencePage = lazy(() =>
  import("..").then((module) => ({
    default: module.CorrespondencePage,
  }))
);
const CorrespondenceCreatePage = lazy(() =>
  import("..").then((module) => ({
    default: module.CorrespondenceCreatePage,
  }))
);
const CorrespondenceTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.CorrespondenceTablePage,
  }))
);

const CorrespondenceRoutes = [
  {
    path: "/correspondence",
    element: <CorrespondencePage />,
    children: [
      {
        path: "table",
        element: <CorrespondenceTablePage />,
      },
      {
        path: "create",
        element: <CorrespondenceCreatePage />,
      },
    ],
  },
];

export default CorrespondenceRoutes;
