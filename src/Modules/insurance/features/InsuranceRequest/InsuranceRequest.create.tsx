import React, { useState } from "react";
import useInsurance from "../../hooks/useInsurance";
import SelectInput from "../../../../components/inputs/selectInput";
import { Spinner } from "../../../../components/loaders";
import FileInput from "../../../../components/inputs/uploadInput";

 const InsuranceRequestCreate: React.FC = () => {
  const { data: insuranceNames, isLoading } = useInsurance.useGetFields();
  const { mutate: postFields } = useInsurance.usePostRequest();
  const [selectedInsurance, setSelectedInsurance] = useState<string>("");
  const [files, setFiles] = useState<Record<string, File>>({});
  const [description, setDescription] = useState<string>(""); // Single state for description

  const handleInsuranceChange = (value: string) => {
    setSelectedInsurance(value);
  };

  const handleFileChange = (
    fieldId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles((prev) => ({
        ...prev,
        [fieldId]: file,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("insurance", selectedInsurance);

    Object.entries(files).forEach(([fieldId, file]) => {
      formData.append(fieldId, file);
    });

    // Append the single description to formData
    formData.append("description", description);

    postFields(formData);
  };

  const selectedInsuranceFields = insuranceNames?.find(
    (item) => item.id.toString() === selectedInsurance
  )?.fields ?? [];

  const insuranceOptions = insuranceNames?.map((insurance) => ({
    value: insurance.id.toString(),
    label: insurance.name,
  })) ?? [];

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-[32px] shadow-lg">
        <Spinner />
      </div>
    );
  }

  return (
    <div
      className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-[32px] shadow-lg"
      dir="rtl"
    >
      <h2 className="text-2xl font-bold text-[#29D2C7] mb-6">ثبت بیمه نامه</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <SelectInput
          options={insuranceOptions}
          value={selectedInsurance}
          onChange={handleInsuranceChange}
          label="نوع بیمه"
          placeholder="جستجوی نوع بیمه..."
        />

        {selectedInsuranceFields.map((field) => (
          <div key={field.id}>
            <FileInput
              label={field.name}
              onChange={(e) => handleFileChange(field.id.toString(), e)}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
          </div>
        ))}

        {/* Single description input for the selected insurance */}
        <input
          type="text"
          placeholder="توضیحات"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 p-2 border rounded-md w-full"
        />

        <button
          type="submit"
          className="w-full py-3 px-4 mt-6 bg-[#29D2C7] hover:bg-[#008282] text-white rounded-md"
        >
          ثبت
        </button>
      </form>
    </div>
  );
};

export default InsuranceRequestCreate;
