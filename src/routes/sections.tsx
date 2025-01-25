import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import LoaderLg from "../components/loader-lg";
import NotFoundPage from "../pages/not_found.page";
import Dashboard from "../Modules/dashboard/pages/dashboard.page";

const LoginPage = lazy(() => import("../pages/login.page"));

const UserManagementMainPage = lazy(() =>
  import("../Modules/userManagment").then((module) => ({
    default: module.UserManagementMainPage,
  }))
);

const ProfilePage = lazy(() =>
  import("../Modules/userManagment").then((module) => ({
    default: module.ProfilePage,
  }))
);

const ChangePassPage = lazy(() =>
  import("../Modules/userManagment").then((module) => ({
    default: module.ChangePassPage,
  }))
);

const ContactMainPage = lazy(() =>
  import("../Modules/contact").then((module) => ({
    default: module.ContactMainPage,
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

const CompanyEditPage = lazy(() =>
  import("../Modules/companies").then((module) => ({
    default: module.CompanyEditPage,
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

const PositionUpdatePage = lazy(() =>
  import("../Modules/positions").then((module) => ({
    default: module.PositionUpdatePage,
  }))
);

const LicensePage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.LicensePage,
  }))
);

const ShareholdersPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.ShareholdersPage,
  }))
);
const ShareholdTablePage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.ShareholdersTablePage,
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

const PrecendencePrintPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.PrecendencePrintPage,
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

const PermissionEditPage = lazy(() =>
  import("../Modules/permissions").then((module) => ({
    default: module.PermissionEditPage,
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
    default: module.UnderwritingMainPage,
  }))
);

const UnderwritingDescPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.UnderwritingDescPage,
  }))
);

const UnderwritingViewPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.UnderwritingViewPage,
  }))
);

const UnderwritingPrintPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.PrintUnderwritingPage,
  }))
);

const UpdateUnderWritingPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.UpdateUnderWritingPage,
  }))
);

const ProjectProgressPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.ProjectProgressPage,
  }))
);

const FinancialStatementPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.FinancialStatementPage,
  }))
);

const ImagesPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.ImagesPage,
  }))
);

const BusinessPlanPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.BusinessPlanPage,
  }))
);

const CreditAnalysisPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.CreditAnalysisPage,
  }))
);

const ShareExpertPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.ShareExpertPage,
  }))
);

const ProjectAnalysisPage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.ProjectAnalysisPage,
  }))
);

const StockTransferUpdatePage = lazy(() =>
  import("../Modules/shareholdrs").then((module) => ({
    default: module.StockTransferUpdatePage,
  }))
);

const InvitationMainPage = lazy(() =>
  import("../Modules/marketing").then((module) => ({
    default: module.InvitationMainPage,
  }))
);

const InvitationTablePage = lazy(() =>
  import("../Modules/invitation").then((module) => ({
    default: module.InvitationTablePage,
  }))
);

const InvitationCreatePage = lazy(() =>
  import("../Modules/invitation").then((module) => ({
    default: module.InvitationCreatePage,
  }))
);

const InvitationListTablePage = lazy(() =>
  import("../Modules/invitation").then((module) => ({
    default: module.InvitationListTablePage,
  }))
);

const PointsMainPage = lazy(() =>
  import("../Modules/points").then((module) => ({
    default: module.PointsMainPage,
  }))
);

const PointsMissionsPage = lazy(() =>
  import("../Modules/points").then((module) => ({
    default: module.MissionsPage,
  }))
);

const PointsGiftsPage = lazy(() =>
  import("../Modules/points").then((module) => ({
    default: module.GiftsPage,
  }))
);

const PointsRequestsPage = lazy(() =>
  import("../Modules/points").then((module) => ({
    default: module.RequestPage,
  }))
);

const PrivilegesPage = lazy(() =>
  import("../Modules/points").then((module) => ({
    default: module.PrivilegesPage,
  }))
);

const TimeFlowMainPage = lazy(() =>
  import("../Modules/timeflow").then((module) => ({
    default: module.TimeFlowMainPage,
  }))
);

