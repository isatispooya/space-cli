import { useUserPro } from "../hooks";
import { ColumnDefinition } from "tabulator-tables";
import { LoaderLg } from "../../../components";
import { userProType } from "../types";
import TabulatorTable from "../../../components/table/table.com";

const UserProTable: React.FC = () => {
  const { data, isPending } = useUserPro();

  if (isPending) return <LoaderLg />;

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
    // ... more menu items
  ];

  return (
    <div className="w-full bg-white shadow-xl rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="overflow-x-auto">
        <TabulatorTable
          data={mappedData || []}
          columns={columns()}
          menuItems={customMenuItems}
          title="اطلاعات کاربران"
          showActions={true}
          formatExportData={ExelData}
        />
      </div>
    </div>
  );
};

export default UserProTable;
