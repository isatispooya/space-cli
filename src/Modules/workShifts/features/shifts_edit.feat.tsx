import { Toast, DynamicList } from "@/components";
import { motion } from "framer-motion";
import { CheckCircle, X } from "lucide-react";
import { useShiftsStore } from "../store";
import { useShifts } from "../hooks";
import { useMemo } from "react";
import {
  ShiftHeaderCom,
  ShiftSelectorCom,
  ShiftDateItemCom,
} from "../components/edit";
import ShiftSchedule from "../components/create/shifts_schedule.form";
import { convertToTimestamp } from "../utils";
import {  ShiftDateResType } from "../types";

const ShiftsEditFeat = () => {
  const {
    shiftId,
    setShiftId,
    searchQuery,
    visibleItems,
    setSearchQuery,
    setVisibleItems,
    shiftDates: storeShiftDates,
    setShiftDates,
  } = useShiftsStore();

  const { data: shifts, refetch } = useShifts.useGetShifts();
  const { mutate: createNewDates } = useShifts.useCreateShiftsDates();
  const { data: shiftDates, refetch: refetchDates } =
    useShifts.useGetShiftsDates(shiftId?.toString() || "");
  const { mutate: deleteShift, isPending: isDeleting } =
    useShifts.useDeleteShifts();
  const { mutate: deleteShiftDate, isPending: isDeletingDate } =
    useShifts.useDeleteShiftsDates();
  const { mutate: updateDates } = useShifts.useUpdateShiftDates();

  const shiftOptions = useMemo(
    () =>
      shifts?.map((shift) => ({
        value: shift.id.toString(),
        label: shift.name,
      })) || [],
    [shifts]
  );

  const handleShiftChange = (value: string) => {
    setShiftId(value ? parseInt(value) : null);
  };

  const handleCreateDates = () => {
    if (!shiftId || storeShiftDates.length === 0) return;

    const datesToCreate = [
      {
        shift: shiftId,
        day: storeShiftDates[0].day.map((date) => ({
          date: convertToTimestamp(date.date),
          start_time: date.start_time,
          end_time: date.end_time,
          work_day: date.work_day,
          day_of_week: date.day_of_week,
        })),
      },
    ];

    createNewDates(datesToCreate, {
      onSuccess: () => {
        Toast(
          "تاریخ‌های جدید با موفقیت اضافه شدند",
          <CheckCircle size={18} className="text-green-500" />,
          "bg-green-500"
        );
        setShiftDates([]);
        refetchDates();
      },
      onError: () => {
        Toast(
          "خطایی رخ داده است",
          <X size={18} className="text-red-500" />,
          "bg-red-500"
        );
      },
    });
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (shiftId) {
      deleteShift(shiftId.toString(), {
        onSuccess: () => {
          setShiftId(null);
          Toast(
            "شیفت با موفقیت حذف شد",
            <CheckCircle size={18} className="text-green-500" />,
            "bg-green-500"
          );
          refetch();
        },
        onError: () => {
          Toast(
            "خطایی رخ داده است",
            <X size={18} className="text-red-500" />,
            "bg-red-500"
          );
        },
      });
    }
  };

  const handleDeleteDate = (dateId: number) => {
    deleteShiftDate(dateId.toString(), {
      onSuccess: () => {
        Toast(
          "تاریخ با موفقیت حذف شد",
          <CheckCircle size={18} className="text-green-500" />,
          "bg-green-500"
        );
        refetchDates();
      },
      onError: () => {
        Toast(
          "خطایی رخ داده است",
          <X size={18} className="text-red-500" />,
          "bg-red-500"
        );
      },
    });
  };

  const handleTimeChange = (
    dateId: number,
    field: "start_time" | "end_time",
    value: string
  ) => {
    const date = shiftDates?.find((d: ShiftDateResType) => d.id === dateId);
    if (!date) return;

    updateDates(
      {
        id: dateId.toString(),
        data: {
          shift: date.shift,
          date: date.date,
          start_time: field === "start_time" ? value : date.start_time,
          end_time: field === "end_time" ? value : date.end_time,
          work_day: date.work_day,
          day_of_week: date.day_of_week,
        },
      },
      {
        onSuccess: () => {
          Toast(
            "زمان با موفقیت بروزرسانی شد",
            <CheckCircle size={18} className="text-green-500" />,
            "bg-green-500"
          );
          refetchDates();
        },
        onError: () => {
          Toast(
            "خطایی رخ داده است",
            <X size={18} className="text-red-500" />,
            "bg-red-500"
          );
        },
      }
    );
  };

  const handleWorkDayChange = (dateId: number, newValue: boolean) => {
    const date = shiftDates?.find((d: ShiftDateResType) => d.id === dateId);
    if (!date) return;

    updateDates(
      {
        id: dateId.toString(),
        data: {
          shift: date.shift,
          date: date.date,
          start_time: date.start_time,
          end_time: date.end_time,
          work_day: newValue,
          day_of_week: date.day_of_week,
        },
      },
      {
        onSuccess: () => {
          Toast(
            "وضعیت روز کاری بروزرسانی شد",
            <CheckCircle size={18} className="text-green-500" />,
            "bg-green-500"
          );
          refetchDates();
        },
        onError: () => {
          Toast(
            "خطایی رخ داده است",
            <X size={18} className="text-red-500" />,
            "bg-red-500"
          );
        },
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-4"
    >
      <ShiftSelectorCom
        shiftOptions={shiftOptions}
        shiftId={shiftId}
        onShiftChange={handleShiftChange}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />

      {shiftId && (
        <div className="mt-6">
          <ShiftHeaderCom shiftDates={shiftDates} />

          <div className="mb-6">
            <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                افزودن تاریخ‌های جدید
              </h3>
              <ShiftSchedule />
              {storeShiftDates &&
                storeShiftDates.length > 0 &&
                storeShiftDates[0]?.day?.length > 0 && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleCreateDates}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      افزودن {storeShiftDates[0].day.length} تاریخ جدید
                    </button>
                  </div>
                )}
            </div>
          </div>

          <DynamicList
            data={shiftDates || []}
            isPending={false}
            searchQuery={searchQuery}
            visibleItems={visibleItems}
            onSearchChange={setSearchQuery}
            onItemClick={(item: ShiftDateResType) => {console.log(item)}}
            onLoadMore={() => setVisibleItems(visibleItems + 10)}
            renderItem={(date: ShiftDateResType) => (
              <ShiftDateItemCom
                date={date}
                onTimeChange={handleTimeChange}
                onWorkDayChange={handleWorkDayChange}
                onDelete={handleDeleteDate}
                isDeleting={isDeletingDate}
              />
            )}
            noResultsMessage="تاریخی برای این شیفت ثبت نشده است."
          />
        </div>
      )}
    </motion.div>
  );
};

export default ShiftsEditFeat;
