import { MainLayout } from "../../../../layouts";
import { Cards } from "../../feature/rasmio";

const ReasmioCompanyMainPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex flex-col">
          <div className="flex-grow px-6 bg-white">
            <Cards />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReasmioCompanyMainPage;
