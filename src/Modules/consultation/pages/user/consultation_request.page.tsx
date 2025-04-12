import {  ConsultantsList, ConsultationSubjects ,  } from "../../feature";

const ConsultationRequestPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <ConsultationSubjects />
      <ConsultantsList />
    </div>
  );
};

export default ConsultationRequestPage;
