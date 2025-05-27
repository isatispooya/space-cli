import { MainLayout } from "../../../../layouts";

import { Toolbar } from "../../../../components";
import { Outlet } from "react-router-dom";
import { MdOutlineCreate } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { AiOutlineInbox } from "react-icons/ai";
import { BsMailbox } from "react-icons/bs";
import { LuSendHorizontal } from "react-icons/lu";
import { RiSendPlaneLine } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
const SentPage = () => {
  const toolbarButtons = [
    {
      icon: MdOutlineCreate,
      text: "ایجاد نامه داخلی",
      permission: ["allow_any"],
      path: "form",
    },
    {
      icon: FiExternalLink,
      text: "ایجاد نامه خارجی",
      permission: ["allow_any"],
      path: "Outform",
    },
    {
      icon: AiOutlineInbox,
      text: "نامه ها ی دریافتی داخلی",
      permission: ["allow_any"],
      path: "receive-table",
    },
    {
      icon: BsMailbox,
      text: "نامه ها ی دریافتی خارجی",
      permission: ["allow_any"],
      path: "Outreceive-table",
    },
    {
      icon: LuSendHorizontal,
      text: "نامه های ارسالی داخلی",
      permission: ["allow_any"],
      path: "table",
    },
    {
      icon: RiSendPlaneLine,
      text: "نامه های ارسالی خارجی",
      permission: ["allow_any"],
      path: "Outtable",
    },
    {
      icon: IoDocumentTextOutline,
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
