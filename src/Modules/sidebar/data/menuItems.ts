import { IconType } from "react-icons";
import {
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaUserTie,
} from "react-icons/fa";

export interface MenuItem {
  title: string;
  path?: string;
  icon?: IconType;
  submenu?: MenuItem[];
  codename?: string;
}

export const menuItems: MenuItem[] = [
  {
    title: "حساب کاربری",
    icon: FaUser,
    codename: "user_account",
    submenu: [
      { title: "پروفایل", path: "/profile", codename: "user_profile" },
      {
        title: "تنظیمات",
        codename: "user_settings",
        submenu: [
          {
            title: "تنظیمات حساب",
            path: "/settings/account",
            codename: "account_settings",
          },
          {
            title: "تنظیمات امنیتی",
            path: "/settings/security",
            codename: "security_settings",
          },
        ],
      },
    ],
  },
  {
    title: "امور سهامدارن",
    icon: FaUserTie,
    submenu: [
      {
        title: "مدیریت سهامداران",
        path: "/shareholders",
        codename: "view_shareholders",
      },
      {
        title: "مدیریت سهام",
        codename: "view_stocktransfer",
        path: "/transferstock",
      },
      {
        title: "مدیریت سود",
        codename: "view_capitalincreasepayment",
        path: "/capital",
      },
      {
        title: "مدیریت حق تقدم",
        codename: "add_precedence",
        path: "/precedence",
      },
      {
        title: "نقل و انتقال حق تقدم",
        codename: "view_displacement",
        path: "/displacement",
      },
       {
        title: "پرداخت حق تقدم",
        codename: "view_paid_precedence",
        path: "/purchacePrecendence",
      },
    ],
  },
  
  {
    title: "مدیریت شرکت‌ها",
    path: "/companies",
    icon: FaBuilding,
    codename: "company_management",
    submenu: [
      {
        title: "لیست شرکت‌ها",
        path: "/companies/table",
        codename: "companies_list",
      },
      {
        title: "افزودن شرکت",
        path: "/companies/create",
        codename: "create_company",
      },
    ],
  },
  {
    title: "مکاتبات",
    path: "/correspondence",
    icon: FaEnvelope,
    codename: "correspondence",
    submenu: [
      {
        title: "لیست مکاتبات",
        path: "/correspondence/table",
        codename: "correspondence_list",
      },
      {
        title: "ایجاد مکاتبه",
        path: "/correspondence/create",
        codename: "create_correspondence",
      },
    ],
  },
  {
    title: "مدیریت نقش‌ها",
    path: "/positions",
    icon: FaUserTie,
    codename: "role_management",
    submenu: [
      { title: "نقش‌ها", path: "/positions/table", codename: "roles_list" },
      {
        title: "ایجاد نقش",
        path: "/positions/create",
        codename: "create_role",
      },
    ],
  },
  {
    title: "تماس",
    path: "/contact",
    icon: FaPhone,
    codename: "contact",
    submenu: [
      { title: "پیام‌ها", path: "/contact/messages", codename: "messages" },
      { title: "تماس با ما", path: "/contact/us", codename: "contact_us" },
    ],
  },
  {
    title: "دسترسی ها",
    path: "/permissions",
    icon: FaUserTie,
    codename: "permissions",
    submenu: [
      {
        title: "لیست دسترسی ها",
        path: "/permissions/table",
        codename: "permissions_list",
      },
      {
        title: "ایجاد,ویرایش دسترسی ها",
        path: "/permissions/create",
        codename: "manage_permissions",
      },
    ],
  },
  {
    title: "گروه ها",
    path: "/groups",
    icon: FaUserTie,
    codename: "groups",
    submenu: [
      { title: "لیست گروه ها", path: "/groups/table", codename: "groups_list" },
      { title: "ایجاد گروه", path: "/groups/create", codename: "create_group" },
    ],
  },
];
