import {
  FaUser,
  FaBuilding,
  FaEnvelope,
  FaUserTie,
  FaPhone,
} from "react-icons/fa";

export interface MenuItem {
  title: string;
  path?: string;
  icon?: any;
  submenu?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    title: "حساب کاربری",
    icon: FaUser,
    submenu: [
      { title: "پروفایل", path: "/profile" },
      { 
        title: "تنظیمات",
        submenu: [
          { title: "تنظیمات حساب", path: "/settings/account" },
          { title: "تنظیمات امنیتی", path: "/settings/security" }
        ]
      },
    ],
  },
  {
    title: "امور سهامدارن",
    icon: FaUserTie,
    submenu: [
      { title: "لیست سهامداران", path: "/shareholders/table" },
      { 
        title: "مدیریت سهام",
        submenu: [
          { title: "ایجاد سهامدار", path: "/shareholders/create" },
          { title: "لیست جابجایی", path: "/transferstock/table" },
          { title: "ایجاد جابجایی", path: "/transferstock/create" },
        ]
      },
      {
        title: "مدیریت سود",
        submenu: [
          { title: "لیست سود پرداختی", path: "/capital/table" },
          { title: "ایجاد سود پرداختی", path: "/capital/create" },
        ]
      },
      {
        title: "حق تقدم",
        submenu: [
          { title: "لیست حق تقدم", path: "/precendence/table" },
          { title: "ایجاد حق تقدم", path: "/precendence/create" },
          { title: "جابه جایی حق تقدم", path: "/displacement/table" },
          { title: "ایجاد جابه جایی حق تقدم", path: "/displacement/create" },
        ]
      }
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
    title: "دسترسی ها",
    path: "/permissions",
    icon: FaUserTie,
    submenu: [
      { title: "لیست دسترسی ها", path: "/permissions/table" },
      { title: "ایجاد,ویرایش دسترسی ها", path: "/permissions/create" },
    ],
  },
  {
    title: "گروه ها",
    path: "/groups",
    icon: FaUserTie,
    submenu: [
      { title: "لیست گروه ها", path: "/groups/table" },
      { title: "ایجاد گروه", path: "/groups/create" },
    ],
  },
];
