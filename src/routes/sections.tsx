import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import LoaderLg from "../components/loader-lg";
import NotFoundPage from "../pages/not_found.page";
import Dashboard from "../Modules/dashboard/pages/dashboard.page";
import { UpdateUnderWritingPage } from "../Modules/shareholdrs";

const LoginPage = lazy(() => import("../pages/login.page"));
const ProfilePage = lazy(() =>
  import("../Modules/profile").then((module) => ({
    default: module.ProfilePage,
  }))
);
const SettingsPage = lazy(() =>
  import("../Modules/settings").then((module) => ({
    default: module.SettingsPage,
  }))
);

const CompanyMainPage = lazy(() =>
  import("../Modules/companies").then((module) => ({
    default: module.CompanyMainPage,
  }))
);

const CompanyTablePage = lazy(() =>
  import("../Modules/companies").then((module) => ({
    default: module.CompanyTablePage,
  }))
);

const PaymentResultPage = lazy(() =>
  import("../pages/paymentResultPage").then((module) => ({
    default: module.default,
  }))
);

const CompanyCreatePage = lazy(() =>
  import("../Modules/companies").then((module) => ({
    default: module.CompanyCreatePage,
  }))
);
const CorrespondencePage = lazy(() =>
  import("../Modules/correspondence").then((module) => ({
    default: module.CorrespondencePage,
  }))
);
const CorrespondenceCreatePage = lazy(() =>
  import("../Modules/correspondence").then((module) => ({
    default: module.CorrespondenceCreatePage,
  }))
);
const CorrespondenceTablePage = lazy(() =>
  import("../Modules/correspondence").then((module) => ({
    default: module.CorrespondenceTablePage,
  }))
);
const PositionCreatePage = lazy(() =>
  import("../Modules/positions").then((module) => ({
    default: module.PositionCreatePage,
  }))
);
const PositionMainPage = lazy(() =>
  import("../Modules/positions").then((module) => ({
    default: module.PositionMainPage,
  }))
);
const PositionsTablePage = lazy(() =>
  import("../Modules/positions").then((module) => ({
    default: module.PositionsTablePage,
  }))
);

const ShareholdersPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.ShareholdersPage,
  }))
);
const ShareholdTablePage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.ShareholdTablePage,
  }))
);
const ShareholdersFormPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.ShareholdersFormPage,
  }))
);
const ShareholdersUpdatePage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.ShareholdersUpdatePage,
  }))
);

const PermissionsTablePage = lazy(() =>
  import("../Modules/permissions").then((module) => ({
    default: module.PermissionsTablePage,
  }))
);

const PermissionsCreatePage = lazy(() =>
  import("../Modules/permissions").then((module) => ({
    default: module.PermissionsCreatePage,
  }))
);

const PermissionMainPage = lazy(() =>
  import("../Modules/permissions").then((module) => ({
    default: module.PermissionMainPage,
  }))
);

const StockTransferPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.StockTransferPage,
  }))
);

const StockTransferTablePage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.StockTransferTablePage,
  }))
);

const StockTransferFormPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.StockTransferFormPage,
  }))
);

const PrecendenceTablePage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.PrecendenceTablePage,
  }))
);

const PrecendenceMainPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.PrecendenceMainPage,
  }))
);

const PrecendenceFormPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.PrecendenceFormPage,
  }))
);

const PercendenceUpdatePage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.PercendenceUpdatePage,
  }))
);

const CapitalMainPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.CapitalMainPage,
  }))
);

const CapitalTablePage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.CapitalTablePage,
  }))
);



const CapitalIncreaseFormPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.CapitalIncreaseFormPage,
  }))
);

const DisplacementMainPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.DisplacementMainPage,
  }))
);

const DisplacementTablePage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.DisplacementTablePage,
  }))
);

const DisplacementFormPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.DisplacementFormPage,
  }))
);

const DisplacementUpdatePage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.DisplacementUpdatePage,
  }))
);

const GroupsMainPage = lazy(() =>
  import("../Modules/permissions").then((module) => ({
    default: module.GroupsMainPage,
  }))
);

const GroupsTablePage = lazy(() =>
  import("../Modules/permissions").then((module) => ({
    default: module.GroupsTablePage,
  }))
);

const UnderWritingTablePage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.UnderWritingTablePage,
  }))
);

const UnderWritingFormPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.UnderWritingFormPage,
  }))
);

const UnderWritingMainPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.UnderWritingMainPage,
  }))
);

const StockTransferUpdatePage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.StockTransferUpdatePage,
  }))
);

const DashboardPage = lazy(() =>
  import("../Modules/dasboard").then((module) => ({
    default: module.DashboardPage,
  }))
);

const Loader = () => <LoaderLg />;



