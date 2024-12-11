import {
  FaUser,
  FaBuilding,
  FaEnvelope,
  FaUserTie,
  FaPhone,
} from "react-icons/fa";

export const menuItems = [
  {
    title: "حساب کاربری",
    path: "/account",
    icon: FaUser,
    submenu: [
      { title: "پروفایل", path: "/profile" },
      { title: "تنظیمات", path: "/settings" },
    ],
  },
  {
    title: "مدیریت شرکت‌ها",
    path: "/companies",
    icon: FaBuilding,
    submenu: [
      { title: "لیست شرکت‌ها", path: "/companies/table" },
      { title: "افزودن شرکت", path: "/companies/create" },
    ],
  },
  {
    title: "مکاتبات",
    path: "/correspondence",
    icon: FaEnvelope,
    submenu: [
      { title: "لیست مکاتبات", path: "/correspondence/table" },
      { title: "ایجاد مکاتبه", path: "/correspondence/create" },
    ],
  },
  {
    title: "مدیریت نقش‌ها",
    path: "/positions",
    icon: FaUserTie,
    submenu: [
      { title: "نقش‌ها", path: "/positions/table" },
      { title: "ایجاد نقش", path: "/positions/create" },
    ],
  },
  {
    title: "تماس",
    path: "/contact",
    icon: FaPhone,
    submenu: [
      { title: "پیام‌ها", path: "/contact/messages" },
      { title: "تماس با ما", path: "/contact/us" },
    ],
  },
  {
    title: "سهامداران",
    path: "/shareholders",
    icon: FaUserTie,
    submenu: [
      { title: "لیست سهامداران", path: "/shareholders/table" },
      { title: "جابجایی سهامدار", path: "/shareholders/transfer" },
    ],
  },
];
