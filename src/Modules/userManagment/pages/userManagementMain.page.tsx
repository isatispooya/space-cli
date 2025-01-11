import { Outlet } from "react-router-dom";
import { Toolbar } from "../../../components";
import { MainLayout } from "../../../layouts";
import { LuSettings, LuUser } from "react-icons/lu";

const UserManagementMainPage: React.FC = () => {
  const toolbarButtons = [
    {
      icon: LuUser,
      text: "پروفایل",
      permission: ["allow_any"],
      path: "profile",
    },
    {
      icon: LuSettings,
      text: "تغییر رمز عبور",
      permission: ["allow_any"],
      path: "changePassword",
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col">
        <div className="bg-white p-3">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-1">
            تنظیمات کاربران
          </h1>
          <p className="text-gray-600 text-center text-sm">مدیریت و مشاهده</p>
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

export default UserManagementMainPage;
