import { useState } from "react";
import { Stepper } from "@/components";
import ConsultationSubjects from "./subjects.feat";
import ConsultationRequest from "./request.feat";
import { useConsultUser } from "../../hooks";
import { Dialog } from "@/components/modals";

const ConsultationFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const {
    data: subjects,
    isLoading,
    isError,
  } = useConsultUser.useGetSubjects();

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const steps = [
    {
      title: "انتخاب موضوع",
      description: "موضوع مشاوره خود را انتخاب کنید",
    },
    {
      title: "درخواست مشاوره",
      description: "",
      isLocked: !selectedSubject,
    },
  ];

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setCurrentStep(1);
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const completionDialog = (
    <Dialog
      isOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      size="sm"
    >
      <div className="p-4 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          وضعیت درخواست
        </h3>
        <p className="text-gray-600">{dialogMessage}</p>
      </div>
    </Dialog>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
        className=""
        contentWidth="500px"
        contentHeight="100px"
        stepSpacing="tight"
        contentAlignment="center"
        showCompletionStep={true}
        completionComponent={completionDialog}
      />

      <div className="mt-8">
        {currentStep === 0 && (
          <ConsultationSubjects
            subjects={subjects ?? []}
            isLoading={isLoading}
            isError={isError}
            onSelectSubject={handleSubjectSelect}
          />
        )}
        {currentStep === 1 && selectedSubject && (
          <ConsultationRequest
            subjectId={selectedSubject}
            onCancel={() => setCurrentStep(0)}
            onSuccess={(message) => {
              setDialogMessage(message);
              setIsDialogOpen(true);
              setCurrentStep(2);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ConsultationFlow;
