import TabulatorTable from "../../../../components/table/table.com";

const Gardeshhesab = () => {
  const columns = [
    { title: "ردیف", field: "row", headerFilter: false, width: 80 },
    { title: "نوع تراکنش", field: "type", headerFilter: true },
    { title: "تعداد سهام اولیه", field: "initialShares", headerFilter: true },
    { title: "شرح", field: "description", headerFilter: true },
    { title: "تعداد سهام اضافه/کسر", field: "shareChange", headerFilter: true },
    { title: "تعداد سهام نهایی", field: "finalShares", headerFilter: true },
  ];

  const data = [
    {
      row: 1,
      date: "1402/12/15",
      type: "افزایش سرمایه",
      initialShares: "10,000",
      description: "افزایش سرمایه از محل سود انباشته",
      shareChange: "+2,000",
      finalShares: "12,000",
    },
    {
      row: 2,
      date: "1402/12/10",
      type: "انتقال",
      initialShares: "12,000",
      description: "انتقال سهام به شخص ثالث",
      shareChange: "-1,000",
      finalShares: "11,000",
    },
    {
      row: 3,
      date: "1402/12/05",
      type: "افزایش سرمایه",
      initialShares: "11,000",
      description: "افزایش سرمایه از محل آورده نقدی",
      shareChange: "+3,000",
      finalShares: "14,000",
    },
    {
      row: 4,
      date: "1402/12/01",
      type: "انتقال",
      initialShares: "14,000",
      description: "انتقال سهام به شخص ثالث",
      shareChange: "-500",
      finalShares: "13,500",
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">گردش حساب سهامدار</h2>
      <TabulatorTable
        data={data}
        columns={columns}
        showActions={true}
        showDateFilter={true}
        dateField="date"
        showSearchFilter={true}
        searchFields={["type", "description"]}
      />
    </div>
  );
};

export default Gardeshhesab;
