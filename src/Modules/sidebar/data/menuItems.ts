export const menuItems = [
  {
    title: "حساب کاربری",
    path: "/account",
    submenu: [
      { title: "پروفایل", path: "/account/profile" },
      { title: "تنظیمات", path: "/account/settings" },
    ],
  },
  {
    title: "مدیریت شرکت‌ها",
    path: "/companies",
    submenu: [
      { title: "لیست شرکت‌ها", path: "/companies/list" },
      { title: "افزودن شرکت", path: "/companies/add" },
    ],
  },
  {
    title: "مکاتبات",
    path: "/correspondence",
    submenu: [
      { title: "صندوق ورودی", path: "/correspondence/inbox" },
      { title: "ارسال جدید", path: "/correspondence/new" },
    ],
  },
  {
    title: "مدیریت نقش‌ها",
    path: "/positions",
    submenu: [
      { title: "نقش‌ها", path: "/positions/list" },
      { title: "دسترسی‌ها", path: "/positions/permissions" },
    ],
  },
  {
    title: "تماس",
    path: "/contact",
    submenu: [
      { title: "پیام‌ها", path: "/contact/messages" },
      { title: "تماس با ما", path: "/contact/us" },
    ],
  },
];
