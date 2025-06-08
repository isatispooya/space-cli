import { MainLayout } from "../../../../layouts";
import { Toolbar } from "../../../../components";

import { VscGitStashApply } from "react-icons/vsc";
import { Outlet, useLocation } from "react-router-dom";

const ReceivePage = () => {
  const location = useLocation();
  const path = location.pathname;

  const table = path === "/letter/receive-table";
  const workflow = path.startsWith("/letter/receive-workflow/");
  const RefferalTable = path.startsWith("/letter/refferal-table/");
  const RefferalForm = path.startsWith("/letter/receive-refferal/");

  const toolbarButtons = [
    {
      icon: VscGitStashApply,
      text: "نامه های دریافتی",
      permission: ["allow_any"],
      path: "table",
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col">
        <div className="bg-white p-3">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-1">
            {RefferalForm && "ارجاع ها"}
            {RefferalTable && "ارجاع ها"}
            {workflow && "کارگزاری ها"}
            {table && "دریافت ها"}
          </h1>
          <p className="text-gray-600 text-center text-sm">
            {RefferalForm && "مدیریت و پیگیری ارجاع های کاربران"}
            {RefferalTable && "مدیریت و پیگیری ارجاع های کاربران"}
            {workflow && "مدیریت و پیگیری کارگزاری های کاربران"}
            {table && "مدیریت و پیگیری دریافت های کاربران"}
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

export default ReceivePage;
