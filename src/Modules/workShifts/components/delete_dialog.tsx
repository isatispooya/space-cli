import { Dialog } from "@/components/modals";
import { formatToJalali, getWeekDayName } from "../utils/dateutils";
import { DeleteDialogProps } from "../types/shiftsUpdate.type";

export const DeleteDialog = ({
  isOpen,
  onClose,
  onConfirm,
  shiftToDelete,
}: DeleteDialogProps) => {
  const firstShiftDate = shiftToDelete?.shift_dates[0];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      header="حذف شیفت"
      hideFooter={false}
      footer={
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-700 rounded-md border border-gray-300"
          >
            انصراف
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            حذف
          </button>
        </div>
      }
    >
      <div className="py-4">
        <p className="text-gray-700 text-right">
          آیا از حذف این شیفت اطمینان دارید؟
        </p>
        {shiftToDelete && (
          <div className="mt-2 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">
              تاریخ: {formatToJalali(firstShiftDate?.date || "")}
            </p>
            <p className="text-sm text-gray-600">
              روز: {getWeekDayName(firstShiftDate?.day_of_week || "")}
            </p>
          </div>
        )}
      </div>
    </Dialog>
  );
};