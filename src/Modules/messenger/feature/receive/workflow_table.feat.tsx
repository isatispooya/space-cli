import { TabulatorTable } from "@/components";
import { CellComponent, ColumnDefinition } from "tabulator-tables";
import { useReceive } from "../../hooks/receive";
import { useParams } from "react-router-dom";
import { ActionMenu } from "@/components/table/tableaction";
import { createRoot } from "react-dom/client";
import { useMemo } from "react";

const WorkflowTable = () => {
  const { id } = useParams();
  const { data } = useReceive.useGetReceiveWorkflow();
  const { mutate: postReceiveWorkflow } = useReceive.usePostReceiveWorkflow();
  console.log(data);

  const onCreateLetter = () => {
    postReceiveWorkflow({
      correspondence: id,
    });
  };

  const handleCellClick = (e: UIEvent, cell: CellComponent) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;

    if (!target.classList.contains("action-btn")) return;

    const existingMenu = document.querySelector(".popup-menu");
    if (existingMenu) {
      existingMenu.remove();
      return;
    }

    const rect = target.getBoundingClientRect();
    const rowData = cell.getRow().getData();
    const menuItems = [
      {
        label: "ارجاع",
        icon: "🔗",
        onClick: () =>
          (window.location.href = `/letter/refferal-table/${rowData.id}`),
      },
    ];

    const menuContainer = document.createElement("div");
    menuContainer.className = "popup-menu";
    document.body.appendChild(menuContainer);

    const root = createRoot(menuContainer);
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuContainer.contains(event.target as Node)) {
        root.unmount();
        menuContainer.remove();
        document.removeEventListener("click", handleClickOutside);
      }
    };

    setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);

    root.render(
      <ActionMenu
        items={menuItems}
        position={{ x: rect.left, y: rect.bottom }}
        onClose={() => {
          root.unmount();
          menuContainer.remove();
          document.removeEventListener("click", handleClickOutside);
        }}
      />
    );
  };

  const columns = useMemo<ColumnDefinition[]>(
    () => [
      {
        title: "شناسه",
        field: "id",
        hozAlign: "center",
      },
      {
        title: "شماره نامه",
        field: "correspondence_details.number",
        hozAlign: "center",
      },
      {
        title: "موضوع",
        field: "correspondence_details.subject",
        hozAlign: "center",
      },
      {
        title: "فرستنده",
        field: "correspondence_details.sender_details.user.first_name",
        hozAlign: "center",
        formatter: (cell) => {
          const user =
            cell.getData().correspondence_details.sender_details?.user;
          return user ? `${user.first_name} ${user.last_name}` : "-";
        },
      },
      {
        title: "گیرنده",
        field:
          "correspondence_details.receiver_internal_details.user.first_name",
        hozAlign: "center",
        formatter: (cell) => {
          const user =
            cell.getData().correspondence_details.receiver_internal_details
              ?.user;
          return user ? `${user.first_name} ${user.last_name}` : "-";
        },
      },
      {
        field: "عملیات",
        title: "عملیات",
        headerSort: false,
        hozAlign: "center" as const,
        headerHozAlign: "center" as const,
        formatter: () => `<button class="action-btn">⋮</button>`,
        cellClick: handleCellClick,
      },
    ],
    []
  );

  return (
    <>
      <div className="w-full bg-gray-100 shadow-md rounded-2xl relative overflow-hidden ">
        <div className="overflow-x-auto">
          <TabulatorTable
            data={data}
            columns={columns}
            title="اطلاعات شرکت‌ها"
            showActions={true}
            showCreateLetter={true}
            onCreateLetter={onCreateLetter}
          />
        </div>
      </div>
    </>
  );
};

export default WorkflowTable;
