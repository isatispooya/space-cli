import { lazy } from "react";

const UnderWritingTablePage = lazy(() =>
  import("..").then((module) => ({
    default: module.UnderWritingTablePage,
  }))
);
const UnderWritingFormPage = lazy(() =>
  import("..").then((module) => ({
    default: module.UnderWritingFormPage,
  }))
);
const UnderWritingMainPage = lazy(() =>
  import("..").then((module) => ({
    default: module.UnderwritingMainPage,
  }))
);
const UnderwritingDescPage = lazy(() =>
  import("..").then((module) => ({
    default: module.UnderwritingDescPage,
  }))
);
const UnderwritingViewPage = lazy(() =>
  import("..").then((module) => ({
    default: module.UnderwritingViewPage,
  }))
);

const UpdateUnderWritingPage = lazy(() =>
  import("..").then((module) => ({
    default: module.UpdateUnderWritingPage,
  }))
);

const ProjectProgressPage = lazy(() =>
  import("..").then((module) => ({
    default: module.ProjectProgressPage,
  }))
);
const FinancialStatementPage = lazy(() =>
  import("..").then((module) => ({
    default: module.FinancialStatementPage,
  }))
);
const ImagesPage = lazy(() =>
  import("..").then((module) => ({
    default: module.ImagesPage,
  }))
);
const BusinessPlanPage = lazy(() =>
  import("..").then((module) => ({
    default: module.BusinessPlanPage,
  }))
);
const CreditAnalysisPage = lazy(() =>
  import("..").then((module) => ({
    default: module.CreditAnalysisPage,
  }))
);
const ShareExpertPage = lazy(() =>
  import("..").then((module) => ({
    default: module.ShareExpertPage,
  }))
);
const ProjectAnalysisPage = lazy(() =>
  import("..").then((module) => ({
    default: module.ProjectAnalysisPage,
  }))
);
const LicensePage = lazy(() =>
  import("..").then((module) => ({
    default: module.LicensePage,
  }))
);
const UnderwritingReportsPage = lazy(() =>
  import("..").then((module) => ({
    default: module.UnderwritingReportsPage,
  }))
);

const UnderwritingRoutes = [
  {
    path: "/underwriting",
    element: <UnderWritingMainPage />,
    children: [
      {
        path: "table",
        element: <UnderWritingTablePage />,
      },
      {
        path: "create",
        element: <UnderWritingFormPage />,
      },
      {
        path: "update/:id",
        element: <UpdateUnderWritingPage />,
      },

      {
        path: "license",
        element: <LicensePage />,
      },
      {
        path: "description",
        element: <UnderwritingDescPage />,
      },
      {
        path: "attachments",
        element: <UnderwritingViewPage />,
      },
      {
        path: "projectProgress",
        element: <ProjectProgressPage />,
      },
      {
        path: "financialStatement",
        element: <FinancialStatementPage />,
      },
      {
        path: "images",
        element: <ImagesPage />,
      },
      {
        path: "businessPlan",
        element: <BusinessPlanPage />,
      },
      {
        path: "creditAnalysis",
        element: <CreditAnalysisPage />,
      },
      {
        path: "projectProgress",
        element: <ProjectProgressPage />,
      },

      {
        path: "shareExpert",
        element: <ShareExpertPage />,
      },
      {
        path: "projectAnalysis",
        element: <ProjectAnalysisPage />,
      },
      {
        path: "reports",
        element: <UnderwritingReportsPage />,
      },
    ],
  },
];

export default UnderwritingRoutes;
