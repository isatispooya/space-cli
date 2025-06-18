import { lazy } from "react";

const ShareholdersPage = lazy(() =>
  import("..").then((module) => ({
    default: module.ShareholdersPage,
  }))
);
const ShareholdTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.ShareholdersTablePage,
  }))
);

const ShareholdersFormPage = lazy(() =>
  import("..").then((module) => ({
    default: module.ShareholdersFormPage,
  }))
);

const GardashHesabPage = lazy(() =>
  import("..").then((module) => ({
    default: module.GardashHesabPage,
  }))
);
const ShareholdersUpdatePage = lazy(() =>
  import("..").then((module) => ({
    default: module.ShareholdersUpdatePage,
  }))
);

const ShareholdersRoutes = [
  {
    path: "/shareholders",
    element: <ShareholdersPage />,
    children: [
      {
        path: "table",
        element: <ShareholdTablePage />,
      },
      {
        path: "create",
        element: <ShareholdersFormPage />,
      },
      {
        path: "update/:id",
        element: <ShareholdersUpdatePage />,
      },
      {
        path: "gardeshHesab",
        element: <GardashHesabPage />,
      },
    ],
  },
];

export default ShareholdersRoutes;
