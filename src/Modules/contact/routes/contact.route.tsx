import { lazy } from "react";

const ContactMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.ContactMainPage,
  }))
);

const ContactRoutes = [
  {
    path: "/contact",
    element: <ContactMainPage />,
  },
];

export default ContactRoutes;
