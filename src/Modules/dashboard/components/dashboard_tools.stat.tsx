import { motion } from "framer-motion";
import { FaTools } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import Moshtrak from "../../../assets/moshtrak.png";
import termeh from "../../../assets/termeh.png";
import khatam from "../../../assets/khatam.png";
import FrashamLogo from "../../../assets/farasahm.png";
import exir from "../../../assets/exsir.png";
import Card from "../../../components/cards/card";
import WaveEffect from "../../../ui/wave";
import "../../../ui/wave.css";
import toast from "react-hot-toast";
import usePostFaraSahm from "../hooks/useFarasahm";
import { useUserPermissions } from "@/Modules/permissions";
const tools = [
  {
    id: "fara-sahm",
    img: FrashamLogo,
    title: " فراسهم",
    color: "text-blue-600",
    hoverColor: "hover:bg-blue-100",
    isActive: true,
    link: "https://farasahm.fidip.ir/",
    codename: "can_connect_to_farasahm",
  },
  {
    id: "calculator",
    img: khatam,
    title: "صندوق سرمایه گذاری خاتم",
    color: "text-gray-400",
    hoverColor: "",
    isActive: false,
    link: "#",
    isImage: true,
  },
  {
    id: "investment",
    img: exir,
    title: "صندوق سرمایه گذاری اکسیر",
    color: "text-gray-400",
    hoverColor: "",
    isActive: false,
    link: "#",
    isImage: true,
  },
  {
    id: "accounting",
    img: termeh,
    title: "صندوق سرمایه گذاری ترمه ",
    color: "text-gray-400",
    hoverColor: "",
    isActive: false,
    link: "#",
    isImage: true,
  },
  {
    id: "report",
    img: Moshtrak,
    title: "صندوق سرمایه گذاری مشترک ",
    color: "text-gray-400",
    hoverColor: "",
    isActive: false,
    link: "#",
    isImage: true,
  },
];

const DashboardToolsStat = () => {
  const navigate = useNavigate();
  const { mutate: faraSahm } = usePostFaraSahm();
  const { data: Permissions } = useUserPermissions();

  const hasPermission =
    Array.isArray(Permissions) &&
    Permissions.some((perm) => perm.codename === tools[0].codename);
  console.log(hasPermission);

  const handleClick = () => {
    if (!hasPermission) return;

    faraSahm(undefined, {
      onSuccess: (response) => {
        const faraSahmLink = `https://farasahm.fidip.ir/loginspace/${response.cookie}/`;
        window.open(faraSahmLink, "_blank");
      },
      onError: (error) => {
        toast.error(`خطایی رخ داده است: ${error.message}`);
        window.location.href = "https://farasahm.fidip.ir/";
      },
    });
  };

  const content = (
    <div className="flex flex-col h-full w-full p-4">
      <div className="flex items-center mb-10">
        <FaTools className="w-5 h-5 text-gray-700" />
        <h3 className="text-sm text-[#2D3748] font-bold font-iranSans mr-2">
          ابزار های مالی
        </h3>
      </div>

      <div className="flex-grow flex flex-col mb-8 ">
        <p className="text-lg font-bold text-[#2D3748] font-iranSans text-center">
          ابزارهای مدیریت مالی
        </p>
        <p className="text-xs text-gray-600 mt-1 font-iranSans text-center">
          مدیریت هوشمند دارایی‌ها و سرمایه‌گذاری
        </p>
      </div>

      <div className="mt-auto relative z-10 w-full ">
        <div className="flex items-center justify-between gap-2 bg-gray-50 p-2 rounded-lg">
          {tools.map((tool) => (
            <motion.button
              key={tool.id}
              whileHover={
                tool.isActive && !(tool.id === "fara-sahm" && !hasPermission)
                  ? { scale: 1.05 }
                  : {}
              }
              whileTap={
                tool.isActive && !(tool.id === "fara-sahm" && !hasPermission)
                  ? { scale: 0.95 }
                  : {}
              }
              data-tooltip-id={tool.id}
              data-tooltip-content={tool.title}
              onClick={() => {
                if (!tool.isActive) return;
                if (tool.id === "fara-sahm") {
                  if (!hasPermission) return;
                  handleClick();
                } else {
                  navigate(tool.link);
                }
              }}
              className={`w-8 h-8 rounded-md flex items-center justify-center ${
                tool.isActive && !(tool.id === "fara-sahm" && !hasPermission)
                  ? tool.hoverColor
                  : "cursor-not-allowed bg-gray-100"
              } transition-colors duration-200`}
              disabled={
                !tool.isActive || (tool.id === "fara-sahm" && !hasPermission)
              }
            >
              <img src={tool.img} alt={tool.title} className="w-4 h-4" />

              <Tooltip
                id={tool.id}
                place="top"
                className="font-iranSans text-[10px] z-50"
              />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Card
      onClick={undefined}
      disableAnimation={true}
      className="relative bg-white rounded-xl shadow-md w-full h-full overflow-hidden transition-all duration-300 hover:shadow-xl wave-container"
      contentClassName="h-full p-0 flex flex-col"
      content={content}
      customStyles={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 0,
      }}
      padding="0"
      footerSlot={<WaveEffect color="dark" />}
    />
  );
};

export default DashboardToolsStat;
