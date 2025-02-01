import { LuTable } from "react-icons/lu";
import { MainLayout } from "../../../layouts";
import { Toolbar } from "../../../components";
import { Outlet } from "react-router-dom";

const RewardsMainPage: React.FC = () => {
  const toolbarButtons = [
    {
      icon: LuTable,
      text: "جدول",
      permission: ["allow_any"],
      path: "table",
    },
  ];
  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col">
        <div className="bg-white p-3">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-1">
            مدیریت امتیازات رفاهی
          </h1>
          <p className="text-gray-600 text-center text-sm">
            مدیریت امتیازات رفاهی به صورت هوشمند
          </p>
        </div>
        <div className="flex-grow flex flex-col">
          <div className="px-6 py-3">
            <Toolbar buttons={toolbarButtons} />
            <Outlet />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RewardsMainPage;
