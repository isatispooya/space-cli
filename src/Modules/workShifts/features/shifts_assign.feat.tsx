import { usePosition } from "@/Modules/positions/hooks";
import { useShifts } from "../hooks";
import SelectInput from "@/components/common/inputs/selectInput";
import DynamicList from "@/components/list/dynamiclist";
import useShiftsStore from "../store/shifts.store";
import { GetShiftsResType } from "../types/Shifts.type";
import { PositionTypes } from "@/Modules/positions/types/postions.type";
import { UserCircle2, Building2, Save, Check } from "lucide-react";
import { Button } from "@/components";
import { useState } from "react";

const ShiftsAssignFeat = () => {
  const { data: shifts, isLoading: shiftsLoading } = useShifts.useGetShifts();
  const { mutate: assignShifts, isPending: assignLoading } =
    useShifts.useCreateShiftsAssign();
  const { data: positions, isLoading: positionsLoading } = usePosition.useGet();

  // Use store for state
  const {
    shiftId,
    setShiftId,
    searchQuery,
    setSearchQuery,
    visibleItems,
    setVisibleItems,
  } = useShiftsStore();

  // State for selected positions
  const [selectedPositions, setSelectedPositions] = useState<number[]>([]);

  // Prepare options for SelectInput
  const shiftOptions =
    shifts?.map((shift: GetShiftsResType) => ({
      value: shift.id?.toString(),
      label: shift.name || `شیفت ${shift.id}`,
    })) || [];

  // Handle position selection
  const handlePositionSelect = (positionId: number) => {
    setSelectedPositions((prev) => {
      if (prev.includes(positionId)) {
        return prev.filter((id) => id !== positionId);
      }
      return [...prev, positionId];
    });
  };

  // Handle submitting selected positions
  const handleSubmit = () => {
    if (!shiftId) {
      alert("لطفا یک شیفت را انتخاب کنید.");
      return;
    }
    if (selectedPositions.length === 0) {
      alert("لطفا حداقل یک موقعیت را انتخاب کنید.");
      return;
    }

    // Submit each selected position
    selectedPositions.forEach((positionId) => {
      assignShifts({ shift_id: Number(shiftId), position_id: positionId });
    });

    // Clear selections after submission
    setSelectedPositions([]);
  };

  // Handle shift change
  const handleShiftChange = (id: string) => {
    setShiftId(Number(id));
  };

  // Render each position
  const renderPosition = (position: PositionTypes) => {
    const isSelected = selectedPositions.includes(position.id);

    return (
      <div className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <UserCircle2 className="w-10 h-10 text-gray-400" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">
                {position.name}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>
                {position.user.first_name} {position.user.last_name}
              </span>
              <span className="text-gray-400">|</span>
              <span className="font-mono">
                {position.user.uniqueIdentifier}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-500" />
            <span className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full">
              {position.company_detail?.name}
            </span>
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handlePositionSelect(position.id);
            }}
            className={`p-2 rounded-full transition-colors ${
              isSelected
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            <Check size={20} />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between gap-4 mb-4">
        <SelectInput
          label="انتخاب شیفت"
          options={shiftOptions}
          value={shiftId?.toString() || ""}
          onChange={handleShiftChange}
          placeholder="جستجو در شیفت‌ها"
          disabled={shiftsLoading}
        />
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={!shiftId}
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            !shiftId
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition-colors`}
        >
          <Save size={18} />
          ثبت {selectedPositions.length > 0 && `(${selectedPositions.length})`}
        </Button>
      </div>

      <div className="flex-1 w-full">
        <DynamicList
          data={positions || []}
          isPending={positionsLoading}
          searchQuery={searchQuery}
          visibleItems={visibleItems}
          onSearchChange={setSearchQuery}
          onItemClick={() => {}}
          onLoadMore={() => setVisibleItems((v: number) => v + 10)}
          renderItem={renderPosition}
          noResultsMessage="موقعیتی یافت نشد."
        />
      </div>

      {assignLoading && (
        <div className="text-center text-blue-500 mt-2">
          در حال تخصیص شیفت...
        </div>
      )}
    </div>
  );
};

export default ShiftsAssignFeat;
