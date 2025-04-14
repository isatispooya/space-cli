import { MainLayout } from "../../../../layouts";
import { Toolbar } from "../../../../components";

import { VscGitStashApply } from "react-icons/vsc";

const ReceivePage = () => {
  const toolbarButtons = [
    {
      icon: VscGitStashApply,
      text: "نامه های دریافتی",
      permission: ["allow_any"],
      path: "sent",
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
          <div className="flex-grow px-6 bg-white"></div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReceivePage;
