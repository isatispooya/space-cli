import { IconType } from "react-icons";
import {
  FaBuilding,
  FaEnvelope,
  FaHome,
  FaPhone,
  // FaUser,
  FaUserTie,
} from "react-icons/fa";

export interface MenuItem {
  title?: string;
  path?: string;
  icon?: IconType;
  submenu?: MenuItem[];
  codename?: string;
}

export const menuItems: MenuItem[] = [
  {
    title: "خانه",
    icon: FaHome,
    codename: "allow_any",
    submenu: [{ title: "داشبورد", path: "/", codename: "allow_any" }],
  },
  // {
  //   title: "حساب کاربری",
  //   icon: FaUser,
  //   codename: "user_account",
  //   submenu: [
  //     { title: "پروفایل", path: "/profile", codename: "user_profile" },
  //     {
  //       title: "تنظیمات",
  //       codename: "user_settings",
  //       submenu: [
  //         {
  //           title: "تنظیمات حساب",
  //           path: "/settings/account",
  //           codename: "account_settings",
  //         },
  //         {
  //           title: "تنظیمات امنیتی",
  //           path: "/settings/security",
  //           codename: "security_settings",
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    title: "امور سهامدارن",
    icon: FaUserTie,

    submenu: [
      {
        title: "مدیریت سهام",
        path: "/shareholders/table",
        codename: "view_shareholders",
      },
      {
        title: "نقل و انتقال  سهام",
        codename: "view_stocktransfer",
        path: "/transferstock/table",
      },
      {
        title: "مدیریت حق تقدم",
        codename: "add_precedence",
        path: "/precendence/table",
      },
      {
        title: "نقل و انتقال حق تقدم",
        codename: "view_displacementprecedence",
        path: "/displacement/table",
      },
      {
        title: "پرداخت حق تقدم",
        codename: "view_paid_precedence",
        path: "/purchacePrecendence/table",
      },
      {
        title: "تبدیل حق تقدم به سهم",
        codename: "view_capitalincreasepayment",
        path: "/capital/table",
      },
      {
        title: "پذیره نویسی",
        codename: "unused_precedence_process",
        path: "/underwriting/table",
      },
    ],
  },
  {
    title: "امور شرکت‌ها",
    path: "/companies",
    icon: FaBuilding,
    codename: "view_company",
    submenu: [
      {
        title: "مدیریت شرکت‌ها",
        path: "/companies",
        codename: "view_company",
      },
    ],
  },
  {
    title: "مکاتبات",
    path: "/correspondence",
    icon: FaEnvelope,
    codename: "view_correspondence",
    submenu: [
      {
        title: "مدیریت مکاتبات",
        path: "/correspondence",
        codename: "view_correspondence",
      },
    ],
  },
  {
    title: "مدیریت نقش‌ها",
    path: "/positions",
    icon: FaUserTie,
    codename: "view_position",
    submenu: [
      {
        title: "مدیریت نقش ها",
        path: "/positions",
        codename: "view_position",
      },
    ],
  },
  {
    title: "راه‌های ارتباطی",
    path: "/contact",
    codename: "allow_any",
    icon: FaPhone,
    submenu: [{ title: "تماس با ما", path: "/contact" , codename: "allow_any" }],
  },
  {
    title: "دسترسی ها",
    path: "/permissions",
    icon: FaUserTie,
    codename: "view_permission",
    submenu: [
      {
        title: "مدیریت دسترسی ها",
        path: "/permissions",
        codename: "view_permission",
      },
    ],
  },
  {
    title: "گروه ها",
    path: "/groups",
    icon: FaUserTie,
    codename: "view_group",
    submenu: [
      { title: "مدیریت گروه ها", path: "/groups", codename: "view_group" },
    ],
  },
  {
    title: " کاربران دعوت شده",
    path: "/marketing",
    icon: FaUserTie,
    codename: "allow_any",
    submenu: [
      {
        title: "مدیریت کاربران دعوت شده",
        path: "/marketing",
        codename: "allow_any",
      },
    ],
  },
];