const TimeFlowTablePage = lazy(() =>
  import("../Modules/timeflow").then((module) => ({
    default: module.TimeFlowTablePage,
  }))
);
const TimeFlowApproachPage = lazy(() =>
  import("../Modules/timeflow").then((module) => ({
    default: module.TimeFlowApproachPage,
  }))
);
const TimeFlowLeaveTablePage = lazy(() =>
  import("../Modules/timeflow").then((module) => ({
    default: module.TimeFlowLeaveTablePage,
  }))
);
const TimeFlowCreatePage = lazy(() =>
  import("../Modules/timeflow").then((module) => ({
    default: module.LeaveCreatePage,
  }))
);

const EmploymentsMainPage = lazy(() =>
  import("../Modules/employments").then((module) => ({
    default: module.EmploymentsMainPage,
  }))
);
const EmploymentsTablePage = lazy(() =>
  import("../Modules/employments").then((module) => ({
    default: module.EmploymentsTablePage,
  }))
);

const EmploymentsCreatePage = lazy(() =>
  import("../Modules/employments").then((module) => ({
    default: module.EmploymentsCreatePage,
  }))
);

const EmploymentsProcessMainPage = lazy(() =>
  import("../Modules/employmentsprocess").then((module) => ({
    default: module.EmploymentsProcessMainPage,
  }))
);

const EmploymentsProcessTablePage = lazy(() =>
  import("../Modules/employmentsprocess").then((module) => ({
    default: module.EmploymentsProcessTablePage,
  }))
);

const EmploymentsProcessCreatePage = lazy(() =>
  import("../Modules/employmentsprocess").then((module) => ({
    default: module.EmploymentsProcessCreatePage,
  }))
);

const UsersMainPage = lazy(() =>
  import("../Modules/users").then((module) => ({
    default: module.UsersMainPage,
  }))
);

