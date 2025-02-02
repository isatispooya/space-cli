import React, { useState } from "react";
import useInsurance from "../../hooks/useInsurance";
import SelectInput from "../../../../components/inputs/selectInput";
import { Spinner } from "../../../../components/loaders";
import FileInput from "../../../../components/inputs/uploadInput";

export const InsuranceappCreate: React.FC = () => {
  const { data: insuranceNames, isLoading } = useInsurance.useGetFields();
  const { mutate: postFields } = useInsurance.usePostRequest();
  const [selectedInsurance, setSelectedInsurance] = useState("");
  const [files, setFiles] = useState<{ [key: string]: File }>({});

  const handleInsuranceChange = (value: string) => {
    console.log("Selected insurance:", value);
    setSelectedInsurance(value);
  };

  const handleFileChange = (
    fieldId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.[0]) {
      setFiles((prev) => ({
        ...prev,
        [fieldId]: e.target.files![0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("insurence", selectedInsurance);

    Object.entries(files).forEach(([fieldId, file]) => {
      formData.append(`files[${fieldId}]`, file);
    });

    console.log("Submitting:", formData);
    postFields(formData);
  };

  const selectedInsuranceFields =
    insuranceNames?.find((item) => item.id.toString() === selectedInsurance)
      ?.fields || [];

  const insuranceOptions =
    insuranceNames?.map((insurance) => ({
      value: insurance.id.toString(),
      label: insurance.name,
    })) || [];

  return (
    <div
      className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-[32px] shadow-lg"
      dir="rtl"
    >
      <h2 className="text-2xl font-bold text-[#29D2C7] mb-6">ثبت بیمه نامه</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <SelectInput
            options={insuranceOptions}
            value={selectedInsurance}
            onChange={handleInsuranceChange}
            label="نوع بیمه"
            placeholder="جستجوی نوع بیمه..."
          />

          {selectedInsuranceFields.map((field) => (
            <FileInput
              key={field.id}
              label={field.name}
              onChange={(e) => handleFileChange(field.id.toString(), e)}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
          ))}

          <button
            type="submit"
            className="w-full py-3 px-4 mt-6 bg-[#29D2C7] hover:bg-[#008282] text-white rounded-md"
          >
            ثبت
          </button>
        </form>
      )}
    </div>
  );
};

export default InsuranceappCreate;
