import { MainLayout } from "../../../layouts";
import CompanyTable from "../feature/table";
import CompanyToolBar from "../feature/toolBar";

const CompanyPage = () => {
  return (
    <MainLayout>
      <CompanyToolBar />
      <CompanyTable />
    </MainLayout>
  );
};

export default CompanyPage;
