import React, { useState } from "react";
import useInsurance from "../../hooks/useInsurance";
import SelectInput from "../../../../components/inputs/selectInput";
import { Spinner } from "../../../../components/loaders";
import FileInput from "../../../../components/inputs/uploadInput";
import { Toast } from "../../../../components/toast";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../../types";
import { CheckmarkIcon, ErrorIcon } from "react-hot-toast";

const InsuranceRequestCreate: React.FC = () => {
  const { data: insuranceNames, isLoading } = useInsurance.useGetFields();
  const { mutate: postFields } = useInsurance.usePostRequest();
  const [selectedInsurance, setSelectedInsurance] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [files, setFiles] = useState<Record<string, File>>({});
  const [description, setDescription] = useState<string>(""); 

  const handleInsuranceChange = (value: string) => {
    setSelectedInsurance(value);
  };

  const handlePriorityChange = (value: string) => {
    setSelectedPriority(value);
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
    formData.append("priority", selectedPriority);

    Object.entries(files).forEach(([fieldId, file]) => {
      formData.append(fieldId, file);
    });

    formData.append("description", description);

    postFields(formData, {
      onSuccess: () => {
        setSelectedInsurance("");
        setFiles({});
        setDescription("");
        Toast("بیمه نامه با موفقیت ثبت شد", <CheckmarkIcon />, "bg-green-500");
      },

      onError: (error: AxiosError<unknown>) => {
        const errorMessage = (error.response?.data as ErrorResponse)?.error;
        Toast(errorMessage || "خطایی رخ داده است", <ErrorIcon />, "bg-red-500");
      },
    });
  };

  const selectedInsuranceFields =
    insuranceNames?.find((item) => item.id.toString() === selectedInsurance)
      ?.fields ?? [];

  const insuranceOptions =
    insuranceNames?.map((insurance) => ({
      value: insurance.id.toString(),
      label: insurance.name,
    })) ?? [];

  const priorityOptions = [
    { value: "iran", label: "بیمه ایران" },
    { value: "karafarin", label: "بیمه کارآفرین" },
    { value: "asia", label: "بیمه آسیا" },
    { value: "parsian", label: "بیمه پارسیان" },
  ];

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-[32px] shadow-lg">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-[32px] shadow-lg" dir="rtl">
      <h2 className="text-2xl font-bold text-[#29D2C7] mb-6">ثبت بیمه نامه</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <SelectInput
          options={insuranceOptions}
          value={selectedInsurance}
          onChange={handleInsuranceChange}
          label="نوع بیمه"
          placeholder="جستجوی نوع بیمه..."
        />

        <SelectInput
          options={priorityOptions}
          value={selectedPriority}
          onChange={handlePriorityChange}
          label="اولویت بیمه"
          placeholder="انتخاب شرکت بیمه..."
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
