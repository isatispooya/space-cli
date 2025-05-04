import { MainLayout } from "@/layouts";
import { CompanyDetails } from "../../feature/rasmio";

const RasmioCompanyDetailsPage = () => {
  return (
    <div>
      <MainLayout>
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow flex flex-col">
            <div className="flex-grow px-6 bg-white">
              <CompanyDetails/>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};
export default RasmioCompanyDetailsPage;
