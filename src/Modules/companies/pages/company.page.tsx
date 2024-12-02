import { MainLayout } from "../../../layouts";
import CompanyTable from "../feature/company.table";
import CompanyToolBar from "../feature/company.toolBar";

const CompanyPage = () => {
  return (
    <MainLayout>
      <CompanyToolBar />
      <CompanyTable />
    </MainLayout>
  );
};

export default CompanyPage;
