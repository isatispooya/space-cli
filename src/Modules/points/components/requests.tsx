import { useNavigate } from "react-router-dom";
import moment from "moment-jalaali";
import "moment/locale/fa";
import { useGiftsUser } from "../hooks";
import { RequestTypes, RequestUpdateTypes } from "../types";
import { CellComponent } from "tabulator-tables";
import TabulatorTable from "../../../components/table/table.com";
import toast, { ErrorIcon } from "react-hot-toast";
import { Toast } from "../../../components/toast";
import { useUserPermissions } from "../../permissions";

const Request = () => {
  const { data: giftsUser, refetch } = useGiftsUser.useGetGifts();
  const { mutate: updateGiftsUser } = useGiftsUser.useUpdateGiftsUser();
  const { checkPermission } = useUserPermissions();
  const navigate = useNavigate();
  const isAdmin = checkPermission(["change_giftuser"]);

  const statusMapping = {
    delivered: "تحویل داده شده",
    cancelled: "لغو شده",
  };

  const rows: RequestTypes[] =
    giftsUser?.map((item: RequestTypes) => ({
      id: item.id,
      title: item.gift_detail.display_name,
      description: item.gift_detail.description,
      points: item.gift_detail.point_1,
      user: {
        first_name: item.user_detail.first_name,
        last_name: item.user_detail.last_name,
      },
      status: item.status,
      created_at: item.created_at,
      amount: item.amount,
      gift_detail: {
        display_name: item.gift_detail.display_name,
        point_1: item.gift_detail.point_1,
        point_2: item.gift_detail.point_2,
        description: item.gift_detail.description,
      },
      user_detail: {
        first_name: item.user_detail.first_name,
        last_name: item.user_detail.last_name,
        id: item.user_detail.id,
      },
    })) || [];

  const handleStatusChange = (id: number, newStatus: string) => {
    const updatedData: RequestUpdateTypes = {
      status: newStatus as "delivered" | "cancelled" | "pending",
    };

    if (id !== undefined) {
      updateGiftsUser(
        { id, data: updatedData },
        {
          onSuccess: () => {
            toast.success("وضعیت با موفقیت تغییر کرد");
            refetch();
          },
          onError: () => {
            Toast("خطا در اعمال تغییرات", <ErrorIcon />, "bg-red-500");
            refetch();
          },
        }
      );
    } else {
      refetch();
    }
  };

  const closeAllMenus = () => {
    const existingMenus = document.querySelectorAll(".popup-menu");
    existingMenus.forEach((menu) => {
      document.body.removeChild(menu);
    });
  };

  const handleView = (id: number) => {
    navigate(`/users/view/${id}`);
  };

  const columns = () => [
    {
      field: "title",
      title: "عنوان",
    },
    {
      field: "description",
      title: "توضیحات",
    },

    {
      field: "points",
      title: "امتیاز",
    },
    {
      field: "amount",
      title: "کل دریافتی",
    },
    {
      field: "status",
      title: "وضعیت",
      formatter: (cell: CellComponent) => {
        const statusValue = cell.getValue();
        return statusMapping[statusValue as keyof typeof statusMapping];
      },
      cellClick: (e: MouseEvent, cell: CellComponent) => {
        if (!isAdmin) return;
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

        Object.entries(statusMapping).forEach(
          ([status, persianTranslation]) => {
            const menuItem = document.createElement("button");
            menuItem.className = "menu-item";
            menuItem.textContent = persianTranslation;

            if (status === cell.getValue()) {
              menuItem.style.fontWeight = "bold";
            }

            menuItem.onclick = () => {
              const rowData = cell.getRow().getData();
              const rowId = rowData.user_detail.id;
              handleStatusChange(rowId, status);
              closeAllMenus();
              refetch();
            };

            menu.appendChild(menuItem);
          }
        );

        const rect = cell.getElement().getBoundingClientRect();
        menu.style.left = `${rect.left + window.scrollX}px`;
        menu.style.top = `${rect.bottom + window.scrollY}px`;

        document.body.appendChild(menu);

        const closeMenu = (e: MouseEvent) => {
          if (!menu.contains(e.target as Node)) {
            closeAllMenus();
            document.removeEventListener("click", closeMenu);
          }
        };
        document.addEventListener("click", closeMenu);

        const handleScroll = () => {
          closeAllMenus();
          window.removeEventListener("scroll", handleScroll);
        };
        window.addEventListener("scroll", handleScroll);
      },
    },

    {
      field: "reason",
      title: "علت",
      editor: "input",
    },
    {
      field: "user_detail",
      title: "نام و نام خانوادگی",
      formatter: (cell: CellComponent) => {
        const userDetail = cell.getValue();
        if (userDetail && typeof userDetail === "object") {
          return `${userDetail.first_name} ${userDetail.last_name}`;
        }
        return "";
      },
    },
    {
      field: "created_at",
      title: "تاریخ ایجاد",
      formatter: (cell: CellComponent) =>
        moment(cell.getValue()).format("jYYYY/jMM/jDD"),
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

        const rowData = cell.getRow().getData() as RequestTypes;
        closeAllMenus();
        const menu = document.createElement("div");
        menu.className = "popup-menu";
        menu.setAttribute(
          "data-cell",
          cell.getElement().getAttribute("tabulator-field") || ""
        );

        const customMenuItems = [
          {
            label: "نمایش",
            icon: "⚡",
            action: () => handleView(rowData.user_detail.id),
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

  return (
    <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="overflow-x-auto">
        <TabulatorTable
          data={rows}
          columns={[...columns()]}
          title="درخواست ها"
          showActions={true}
        />
      </div>
    </div>
  );
};

export default Request;
