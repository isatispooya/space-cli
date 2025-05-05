import React, { useState } from "react";
import { Button, Stepper } from "@/components";
import ShiftNameStep from "../components/create/Shift_name.form";
import ShiftSchedule from "../components/create/shifts_schedule.form";
import ShiftReviewStep from "../components/create/Shift_review.list";
import { useShiftsStore } from "../store";
import { useNavigate } from "react-router-dom";
import Toast from "@/components/common/toast/toast";
import { CheckCircle } from "lucide-react";

const ShiftCreateFeat: React.FC = () => {
  const { shiftDates } = useShiftsStore();
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

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
    if (shiftDates.length > 0) {
      setCurrentStep(2);
    }
  };

  const handleSuccess = () => {
    Toast(
      "شیفت با موفقیت ایجاد شد",
      <CheckCircle className="w-5 h-5" />,
      "bg-green-500"
    );
    navigate("/shifts/table");
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ShiftNameStep onSuccess={() => setCurrentStep(1)} />;
      case 1:
        return (
          <div className="mt-4">
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800">
                تنظیم زمان‌بندی برای شیفت
              </h2>
            </div>
            <ShiftSchedule />
            <div className="mt-6">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                isDisabled={shiftDates.length === 0}
                onClick={handleDateSubmit}
                animationOnHover="scale"
                animationOnTap="scale"
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
