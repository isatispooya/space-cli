import { IconType } from "react-icons";
import {
  FaBuilding,
  FaCalculator,
  FaEnvelope,
  FaPhone,
  FaUserTie,
} from "react-icons/fa";
import { FaClockRotateLeft, FaHandshakeAngle } from "react-icons/fa6";

export interface MenuItemType {
  title?: string;
  path?: string;
  icon?: IconType;
  submenu?: MenuItemType[];
  codename?: string[];
  child?: MenuItemType[];
}

export const menuItems: MenuItemType[] = [
  {
    title: "کاربران",
    icon: FaUserTie,
    codename: ["view_user"],
    submenu: [
      {
        title: "کاربران",
        path: "/users/table",
        codename: ["view_user"],
      },
      {
        title: "مدیریت نقش ها",
        path: "/positions/table",
        codename: ["view_position"],
      },
      {
        title: "مدیریت گروه ها",
        path: "/groups",
        codename: ["view_group"],
      },
      {
        title: " تردد",
        path: "/timeflow/users-timeflows",
        codename: ["position"],
      },
      {
        title: "مدیریت دسترسی ها",
        path: "/permissions/table",
        codename: ["view_permission"],
      },
      {
        title: "مدیریت شیفت ها",
        path: "/shifts/table",
        codename: ["parent_user", "view_shift"],
      },
    ],
  },
  {
    title: "ابزار های مالی",
    icon: FaCalculator,
    codename: ["allow_any"],
    path: "/finTools",
    submenu: [
      {
        title: "میزکار مالی",
        path: "/finTools",
        codename: ["allow_any"],
      },

    ],
  },
  {
    title: "امور سهامدارن",
    icon: FaUserTie,

    submenu: [
      {
        title: "مدیریت سهام",
        path: "/shareholders/table",
        codename: ["shareholder", "view_shareholders", "add_precedence"],
      },
      {
        title: "نقل و انتقال  سهام",
        codename: ["view_stocktransfer"],
        path: "/transferstock/table",
      },
      {
        title: "نقل و انتقال حق تقدم",
        codename: ["view_displacementprecedence"],
        path: "/displacement/table",
      },
      {
        title: "پرداخت حق تقدم",
        codename: ["view_paid_precedence"],
        path: "/purchacePrecendence/table",
      },
      {
        title: "پذیره نویسی",
        codename: ["unused_precedence_process"],
        path: "/underwriting/table",
      },
    ],
  },
  {
    title: "مشاوره",
    path: "/consultation",
    icon: FaHandshakeAngle,
    codename: ["allow_any"],
    submenu: [
      {
        title: "درخواست های مشاوره",
        path: "/consultation",
        codename: ["allow_any"],
      },
      {
        title: "مدیریت مشاوره",
        path: "/admin/table",
        codename: ["can_be_consultant"],
      },
    ],
  },
  {
    title: "امور شرکت‌ها",
    path: "/companies",
    icon: FaBuilding,
    codename: ["view_company"],
    submenu: [
      {
        title: "مدیریت شرکت‌ها",
        path: "/companies",
        codename: ["view_company"],
      },
      {
        title: "مدیریت شرکت‌ها در سامانه رسمیو",
        path: "/companies/companyrasmio",
        codename: ["admin_company_rasmio"],
      },
    ],
  },
  {
    title: "مکاتبات",

    icon: FaEnvelope,
    codename: ["allow_any"],
    submenu: [
      {
        title: "گفتگو",
        path: "/messenger",
        codename: ["allow_any"],
      },
      {
        title: "نامه ها",
        path: "/letter/form",
        codename: ["allow_any"],
      },
    ],
  },
  {
    title: "همکاری با ما",
    path: "/employments",
    icon: FaUserTie,
    codename: ["allow-anyy"],
    submenu: [
      {
        title: "فرصت های همکاری با ما",
        path: "/employments/table",
        codename: ["allow_anyy"],
      },
    ],
  },
  {
    title: "فرایند استخدامی",
    path: "/employmentsprocess",
    icon: FaUserTie,
    codename: ["zahra"],
    submenu: [
      {
        title: "فرایند های",
        path: "/employmentsprocess/table",
        codename: ["zahra"],
      },
    ],
  },
  {
    title: "کارگزاری بیمه",
    path: "/insurance",
    icon: FaClockRotateLeft,
    codename: ["allow_any"],
    submenu: [
      {
        title: "مدیریت درخواست بیمه ",
        path: "/insurance/table",
        codename: ["add_insurancename"],
      },
      {
        title: "خرید بیمه نامه",
        path: "/requestinsurance/table",
        codename: ["allow_any"],
      },
    ],
  },
  {
    title: "باشگاه ایساتیس",
    path: "/invitation",
    icon: FaUserTie,
    codename: ["allow_any"],
    submenu: [
      {
        title: " کاربران دعوت شده",
        path: "/invitation",
        codename: ["allow_any"],
      },
      {
        title: "امتیازات",
        path: "/points/privileges",
        codename: ["position"],
      },
      {
        title: "رفاهی",
        path: "/rewards/table",
        codename: ["position"],
      },
    ],
  },
  {
    title: "راه‌های ارتباطی",
    path: "/contact",
    codename: ["allow_any"],
    icon: FaPhone,
    submenu: [
      { title: "تماس با ما", path: "/contact", codename: ["allow_any"] },
    ],
  },
];
