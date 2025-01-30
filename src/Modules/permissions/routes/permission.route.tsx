import { lazy } from "react";

const PermissionsTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.PermissionsTablePage,
  }))
);
const PermissionsCreatePage = lazy(() =>
  import("..").then((module) => ({
    default: module.PermissionsCreatePage,
  }))
);
const PermissionMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.PermissionMainPage,
  }))
);

const PermissionEditPage = lazy(() =>
  import("..").then((module) => ({
    default: module.PermissionEditPage,
  }))
);

const PermissionRoutes = [
  {
    path: "/permissions",
    element: <PermissionMainPage />,
    children: [
      {
        path: "table",
        element: <PermissionsTablePage />,
      },
      {
        path: "create",
        element: <PermissionsCreatePage />,
      },
      {
        path: "edit/:id",
        element: <PermissionEditPage />,
      },
    ],
  },
];

export default PermissionRoutes;
