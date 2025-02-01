import { lazy } from "react";

const PointsMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.PointsMainPage,
  }))
);
const PointsMissionsPage = lazy(() =>
  import("..").then((module) => ({
    default: module.MissionsPage,
  }))
);
const PointsGiftsPage = lazy(() =>
  import("..").then((module) => ({
    default: module.GiftsPage,
  }))
);
const PointsRequestsPage = lazy(() =>
  import("..").then((module) => ({
    default: module.RequestPage,
  }))
);
const PrivilegesPage = lazy(() =>
  import("..").then((module) => ({
    default: module.PrivilegesPage,
  }))
);
const RewardsPage = lazy(() =>
  import("..").then((module) => ({
    default: module.RewardsMainPage,
  }))
);
const RewardsTable = lazy(() =>
  import("..").then((module) => ({
    default: module.Rewards,
  }))
);

const PointsRoutes = [
  {
    path: "/points",
    element: <PointsMainPage />,
    children: [
      {
        path: "missions",
        element: <PointsMissionsPage />,
      },
      {
        path: "gifts",
        element: <PointsGiftsPage />,
      },
      {
        path: "requests",
        element: <PointsRequestsPage />,
      },
      {
        path: "privileges",
        element: <PrivilegesPage />,
      },
    ],
  },
  {
    path: "/rewards",
    element: <RewardsPage />,
    children: [
      {
        path: "table",
        element: <RewardsTable />,
      },
    ],
  },
];

export default PointsRoutes;
