import React, { useState } from "react";
import { Button, Stepper } from "@/components";
import ShiftNameStep from "../components/create/Shift_name.form";
import ShiftSchedule from "../components/create/shifts_schedule.form";
import ShiftReviewStep from "../components/create/Shift_review.list";
import { useShiftsStore } from "../store";
import { useNavigate } from "react-router-dom";
import Toast from "@/components/common/toast/toast";
import { CheckCircle } from "lucide-react";
import { useShifts } from "../hooks";

const ShiftCreateFeat: React.FC = () => {
  const { shiftDates, shiftId } = useShiftsStore();
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { mutate: createShift } = useShifts.useCreateShifts();

  const steps = [
    {
      title: "نام شیفت",
      description: "نام شیفت را وارد کنید",
      status: currentStep > 0 ? ("complete" as const) : ("default" as const),
    },
    {
      title: "زمان‌بندی",
      description: "تاریخ‌های شیفت را انتخاب کنید",
      status: currentStep > 1 ? ("complete" as const) : ("default" as const),
    },
    {
      title: "تایید نهایی",
      description: "اطلاعات را بررسی و تایید کنید",
      status: "default" as const,
    },
  ];

  const handleDateSubmit = () => {
    if (shiftDates.length > 0 && shiftDates[0].day.length > 0) {
      setCurrentStep(2);
    }
  };

  const handleSuccess = () => {
    if (!shiftId) return;

    const shiftData = {
      name: shiftId.toString(),
      dates: shiftDates,
    };

    createShift(shiftData, {
      onSuccess: () => {
        Toast(
          "شیفت با موفقیت ایجاد شد",
          <CheckCircle className="w-5 h-5" />,
          "bg-green-500"
        );
        navigate("/shifts/table");
      },
      onError: () => {
        Toast(
          "خطایی رخ داده است",
          <CheckCircle className="w-5 h-5" />,
          "bg-red-500"
        );
      },
    });
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ShiftNameStep onSuccess={() => setCurrentStep(1)} />;
      case 1:
        return (
          <div className="mt-4">
     
            <ShiftSchedule />
            <div className="mt-6">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                isDisabled={!shiftDates.length || !shiftDates[0].day.length}
                onClick={handleDateSubmit}
                animationOnHover="scale"
                animationOnTap="scale"
                className="bg-[#008282] hover:bg-[#008282]/90"
                ripple
                elevated
              >
                ادامه
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <ShiftReviewStep
            onBack={() => setCurrentStep(1)}
            onSuccess={handleSuccess}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          orientation="horizontal"
          size="small"
          showStepNumbers
     
        />
      </div>
      {renderStepContent(currentStep)}
    </div>
  );
};

export default ShiftCreateFeat;
