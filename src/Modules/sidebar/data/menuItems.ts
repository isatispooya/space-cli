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
    codename: "view_shareholders",
    submenu: [
      {
        title: "لیست سهامداران",
        path: "/shareholders/table",
        codename: "view_shareholders",
      },
      {
        title: "مدیریت سهام",
        codename: "stock_management",
        submenu: [
          {
            title: "ایجاد سهامدار",
            path: "/shareholders/create",
            codename: "add_shareholders",
          },
          {
            title: "ویرایش سهامدار",
            path: "/shareholders/update",
            codename: "update_shareholders",
          },
          {
            title: "لیست جابجایی",
            path: "/transferstock/table",
            codename: "stock_transfer_list",
          },
          {
            title: "ایجاد جابجایی",
            path: "/transferstock/create",
            codename: "create_stock_transfer",
          },
          {
            title: "ویرایش جابجایی",
            path: "/transferstock/update",
            codename: "update_stock_transfer",
          },
        ],
      },
      {
        title: "مدیریت سود",
        codename: "profit_management",
        submenu: [
          {
            title: "لیست سود پرداختی",
            path: "/capital/table",
            codename: "paid_profit_list",
          },
          {
            title: "ایجاد سود پرداختی",
            path: "/capital/create",
            codename: "create_paid_profit",
          },
        ],
      },
      {
        title: "حق تقدم",
        codename: "add_precedence",
        submenu: [
          {
            title: "لیست حق تقدم",
            path: "/precendence/table",
            codename: "precedence_list",
          },
          {
            title: "ایجاد حق تقدم",
            path: "/precendence/create",
            codename: "create_precedence",
          },
          {
            title: "جابه جایی حق تقدم",
            path: "/displacement/table",
            codename: "view_displacementprecedence",
          },
          {
            title: "ایجاد جابه جایی حق تقدم",
            path: "/displacement/create",
            codename: "add_displacementprecedence",
          },
          {
            title: "ویرایش جابه جایی حق تقدم",
            path: "/displacement/update",
            codename: "update_displacementprecedence",
          },
        ],
      },
      {
        title: "خرید حق تقدم  ",
        codename: "precedence_purchase",
        submenu: [
          {
            title: "لیست حق تقدم خرید",
            path: "/purchacePrecendence/table",
            codename: "purchase_precedence_list",
          },
          {
            title: "ایجاد حق تقدم خرید",
            path: "/purchacePrecendence/create",
            codename: "create_purchase_precedence",
          },
        ],
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
