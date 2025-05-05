import { Button, SelectInput } from "@/components";
import { Trash } from "lucide-react";

const ShiftSelectorCom = ({
  shiftOptions,
  shiftId,
  onShiftChange,
  onDelete,
  isDeleting,
}: {
  shiftOptions: { value: string; label: string }[];
  shiftId: number | null;
  onShiftChange: (value: string) => void;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDeleting: boolean;
}) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div className="flex-1">
        <SelectInput
          label="انتخاب شیفت"
          options={shiftOptions}
          value={shiftId?.toString() || ""}
          onChange={onShiftChange}
          placeholder="جستجو در شیفت‌ها"
        />
      </div>
      <div className="flex">
        <Button
          isLoading={isDeleting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDelete}
          disabled={!shiftId}
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            !shiftId
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          } text-white transition-colors`}
        >
          <Trash size={18} />
          حذف شیفت
        </Button>
      </div>
    </div>
  );
};

export default ShiftSelectorCom;
