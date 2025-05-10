/* eslint-disable react-hooks/rules-of-hooks */
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { LoaderLg } from "@/components";
import NotFoundPage from "../pages/not_found.page";
import Dashboard from "../Modules/dashboard/pages/dashboard.page";
import { CompanyRoutes } from "../Modules/companies/routes/company.route";
import { UserManagementRoutes } from "../Modules/userManagment/routes";
import MessengerRoutes from "../Modules/messenger/routes/messenger.route";
import { PositionRoutes } from "../Modules/positions/routes";
import ShareholdersRoutes from "../Modules/shareholdrs/routes/shareholders.route";
import { GroupsRoutes, PermissionRoutes } from "../Modules/permissions";
import {
  CapitalRoutes,
  DisplacementRoutes,
  PrecendencePrintRoutes,
  PrecendenceRoutes,
  StockTransferRoutes,
  UnderwritingPrintRoute,
  UnderwritingRoutes,
} from "../Modules/shareholdrs/routes";
import { InvitationRoutes } from "../Modules/invitation";
import { PointsRoutes } from "../Modules/points";
import { TimeflowRoutes } from "../Modules/timeflow";
import { EmploymentsProcessRoutes } from "../Modules/employmentsprocess";
import { EmploymentsRoutes } from "../Modules/employments";
import { InsuranceAppRoutes, InsuranceRoutes } from "../Modules/insurance";
import { UsersRoutes } from "../Modules/users";
import { LoginRoutes } from "../Modules/auth";
import { ContactRoutes } from "../Modules/contact";
import { StreamRoutes } from "../Modules/live";
import { ShiftsRoutes } from "../Modules/workShifts";
import PaymentPage from "@/pages/payment.page";
import { ConsultationRoutes } from "@/Modules/consultation/routes";
import { FinToolsRoutes } from "@/Modules/finTools";
const PaymentResultPage = lazy(() =>
  import("../pages/paymentResultPage").then((module) => ({
    default: module.default,
  }))
);

const ExistingRoutes = [
  ...CompanyRoutes,
  ...LoginRoutes,
  ...UserManagementRoutes,
  ...MessengerRoutes,
  ...PositionRoutes,
  ...ShareholdersRoutes,
  ...PermissionRoutes,
  ...PrecendenceRoutes,
  ...PrecendencePrintRoutes,
  ...StockTransferRoutes,
  ...CapitalRoutes,
  ...DisplacementRoutes,
  ...UnderwritingRoutes,
  ...UnderwritingPrintRoute,
  ...InvitationRoutes,
  ...PointsRoutes,
  ...TimeflowRoutes,
  ...EmploymentsRoutes,
  ...EmploymentsProcessRoutes,
  ...GroupsRoutes,
  ...InsuranceRoutes,
  ...InsuranceAppRoutes,
  ...UsersRoutes,
  ...ContactRoutes,
  ...StreamRoutes,
  ...ShiftsRoutes,
  ...ConsultationRoutes,
  ...FinToolsRoutes,
];

export default function router() {
  const routes = useRoutes([
    ...ExistingRoutes.map((route) => ({
      ...route,
      element: <Suspense fallback={<LoaderLg />}>{route.element}</Suspense>,
    })),

    {
      path: "/paymentResult/",
      element: (
        <Suspense fallback={<LoaderLg />}>
          <PaymentResultPage />
        </Suspense>
      ),
    },
    {
      path: "/payment",
      element: (
        <Suspense fallback={<LoaderLg />}>
          <PaymentPage />
        </Suspense>
      ),
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<LoaderLg />}>
          <Dashboard />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<LoaderLg />}>
          <NotFoundPage />
        </Suspense>
      ),
    },
  ]);
  return routes;
}
