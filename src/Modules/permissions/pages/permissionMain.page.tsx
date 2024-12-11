import { Outlet } from "react-router-dom";
import { MainLayout } from "../../../layouts";
import { Toolbar } from "../../../components";

const PermissionMainPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col">
        <div className="bg-white p-3">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-1">
            سامانه مدیریت دسترسی ها
          </h1>
          <p className="text-gray-600 text-center text-sm">
            مدیریت و پیگیری دسترسی ها به صورت هوشمند
          </p>
        </div>
        <div className="flex-grow flex flex-col">
          <div className="px-6 py-3">
            <Toolbar />
          </div>
          <div className="flex-grow px-6 bg-white">
            <Outlet />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PermissionMainPage;
