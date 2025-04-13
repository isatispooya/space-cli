import "moment/locale/fa";
import moment from "moment-jalaali";
import { TabulatorTable } from "../../../../components";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useConsultingReserveTurnUser from "../../hooks/admin/useConsultingReserveTurnUser";
import { useUserData } from "@/Modules/users/hooks";
import { UserData } from "../../types/consultation_request.type";

interface CellComponent {
  getElement: () => HTMLElement;
  getRow: () => { getData: () => ConsultationRequest };
}

interface ConsultationRequest {
  id: number;
  patient_name: string;
  doctor_name: string;
  date: string;
  time: string;
  status: string;
  speciality: string;
  price: string;
}

const AdminConsultationRequestTable = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } =
    useConsultingReserveTurnUser.useGetConsultingReserveTurnUser();
  const { data: usersData } = useUserData();

  const mappedData = useMemo(() => {
    if (!data) return [];

    return data.map((item) => {
      const doctor = usersData?.find((user: UserData) => user.id === Number(item.expert));
      
      return {
        id: item.id,
        patient_name: `${item.counseling_requester.first_name} ${item.counseling_requester.last_name}`,
        doctor_name: doctor
          ? `${doctor.first_name} ${doctor.last_name}`
          : "تعیین نشده",
        date: item.date ? moment(item.date).format('jYYYY/jMM/jDD') : "تعیین نشده",
        time: item.date
          ? moment(item.date).format('HH:mm')
          : "تعیین نشده",
        status:
          item.status_of_turn === "reserved"
            ? "رزرو شده"
            : item.status_of_turn === "completed"
            ? "تکمیل شده"
            : item.status_of_turn === "cancelled"
            ? "لغو شده"
            : item.status_of_turn === "open"
            ? "باز"
            : item.status_of_turn,
        speciality: item.consultant.title,
        price: item.consultant.price.toLocaleString("fa-IR") + " ریال",
      };
    });
  }, [data, usersData]);

  if (isLoading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <div>خطا در دریافت اطلاعات</div>;
  }

  const closeAllMenus = () => {
    const menus = document.querySelectorAll(".popup-menu");
    menus.forEach((menu) => menu.remove());
  };


  const columns = () => [
    { title: "نام بیمار", field: "patient_name", headerFilter: true },
    { title: "نام پزشک", field: "doctor_name", headerFilter: true },
    { title: "تاریخ", field: "date", headerFilter: true },
    { title: "ساعت", field: "time", headerFilter: true },
    { title: "وضعیت", field: "status", headerFilter: true },
    { title: "تخصص", field: "speciality", headerFilter: true },
    { title: "هزینه", field: "price", headerFilter: true },
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

        const rowData = cell.getRow().getData();

        closeAllMenus();

        const menu = document.createElement("div");
        menu.className = "popup-menu";
        menu.setAttribute(
          "data-cell",
          cell.getElement().getAttribute("tabulator-field") || ""
        );

        const customMenuItems = [
          {
            label: "تکمیل اطلاعات",
            icon: "⚡",
            action: () => handleEditClick(rowData.id),
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

  const ExelData = (item: ConsultationRequest) => {
    return {
      نام_بیمار: item.patient_name,
      نام_پزشک: item.doctor_name,
      تاریخ_و_ساعت: item.date,
      وضعیت: item.status,
      تخصص: item.speciality,
      هزینه: item.price,
    };
  };

  const handleEditClick = (id: number) => {
    navigate(`/admin/form/${id}`);
  };

  return (
    <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="overflow-x-auto">
        <TabulatorTable
          data={mappedData}
          columns={columns()}
          title="درخواست‌های مشاوره"
          showActions={true}
          formatExportData={ExelData}
        />
      </div>
    </div>
  );
};

export default AdminConsultationRequestTable;
