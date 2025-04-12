import "moment/locale/fa";
import { TabulatorTable, SelectInput } from "../../../components";
import { useState, useMemo } from "react";
import { AdminConsultationData } from "../data";

const AdminConsulationTable = () => {
  const [selectedSpeciality, setSelectedSpeciality] = useState("");

  const uniqueSpecialities = useMemo(() => {
    return Array.from(
      new Set(AdminConsultationData.map((item) => item.speciality))
    );
  }, []);

  const mappedData = useMemo(() => {
    return AdminConsultationData.filter(
      (item) =>
        selectedSpeciality === "" || item.speciality === selectedSpeciality
    ).map((item) => ({
      id: item.id,
      patient_name: item.patientName,
      doctor_name: item.doctorName,
      date: item.date,
      time: item.time,
      status: item.status,
      speciality: item.speciality,
      price: item.price.toLocaleString("fa-IR") + " ریال",
    }));
  }, [selectedSpeciality]);

  const columns = () => [
    { title: "نام بیمار", field: "patient_name", headerFilter: true },
    { title: "نام پزشک", field: "doctor_name", headerFilter: true },
    { title: "تاریخ", field: "date", headerFilter: true },
    { title: "ساعت", field: "time", headerFilter: true },
    { title: "وضعیت", field: "status", headerFilter: true },
    { title: "تخصص", field: "speciality", headerFilter: true },
    { title: "هزینه", field: "price", headerFilter: true },
  ];

  const ExelData = (item) => {
    return {
      نام_بیمار: item.patientName || "نامشخص",
      نام_پزشک: item.doctorName || "نامشخص",
      تاریخ: item.date || "نامشخص",
      ساعت: item.time || "نامشخص",
      وضعیت: item.status || "نامشخص",
      تخصص: item.speciality || "نامشخص",
      هزینه: item.price.toLocaleString("fa-IR") + " ریال" || "نامشخص",
    };
  };

  return (
    <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 max-w-md">
          <SelectInput
            options={uniqueSpecialities.map((speciality) => ({
              value: speciality,
              label: speciality,
            }))}
            label="تخصص‌ها"
            value={selectedSpeciality}
            onChange={(value) => setSelectedSpeciality(value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <TabulatorTable
          data={mappedData}
          columns={columns()}
          title="مشاوره‌ها"
          showActions={true}
          formatExportData={ExelData}
        />
      </div>
    </div>
  );
};

export default AdminConsulationTable;
