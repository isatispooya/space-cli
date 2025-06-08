import { MainLayout } from "../../../../layouts";
import { Toolbar } from "../../../../components";
import { BsMailbox } from "react-icons/bs";

import { Outlet, useLocation } from "react-router-dom";
import { RiSendPlaneLine } from "react-icons/ri";
import { LuSendHorizontal } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineInbox } from "react-icons/ai";
import { MdOutlineCreate } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";

const ReceivePage = () => {
  const location = useLocation();
  const path = location.pathname;

  const table = path === "/letter/receive-table";
  const workflow = path.startsWith("/letter/receive-workflow/");
  const RefferalTable = path.startsWith("/letter/refferal-table/");
  const RefferalForm = path.startsWith("/letter/receive-refferal/");

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
            {RefferalForm && "ارجاع ها"}
            {RefferalTable && "لیست ارجاعات"}
            {workflow && "گردش کار ها"}
            {table && "نامه ها دریافتی داخلی"}
          </h1>
          <p className="text-gray-600 text-center text-sm">
            {RefferalForm && "مدیریت و پیگیری ارجاع های کاربران"}
            {RefferalTable && "مدیریت و پیگیری ارجاع های کاربران"}
            {workflow && "مدیریت و پیگیری گردش کار های کاربران"}
            {table && "مدیریت و پیگیری  نامه ها کاربران"}
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
