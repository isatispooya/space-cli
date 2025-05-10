import { useUserPro } from "../hooks";
import { ColumnDefinition } from "tabulator-tables";
import { LoaderLg } from "../../../components";
import { UserProType } from "../types";
import TabulatorTable from "../../../components/table/table.com";
import { CellComponent } from "tabulator-tables";
import moment from "moment-jalaali";
import { useNavigate } from "react-router-dom";

const UserProTable: React.FC = () => {
  const { data, isPending } = useUserPro.useUsers();
  const navigate = useNavigate();

  // Function to handle navigation to the view page
  const handleView = (id: number) => {
    navigate(`/users/view/${id}`);
  };

  // Show loader if data is still loading
  if (isPending) return <LoaderLg />;

  // Show message if no data is available
  if (!data || data.length === 0) {
    return <div>هیچ داده‌ای وجود ندارد.</div>;
  }

  // Function to close all open popup menus
  const closeAllMenus = () => {
    const existingMenus = document.querySelectorAll(".popup-menu");
    existingMenus.forEach((menu) => {
      document.body.removeChild(menu);
    });
  };

  // Define table columns
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
      formatter: (cell : CellComponent) => {
        const gregorianDate = cell.getValue();
        return gregorianDate
          ? moment(gregorianDate).format("jYYYY/jMM/jDD")
          : "";
      },
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

        // Get the row data for the clicked cell
        const rowData = cell.getRow().getData() as UserProType;

        // Close any existing menus
        closeAllMenus();

        // Dynamically create the menu with the row's ID
        const menu = document.createElement("div");
        menu.className = "popup-menu";
        menu.setAttribute(
          "data-cell",
          cell.getElement().getAttribute("tabulator-field") || ""
        );

        const customMenuItems = [
          {
            label: "ویرایش",
            icon: "⚡",
            action: () => console.log("Custom action:", rowData.id),
          },
          {
            label: "نمایش",
            icon: "⚡",
            action: () => handleView(rowData.id),
          },
        ];

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

  // Map the data to match the column definitions
  const mappedData = data?.map((item: UserProType) => ({
    id: item.id,
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

  // Format data for Excel export
  const ExelData = (item: UserProType) => ({
    نام: item.first_name,
    "نام خانوادگی": item.last_name,
    "کد ملی": item.national_code,
    "شماره تماس": item.phone_number,
    سکه: item.point_1,
    بذر: item.point_2,
    ایمیل: item.email,
    "شماره ثبت": item.registration_number ?? "",
    جنسیت: item.gender === "M" ? "مرد" : "زن",
    "تاریخ تولد": item.birth_date,
    "محل تولد": item.place_of_birth,
    سن: item.age,
    شهر: item.city,
  });

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
