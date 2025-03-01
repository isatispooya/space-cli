import { Outlet } from "react-router-dom";
import { MainLayout } from "../../../layouts";
import { Toolbar } from "../../../components";
import { LuPlus } from "react-icons/lu";

const ConversationMainPage = () => {
  const toolbarButtons = [
    {
      icon: LuPlus,
      text: "گفتگو جدید",
      permission: ["add_correspondence"],
      path: "create",
    },
    {
      icon: LuPlus,
      text: "گفتگو ها",
      permission: ["add_correspondence"],
      path: "chats",
    },

  ];
  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col">
        <div className="bg-white p-3">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-1">
            سامانه مدیریت گفتگو
          </h1>
          <p className="text-gray-600 text-center text-sm">
            مدیریت و پیگیری گفتگو های سازمانی به صورت هوشمند
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

export default ConversationMainPage;
