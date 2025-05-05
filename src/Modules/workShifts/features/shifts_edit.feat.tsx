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

const ShiftsEditFeat = () => {
  const {
    shiftId,
    setShiftId,
    searchQuery,
    visibleItems,
    setSearchQuery,
    setVisibleItems,
  } = useShiftsStore();

  const { data: shifts, refetch } = useShifts.useGetShifts();
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
    const date = shiftDates?.find((d) => d.id === dateId);
    if (!date) return;

    updateDates(
      {
        id: dateId.toString(),
        data: [
          {
            shift: date.shift,
            date: date.date,
            start_time: field === "start_time" ? value : date.start_time,
            end_time: field === "end_time" ? value : date.end_time,
            work_day: date.work_day,
            day_of_week: date.day_of_week,
          },
        ],
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
    const date = shiftDates?.find((d) => d.id === dateId);
    if (!date) return;

    updateDates(
      {
        id: dateId.toString(),
        data: [
          {
            shift: date.shift,
            date: date.date,
            start_time: date.start_time,
            end_time: date.end_time,
            work_day: newValue,
            day_of_week: date.day_of_week,
          },
        ],
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

          <DynamicList
            data={shiftDates || []}
            isPending={false}
            searchQuery={searchQuery}
            visibleItems={visibleItems}
            onSearchChange={setSearchQuery}
            onItemClick={() => {}}
            onLoadMore={() => setVisibleItems(visibleItems + 10)}
            renderItem={(date) => (
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
