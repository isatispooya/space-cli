import { TabulatorTable } from "../../../../components";
import { useMemo } from "react";

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

    const columns = () => [
        { title: "فرستنده", field: "sender", headerFilter: true },
        { title: "موضوع", field: "subject", headerFilter: true },
        { title: "تاریخ", field: "date", headerFilter: true },
        { title: "وضعیت", field: "status", headerFilter: true },
        { title: "اولویت", field: "priority", headerFilter: true }
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