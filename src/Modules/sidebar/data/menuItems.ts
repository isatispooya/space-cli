import { IconType } from "react-icons";
import { FaBuilding, FaEnvelope, FaPhone, FaUserTie } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";

export interface MenuItem {
  title?: string;
  path?: string;
  icon?: IconType;
  submenu?: MenuItem[];
  codename?: string[];
  child?: MenuItem[];
}

export const menuItems: MenuItem[] = [
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
        codename: ["parent_user"],
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
      // {
      //   title: "مدیریت حق تقدم",
      //   codename: ["add_precedence", "precedence"],
      //   path: "/precendence/table",
      // },
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
      // {
      //   title: "تبدیل حق تقدم به سهم",
      //   codename: ["view_capitalincreasepayment"],
      //   path: "/capital/table",
      // },
      {
        title: "پذیره نویسی",
        codename: ["unused_precedence_process"],
        path: "/underwriting/table",
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
    ],
  },
  {
    title: "مکاتبات",
    path: "/correspondence",
    icon: FaEnvelope,
    codename: ["view_correspondence"],
    submenu: [
      {
        title: "مدیریت مکاتبات",
        path: "/correspondence",
        codename: ["view_correspondence"],
      },
    ],
  },

  // {
  //   title: "دسترسی ها",
  //   path: "/permissions",
  //   icon: FaUserTie,
  //   codename: ["view_permission"],
  //   submenu: [
  //     {
  //       title: "مدیریت دسترسی ها",
  //       path: "/permissions/table",
  //       codename: ["view_permission"],
  //     },
  //   ],
  // },

  // {
  //   title: "مدیریت نقش‌ها",
  //   path: "/positions",
  //   icon: FaUserTie,
  //   codename: ["view_position"],
  //   submenu: [
  //     {
  //       title: "مدیریت نقش ها",
  //       path: "/positions/table",
  //       codename: ["view_position"],
  //     },
  //   ],
  // },

  // {
  //   title: "گروه ها",
  //   path: "/groups",
  //   icon: FaUserTie,
  //   codename: ["view_group"],
  //   submenu: [
  //     { title: "مدیریت گروه ها", path: "/groups", codename: ["view_group"] },
  //   ],
  // },
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
  // {
  //   title: "تردد",
  //   path: "/timeflow",
  //   icon: FaClockRotateLeft,
  //   codename: ["position"],
  //   submenu: [
  //     {
  //       title: "گزارش تردد",
  //       path: "/timeflow/table",
  //       codename: ["position"],
  //     },
  //   ],
  // },

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
