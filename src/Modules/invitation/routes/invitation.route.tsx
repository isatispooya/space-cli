import { lazy } from "react";

const InvitationMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.InvitationMainPage,
  }))
);
const InvitationTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.InvitationTablePage,
  }))
);
const InvitationCreatePage = lazy(() =>
  import("..").then((module) => ({
    default: module.InvitationCreatePage,
  }))
);
const InvitationListTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.InvitationListTablePage,
  }))
);

const InvitationRoutes = [
  {
    path: "/invitation",
    element: <InvitationMainPage />,
    children: [
      {
        path: "table",
        element: <InvitationTablePage />,
      },
      {
        path: "create",
        element: <InvitationCreatePage />,
      },
      {
        path: "list",
        element: <InvitationListTablePage />,
      },
    ],
  },
];

export default InvitationRoutes;
