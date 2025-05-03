import { Dialog } from "@/components/modals";
import { DeleteEntireShiftDialogProps } from "../types/shiftsUpdate.type";

export const DeleteEntireShiftDialog = ({
  isOpen,
  onClose,
  onConfirm,
  shiftName,
}: DeleteEntireShiftDialogProps) => (
  <Dialog
    isOpen={isOpen}
    onClose={onClose}
    size="sm"
    header="حذف کل شیفت"
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
      <p className="text-gray-700">
        آیا از حذف کل شیفت "{shiftName}" اطمینان دارید؟
      </p>
      <p className="mt-2 text-sm text-red-500">
        این عملیات غیرقابل بازگشت است و تمام روزهای این شیفت حذف خواهند شد.
      </p>
    </div>
  </Dialog>
);