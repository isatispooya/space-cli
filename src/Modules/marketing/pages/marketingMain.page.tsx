import { MainLayout } from "../../../layouts";
import { Outlet } from "react-router-dom";

import { Toolbar } from "../../../components";
import { LuPlus, LuTable } from "react-icons/lu";

const MarketingMainPage = () => {
  const toolbarButtons = [
    {
      icon: LuTable,
      text: "لیست دعوت",
      permission: "allow_any",
      path: "list",
    },
    {
      icon: LuTable,
      text: "لیست کد",
      permission: "allow_any",
      path: "table",
    },
    {
      icon: LuPlus,
      text: "ایجاد",
      permission: "allow_any",
      path: "create",
    },
  ];
  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col">
        <div className="bg-white p-3">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-1">
            پنل کاربران دعوت شده
          </h1>
          <p className="text-gray-600 text-center text-sm">
            مدیریت و پیگیری دعوت ها به صورت هوشمند
          </p>
        </div>
        <div className="flex-grow flex flex-col">
          <div className="px-6 py-3">
            <Toolbar buttons={toolbarButtons} />
          </div>
          <div className="flex-grow px-6 bg-white">
            <Outlet />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MarketingMainPage;