const UserProTablePage = lazy(() =>
  import("../Modules/users").then((module) => ({
    default: module.UserProTablePage,
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
      path: "/userManagement",
      element: (
        <Suspense fallback={<Loader />}>
          <UserManagementMainPage />
        </Suspense>
      ),
      children: [
        {
          path: "profile",
          element: (
            <Suspense fallback={<Loader />}>
              <ProfilePage />
            </Suspense>
          ),
        },
        {
          path: "changePassword",
          element: (
            <Suspense fallback={<Loader />}>
              <ChangePassPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/contact",
      element: (
        <Suspense fallback={<Loader />}>
          <ContactMainPage />
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
        {
          path: "edit/:id",
          element: (
            <Suspense fallback={<Loader />}>
              <CompanyEditPage />
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
        {
          path: "edit/:id",
          element: (
            <Suspense fallback={<Loader />}>
              <PermissionEditPage />
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
        {
          path: "update/:id",
          element: (
            <Suspense fallback={<Loader />}>
              <PositionUpdatePage />
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
          path: "update/:id",
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
          path: "update/:id",
          element: (
            <Suspense fallback={<Loader />}>
              <PercendenceUpdatePage />
            </Suspense>
          ),
        },
      ],
      
    },
    {
      path: "/precendence/print/:id",
      element: (
        <Suspense fallback={<Loader />}>
          <PrecendencePrintPage />
        </Suspense>
      ),
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
          path: "update/:id",
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
          path: "update/:id",
          element: (
            <Suspense fallback={<Loader />}>
              <UpdateUnderWritingPage />
            </Suspense>
          ),
        },

        {
          path: "license",
          element: (
            <Suspense fallback={<Loader />}>
              <LicensePage />
            </Suspense>
          ),
        },
        {
          path: "description",
          element: (
            <Suspense fallback={<Loader />}>
              <UnderwritingDescPage />
            </Suspense>
          ),
        },
        {
          path: "attachments",
          element: (
            <Suspense fallback={<Loader />}>
              <UnderwritingViewPage />
            </Suspense>
          ),
        },
        {
          path: "projectProgress",
          element: (
            <Suspense fallback={<Loader />}>
              <ProjectProgressPage />
            </Suspense>
          ),
        },
        {
          path: "financialStatement",
          element: (
            <Suspense fallback={<Loader />}>
              <FinancialStatementPage />
            </Suspense>
          ),
        },
        {
          path: "images",
          element: (
            <Suspense fallback={<Loader />}>
              <ImagesPage />
            </Suspense>
          ),
        },
        {
          path: "businessPlan",
          element: (
            <Suspense fallback={<Loader />}>
              <BusinessPlanPage />
            </Suspense>
          ),
        },
        {
          path: "creditAnalysis",
          element: (
            <Suspense fallback={<Loader />}>
              <CreditAnalysisPage />
            </Suspense>
          ),
        },
        {
          path: "projectProgress",
          element: (
            <Suspense fallback={<Loader />}>
              <ProjectProgressPage />
            </Suspense>
          ),
        },

        {
          path: "shareExpert",
          element: (
            <Suspense fallback={<Loader />}>
              <ShareExpertPage />
            </Suspense>
          ),
        },
        {
          path: "projectAnalysis",
          element: (
            <Suspense fallback={<Loader />}>
              <ProjectAnalysisPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "underwriting/print/:id",
      element: (
        <Suspense fallback={<Loader />}>
          <UnderwritingPrintPage />
        </Suspense>
      ),
    },
    {
      path: "/timeflow",
      element: (
        <Suspense fallback={<Loader />}>
          <TimeFlowMainPage />
        </Suspense>
      ),
      children: [
        {
          path: "approach",
          element: (
            <Suspense fallback={<Loader />}>
              <TimeFlowApproachPage />
            </Suspense>
          ),
        },
        {
          path: "table",
          element: (
            <Suspense fallback={<Loader />}>
              <TimeFlowTablePage />
            </Suspense>
          ),
        },
        {
          path: "leave",
          element: (
            <Suspense fallback={<Loader />}>
              <TimeFlowLeaveTablePage />
            </Suspense>
          ),
        },
        {
          path: "addleave",
          element: (
            <Suspense fallback={<LoaderLg />}>
              <TimeFlowCreatePage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/invitation",
      element: (
        <Suspense fallback={<Loader />}>
          <InvitationMainPage />
        </Suspense>
      ),
      children: [
        {
          path: "table",
          element: (
            <Suspense fallback={<Loader />}>
              <InvitationTablePage />
            </Suspense>
          ),
        },
        {
          path: "create",
          element: (
            <Suspense fallback={<Loader />}>
              <InvitationCreatePage />
            </Suspense>
          ),
        },
        {
          path: "list",
          element: (
            <Suspense fallback={<Loader />}>
              <InvitationListTablePage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/employments",
      element: (
        <Suspense fallback={<Loader />}>
          <EmploymentsMainPage />
        </Suspense>
      ),
      children: [
        {
          path: "table",
          element: (
            <Suspense fallback={<Loader />}>
              <EmploymentsTablePage />
            </Suspense>
          ),
        },
        {
          path: "create",
          element: (
            <Suspense fallback={<Loader />}>
              <EmploymentsCreatePage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/employmentsprocess",
      element: (
        <Suspense fallback={<Loader />}>
          <EmploymentsProcessMainPage />
        </Suspense>
      ),
      children: [
        {
          path: "table",
          element: (
            <Suspense fallback={<Loader />}>
              <EmploymentsProcessTablePage />
            </Suspense>
          ),
        },
        {
          path: "create",
          element: (
            <Suspense fallback={<Loader />}>
              <EmploymentsProcessCreatePage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/points",
      element: (
        <Suspense fallback={<Loader />}>
          <PointsMainPage />
        </Suspense>
      ),
      children: [
        {
          path: "missions",
          element: (
            <Suspense fallback={<Loader />}>
              <PointsMissionsPage />
            </Suspense>
          ),
        },
        {
          path: "gifts",
          element: (
            <Suspense fallback={<Loader />}>
              <PointsGiftsPage />
            </Suspense>
          ),
        },
        {
          path: "requests",
          element: (
            <Suspense fallback={<Loader />}>
              <PointsRequestsPage />
            </Suspense>
          ),
        },
        {
          path: "privileges",
          element: (
            <Suspense fallback={<Loader />}>
              <PrivilegesPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/users",
      element: (
        <Suspense fallback={<Loader />}>
          <UsersMainPage />
        </Suspense>
      ),
      children: [
        {
          path: "table",
          element: <UserProTablePage />,
        },
      ],
    },
  ]);
  return routes;
}
