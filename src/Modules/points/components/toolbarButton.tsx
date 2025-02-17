import { BiTask } from "react-icons/bi";
import { FaCoins, FaGift } from "react-icons/fa";
import { RiFileList3Line } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

export const toolbarButtons = [
  {
    icon: FaCoins,
    text: " امتیازات من",
    permission: ["allow_any"],
    path: "privileges",
  },
  {
    icon: BiTask,
    text: "ماموریت ها",
    permission: ["allow_any"],
    path: "missions",
  },
  {
    icon: FaGift,
    text: "هدایا",
    permission: ["allow_any"],
    path: "gifts",
  },
  {
    icon: RiFileList3Line,
    text: "درخواست های من",
    permission: ["allow_any"],
    path: "requests",
  },
  {
    icon: FaUser,
    text: "کراد",
    permission: ["can_edit_point_crowd"],
    path: "crowdpoints",
  },
];
