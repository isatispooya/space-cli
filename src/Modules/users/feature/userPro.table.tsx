import { useUserPro } from "../hooks";
import { ColumnDefinition } from "tabulator-tables";
import { LoaderLg } from "../../../components";
import { userProType } from "../types";
import TabulatorTable from "../../../components/table/table.com";
import { CellComponent } from "tabulator-tables";

const UserProTable: React.FC = () => {
  const { data, isPending } = useUserPro();

  if (isPending) return <LoaderLg />;

  const closeAllMenus = () => {
    const existingMenus = document.querySelectorAll(".popup-menu");
    existingMenus.forEach((menu) => {
      document.body.removeChild(menu);
    });
  };

  const columns = (): ColumnDefinition[] => [
    {
      title: "نام",
      field: "first_name",
      headerFilter: true,
    },
    {
      title: "نام خانوادگی",
      field: "last_name",
      headerFilter: true,
    },
    {
      title: "کد ملی",
      field: "national_code",
      headerFilter: true,
    },
    {
      title: "شماره تماس",
      field: "phone_number",
      headerFilter: true,
    },
    {
      title: "سکه",
      field: "point_1",
      headerFilter: true,
      resizable: true,
    },
    {
      title: "بذر",
      field: "point_2",
      headerFilter: true,
      resizable: true,
    },
    {
      title: "ایمیل",
      field: "email",
      headerFilter: true,
    },
    {
      title: "شماره ثبت",
      field: "registration_number",
      headerFilter: true,
    },
    {
      title: "جنسیت",
      field: "gender",
      headerFilter: true,
      formatter: (cell) => (cell.getValue() === "M" ? "مرد" : "زن"),
    },
    {
      title: "تاریخ تولد",
      field: "birth_date",
      headerFilter: true,
    },
    {
      title: "محل تولد",
      field: "place_of_birth",
      headerFilter: true,
    },
    {
      title: "سن",
      field: "age",
      headerFilter: true,
    },
    {
      title: "شهر",
      field: "city",
      headerFilter: true,
    },
    {
      title: "عملیات",
      formatter: () => {
        return '<button class="action-btn">⋮</button>';
      },
      hozAlign: "center",
      headerSort: false,
      width: 60,
      cellClick: function (e: Event, cell: CellComponent) {
        e.stopPropagation();

        const existingMenu = document.querySelector(
          `.popup-menu[data-cell="${cell
            .getElement()
            .getAttribute("tabulator-field")}"]`
        );

        if (existingMenu) {
          closeAllMenus();
          return;
        }

        closeAllMenus();

        const menu = document.createElement("div");
        menu.className = "popup-menu";
        menu.setAttribute(
          "data-cell",
          cell.getElement().getAttribute("tabulator-field") || ""
        );

        customMenuItems.forEach((item) => {
          const menuItem = document.createElement("button");
          menuItem.className = "menu-item";
          menuItem.innerHTML = `${item.icon} ${item.label}`;
          menuItem.onclick = () => {
            item.action();
            closeAllMenus();
          };
          menu.appendChild(menuItem);
        });

        const rect = cell.getElement().getBoundingClientRect();
        menu.style.left = `${rect.left + window.scrollX}px`;
        menu.style.top = `${rect.bottom + window.scrollY}px`;

        document.body.appendChild(menu);

        const handleScroll = () => {
          closeAllMenus();
          window.removeEventListener("scroll", handleScroll);
        };
        window.addEventListener("scroll", handleScroll);

        setTimeout(() => {
          const closeMenu = (e: MouseEvent) => {
            if (!menu.contains(e.target as Node)) {
              closeAllMenus();
              document.removeEventListener("click", closeMenu);
              window.removeEventListener("scroll", handleScroll);
            }
          };
          document.addEventListener("click", closeMenu);
        }, 0);
      },
    },
  ];

  const mappedData = data?.map((item: userProType) => ({
    first_name: item.first_name,
    last_name: item.last_name,
    national_code: item.uniqueIdentifier,
    phone_number: item.mobile,
    email: item.email,
    registration_number: item.refrence_number,
    gender: item.gender,
    birth_date: item.birth_date,
    place_of_birth: item.place_of_birth,
    age: item.age,
    city: item.address?.city,
    point_1: item.points.point_1,
    point_2: item.points.point_2,
  }));

  const ExelData = (item: userProType) => ({
    نام: item.first_name,
    "نام خانوادگی": item.last_name,
    "کد ملی": item.national_code,
    "شماره تماس": item.phone_number,
    سکه: item.point_1,
    بذر: item.point_2,
    ایمیل: item.email,
    "شماره ثبت": item.registration_number,
    جنسیت: item.gender === "M" ? "مرد" : "زن",
    "تاریخ تولد": item.birth_date,
    "محل تولد": item.place_of_birth,
    سن: item.age,
    شهر: item.city,
  });

  const customMenuItems = [
    {
      label: "ویرایش",
      icon: "⚡",
      action: () => console.log("Custom action:"),
    },
  ];

  return (
    <div className="w-full bg-white shadow-xl rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="overflow-x-auto">
        <TabulatorTable
          data={mappedData || []}
          columns={columns()}
          title="اطلاعات کاربران"
          showActions={true}
          formatExportData={ExelData}
        />
      </div>
    </div>
  );
};

export default UserProTable;
