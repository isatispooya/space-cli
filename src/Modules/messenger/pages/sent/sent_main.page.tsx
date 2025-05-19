import { MainLayout } from "../../../../layouts";

import { Toolbar } from "../../../../components";
import { LuTable } from "react-icons/lu";
import { VscGitStashApply } from "react-icons/vsc";
import { MdMarkEmailRead } from "react-icons/md";
import { Outlet } from "react-router-dom";
const SentPage = () => {
  const toolbarButtons = [
    {
      icon: LuTable,
      text: "ایجاد نامه داخلی",
      permission: ["allow_any"],
      path: "form",
    },
    {
      icon: LuTable,
      text: "ایجاد نامه خارجی",
      permission: ["allow_any"],
      path: "Outform",
    },
    {
      icon: MdMarkEmailRead,
      text: "نامه ها ی دریافتی داخلی",
      permission: ["allow_any"],
      path: "receive-table",
    },
    {
      icon: MdMarkEmailRead,
      text: "نامه ها ی دریافتی خارجی",
      permission: ["allow_any"],
      path: "Outreceive-table",
    },
    {
      icon: VscGitStashApply,
      text: "نامه های ارسالی داخلی",
      permission: ["allow_any"],
      path: "table",
    },
    {
      icon: VscGitStashApply,
      text: "نامه های ارسالی خارجی",
      permission: ["allow_any"],
      path: "Outtable",
    },
    {
      icon: VscGitStashApply,
      text: "پیش نویس ها ",
      permission: ["allow_any"],
      path: "draft",
    },
  ];
  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col">
        <div className="bg-white p-3">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-1">
            نامه ها
          </h1>
          <p className="text-gray-600 text-center text-sm">
            مدیریت و پیگیری نامه های کاربران
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

export default SentPage;