export default function Router() {
  const routes = useRoutes([
    {
      path: "/login",
      element: (
        <Suspense fallback={<Loader />}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: "/paymentResult/",
      element: (
        <Suspense fallback={<Loader />}>
          <PaymentResultPage />
        </Suspense>
      ),
    },
    {
      path: "/profile",
      element: (
        <Suspense fallback={<Loader />}>
          <DashboardPage />
        </Suspense>
      ),
    },
    {
      path: "/profile",
      element: (
        <Suspense fallback={<Loader />}>
          <ProfilePage />
        </Suspense>
      ),
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<Loader />}>
          <Dashboard />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<Loader />}>
          <NotFoundPage />
        </Suspense>
      ),
    },
    {
      path: "/settings",
      element: (
        <Suspense fallback={<Loader />}>
          <SettingsPage />
        </Suspense>
      ),
    },
    {
      path: "/companies",
      element: (
        <Suspense fallback={<Loader />}>
          <CompanyMainPage />
        </Suspense>
      ),
      children: [
        {
          path: "table",
          element: (
            <Suspense fallback={<Loader />}>
              <CompanyTablePage />
            </Suspense>
          ),
        },
        {
          path: "create",
          element: (
            <Suspense fallback={<Loader />}>
              <CompanyCreatePage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/permissions",
      element: (
        <Suspense fallback={<Loader />}>
          <PermissionMainPage />
        </Suspense>
      ),
      children: [
        {
          path: "table",
          element: (
            <Suspense fallback={<Loader />}>
              <PermissionsTablePage />
            </Suspense>
          ),
        },
        {
          path: "create",
          element: (
            <Suspense fallback={<Loader />}>
              <PermissionsCreatePage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/positions",
      element: (
        <Suspense fallback={<Loader />}>
          <PositionMainPage />
        </Suspense>
      ),
      children: [
        {
          path: "create",
          element: (
            <Suspense fallback={<Loader />}>
              <PositionCreatePage />
            </Suspense>
          ),
        },
        {
          path: "table",
          element: (
            <Suspense fallback={<Loader />}>
              <PositionsTablePage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/correspondence",
      element: (
        <Suspense fallback={<Loader />}>
          <CorrespondencePage />
        </Suspense>
      ),
      children: [
        {
          path: "table",
          element: (
            <Suspense fallback={<Loader />}>
              <CorrespondenceTablePage />
            </Suspense>
          ),
        },
        {
          path: "create",
          element: (
            <Suspense fallback={<Loader />}>
              <CorrespondenceCreatePage />
            </Suspense>
          ),
        },
   
      ],
    },
    {
      path: "/shareholders",
      element: (
        <Suspense fallback={<Loader />}>
          <ShareholdersPage />
        </Suspense>
      ),
      children: [
        {
          path: "table",
          element: (
            <Suspense fallback={<Loader />}>
              <ShareholdTablePage />
            </Suspense>
          ),
        },
        {
          path: "create",
          element: (
            <Suspense fallback={<Loader />}>
              <ShareholdersFormPage />
            </Suspense>
          ),
        },
        {
          path: "update",
          element: (
            <Suspense fallback={<Loader />}>
              <ShareholdersUpdatePage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/transferstock",
      element: (
        <Suspense fallback={<Loader />}>
          <StockTransferPage />
        </Suspense>
      ),
      children: [
        {
          path: "table",
          element: (
            <Suspense fallback={<Loader />}>
              <StockTransferTablePage />
            </Suspense>
          ),
        },
        {
          path: "create",
          element: (
            <Suspense fallback={<Loader />}>
              <StockTransferFormPage />
            </Suspense>
          ),
        },
        {
          path: "update",
          element: (
            <Suspense fallback={<Loader />}>
              <StockTransferUpdatePage />
            </Suspense>
          ),
        },
        
        
      ],
    },
    {
      path: "/precendence",
      element: (
        <Suspense fallback={<Loader />}>
          <PrecendenceMainPage />
        </Suspense>
      ),
      children: [
        {
          path: "table",
          element: (
            <Suspense fallback={<Loader />}>
              <PrecendenceTablePage />
            </Suspense>
          ),
        },
        {
          path: "create",
          element: (
            <Suspense fallback={<Loader />}>
              <PrecendenceFormPage />
            </Suspense>
          ),
        },
        {
          path: "update",
          element: (
            <Suspense fallback={<Loader />}>
              <PercendenceUpdatePage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/capital",
      element: (
        <Suspense fallback={<Loader />}>
          <CapitalMainPage />
        </Suspense>
      ),
      children: [
        {
          path: "table",
          element: (
            <Suspense fallback={<Loader />}>
              <CapitalTablePage />
            </Suspense>
          ),
        },
        {
          path: "create",
          element: (
            <Suspense fallback={<Loader />}>
              <CapitalIncreaseFormPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/displacement",
      element: (
        <Suspense fallback={<Loader />}>
          <DisplacementMainPage />
        </Suspense>
      ),
      children: [
        {
          path: "table",
          element: (
            <Suspense fallback={<Loader />}>
              <DisplacementTablePage />
            </Suspense>
          ),
        },
        {
          path: "create",
          element: (
            <Suspense fallback={<Loader />}>
              <DisplacementFormPage />
            </Suspense>
          ),
        },
        {
          path: "update",
          element: (
            <Suspense fallback={<Loader />}>
              <DisplacementUpdatePage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/groups",
      element: (
        <Suspense fallback={<Loader />}>
          <GroupsMainPage />
        </Suspense>
      ),
      children: [
        {
          path: "table",
          element: (
            <Suspense fallback={<Loader />}>
              <GroupsTablePage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/underwriting",
      element: (
        <Suspense fallback={<Loader />}>
          <UnderWritingMainPage />
        </Suspense>
      ),
      children: [
        {
          path: "table",
          element: (
            <Suspense fallback={<Loader />}>
              <UnderWritingTablePage />
            </Suspense>
          ),
        },
        {
          path: "create",
          element: (
            <Suspense fallback={<Loader />}>
              <UnderWritingFormPage />
            </Suspense>
          ),
        },
        {
          path: "update",
          element: (
            <Suspense fallback={<Loader />}>
              <UpdateUnderWritingPage />
            </Suspense>
          ),
        },
      ],
    },
  ]);
  return routes;
}
