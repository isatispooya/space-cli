import { TabulatorTable } from "../../../../components";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
const TableReceive = () => {
    const staticData = [
        {
            id: 1,
            sender: "علی محمدی",
            subject: "گزارش روزانه",
            date: "1403/01/15",
            status: "خوانده شده",
            priority: "بالا"
        },
        {
            id: 2,
            sender: "مریم احمدی",
            subject: "درخواست مرخصی",
            date: "1403/01/14",
            status: "خوانده نشده",
            priority: "متوسط"
        },
        {
            id: 3,
            sender: "رضا کریمی",
            subject: "جلسه هفتگی",
            date: "1403/01/13",
            status: "خوانده شده",
            priority: "پایین"
        }
    ];
    const navigate = useNavigate();

    const handleView = (row) => {
        console.log("مشاهده پیام:", row);
        navigate(`/letter-receive/message/${row.id}`);
    };



    const columns = () => [
        { title: "فرستنده", field: "sender", headerFilter: true, hozAlign: "center" },
        { title: "موضوع", field: "subject", headerFilter: true, hozAlign: "center" },
        { title: "تاریخ", field: "date", headerFilter: true, hozAlign: "center" },
        { title: "وضعیت", field: "status", headerFilter: true, hozAlign: "center" },
        { title: "اولویت", field: "priority", headerFilter: true, hozAlign: "center" },
        {
            title: "عملیات",
            field: "actions",
            hozAlign: "center",
            formatter: (cell) => {
                const row = cell.getRow().getData();
                return `
                    <div class="flex gap-2">
                        <button  class="bg-blue-500 text-white cursor-pointer px-2 py-1 rounded" onclick="handleView('${row.id}')">
                            مشاهده
                        </button>
                    </div>
                `;
            },
            cellClick: function(e, cell) {
                const action = e.target.textContent.trim();
                const row = cell.getRow().getData();
                
                switch(action) {
                    case 'مشاهده':
                        handleView(row);
                        break;
                }
            }
        }
    ];

    const mappedData = useMemo(() => staticData, []);

    return (
        <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
            <div className="overflow-x-auto">
                <TabulatorTable
                    data={mappedData}
                    columns={columns()}
                    title="پیام‌های دریافتی"
                    showActions={true}
                />
            </div>
        </div>
    );
};

export default TableReceive;