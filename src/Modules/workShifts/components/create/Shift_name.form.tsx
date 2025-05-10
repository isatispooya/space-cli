import React from "react";
import { InputBase, Button } from "@/components";
import { useShiftsStore } from "../../store";
import { useShifts } from "../../hooks";

interface ShiftNameStepPropsType {
  onSuccess: () => void;
}

const ShiftNameCom: React.FC<ShiftNameStepPropsType> = ({ onSuccess }) => {
  const { shiftName, setShiftName, setShiftId } = useShiftsStore();
  const { mutate: createShifts, isPending } = useShifts.useCreateShifts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (shiftName.trim()) {
      try {
        createShifts(
          { name: shiftName.trim() },
          {
            onSuccess: (response) => {
              setShiftId(response.id);
              onSuccess();
            },
            onError: (error) => {
              console.error("Error creating shift:", error);
            },
          }
        );
      } catch (error) {
        console.error("Error creating shift:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-6">
        <InputBase
          type="text"
          label="نام شیفت را وارد کنید"
          value={shiftName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setShiftName(e.target.value)
          }
          placeholder="نام شیفت را وارد کنید"
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        className="mt-2 bg-[#008282] hover:bg-[#008282]/90"
        isLoading={isPending}
        isDisabled={isPending || !shiftName.trim()}
        animationOnHover="scale"
        animationOnTap="scale"
        ripple
        elevated
      >
        {isPending ? "ایجاد شیفت..." : "ادامه"}
      </Button>
    </form>
  );
};

export default ShiftNameCom;
