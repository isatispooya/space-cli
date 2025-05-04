import { useShifts } from "../hooks";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { Edit2 } from "lucide-react";
import { TabulatorTable, SelectInput, LoaderLg, Spinner } from "@/components";
import { CellComponent } from "tabulator-tables";
import moment from "moment-jalaali";
import { ShiftDateResType } from "../types";
import { useShiftsStore } from "../store/shifts.store";
import { useNavigate } from "react-router-dom";

const ShiftsTableFeat = () => {
  const { data: shifts, isLoading: shiftsLoading } = useShifts.useGetShifts();
  const { shiftId, setShiftId, setShiftDates } = useShiftsStore();
  const navigate = useNavigate();

  const {
    data: dates,
    isLoading: datesLoading,
    isFetching: datesFetching,
  } = useShifts.useGetShiftsDates(shiftId?.toString() || "");

  useMemo(() => {
    if (dates) {
      const convertedDates = dates.map((date) => ({
        ...date,
        id: date.id.toString(),
      }));
      setShiftDates(convertedDates);
    }
  }, [dates, setShiftDates]);

  const handleShiftChange = (value: string) => {
    setShiftId(value ? parseInt(value) : null);
  };

  const handleEdit = () => {
    navigate("/shifts/edit");
  };

  const formatExportData = useMemo(
    () => (data: ShiftDateResType[]) => {
      return data.map((item) => ({
        تاریخ: moment(item.date).locale("fa").format("jYYYY/jMM/jDD"),
        "زمان شروع": item.start_time,
        "زمان پایان": item.end_time,
        "روز کاری": item.work_day ? "بله" : "خیر",
        "روز هفته": item.day_of_week,
        شیفت: item.shift,
      }));
    },
    []
  );

  const tableColumns = useMemo(
    () => [
      {
        title: "تاریخ",
        field: "date",
        headerFilter: true,
        headerFilterPlaceholder: "جستجو در تاریخ",
        formatter: (cell: CellComponent) => {
          const value = cell.getValue();
          return moment(value).locale("fa").format("jYYYY/jMM/jDD");
        },
      },
      {
        title: "زمان شروع",
        field: "start_time",
        headerFilter: true,
        headerFilterPlaceholder: "جستجو در زمان شروع",
      },
      {
        title: "زمان پایان",
        field: "end_time",
        headerFilter: true,
        headerFilterPlaceholder: "جستجو در زمان پایان",
      },
      {
        title: "روز کاری",
        field: "work_day",
        formatter: (cell: CellComponent) => {
          const value = cell.getValue();
          return `<span class="px-2 py-1 rounded text-sm ${
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }">${value ? "بله" : "خیر"}</span>`;
        },
        headerFilter: true,
        headerFilterPlaceholder: "جستجو در وضعیت",
      },
      {
        title: "روز هفته",
        field: "day_of_week",
        headerFilter: true,
        headerFilterPlaceholder: "جستجو در روز هفته",
      },
      {
        title: "شیفت",
        field: "shift",
        headerFilter: true,
        headerFilterPlaceholder: "جستجو در شیفت",
      },
    ],
    []
  );

  const shiftOptions = useMemo(
    () =>
      shifts?.map((shift) => ({
        value: shift.id.toString(),
        label: shift.name,
      })) || [],
    [shifts]
  );

  if (shiftsLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <LoaderLg />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-4"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <SelectInput
              label="انتخاب شیفت"
              options={shiftOptions}
              value={shiftId?.toString() || ""}
              onChange={handleShiftChange}
              placeholder="جستجو در شیفت‌ها"
            />
          </div>

          <div className="flex">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEdit}
              disabled={!shiftId}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                !shiftId
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white transition-colors`}
            >
              <Edit2 size={18} />
              ویرایش
            </motion.button>
          </div>
        </div>
      </motion.div>

      {shiftId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg shadow-md p-4 relative"
        >
          {(datesLoading || datesFetching) && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
              <Spinner />
            </div>
          )}

          {dates && (
            <TabulatorTable
              data={dates}
              columns={tableColumns}
              height="400px"
              pagination={true}
              paginationSize={10}
              showActions={true}
              title="لیست تاریخ‌های شیفت"
              formatExportData={formatExportData}
            />
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ShiftsTableFeat;
