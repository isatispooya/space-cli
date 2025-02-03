import React, { useState, useEffect } from "react";
import useInsurance from "../../hooks/useInsurance";
import SelectInput from "../../../../components/inputs/selectInput";
import { Spinner } from "../../../../components/loaders";
import FileInput from "../../../../components/inputs/uploadInput";
import { Toast } from "../../../../components/toast";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../../types";
import { CheckmarkIcon, ErrorIcon } from "react-hot-toast";
import { InsuranceTypes } from "../../types";
import { useParams } from "react-router-dom";

const InsuranceRequestUpdate: React.FC = () => {
  const { id } = useParams();
  const { data: insuranceNames, isLoading } = useInsurance.useGetFields();
  const { data: currentInsurance, isLoading: isLoadingCurrent } =
    useInsurance.useGetRequests();
  const { mutate: updateFields } = id ? useInsurance.useUpdateRequest(id) : { mutate: () => {} };
  const [selectedInsurance, setSelectedInsurance] = useState<string>("");
  const [files, setFiles] = useState<Record<string, File>>({});
  const [description, setDescription] = useState<string>("");
  const [removedFiles, setRemovedFiles] = useState<string[]>([]);



  console.log(insuranceNames , 456);
  console.log(currentInsurance , 123);

  useEffect(() => {
    if (id) {
      setSelectedInsurance(id.toString());
    }
    if (currentInsurance) {
      setDescription(currentInsurance.description || "");
    }
  }, [currentInsurance, id]);

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

  const handleRemoveFile = (fieldId: string) => {
    setRemovedFiles((prev) => [...prev, fieldId]);
    setFiles((prev) => {
      const newFiles = { ...prev };
      delete newFiles[fieldId];
      return newFiles;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      Toast("شناسه بیمه نامه نامعتبر است", <ErrorIcon />, "bg-red-500");
      return;
    }
    
    const formData = new FormData();
    formData.append("id", id);
    formData.append("insurance", selectedInsurance);
    Object.entries(files).forEach(([fieldId, file]) => {
      formData.append(fieldId, file);
    });
    formData.append("removed_files", JSON.stringify(removedFiles));
    
    formData.append("description", description);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    updateFields(formData, {
      onSuccess: () => {
        Toast(
          "بیمه نامه با موفقیت ویرایش شد",
          <CheckmarkIcon />,
          "bg-green-500"
        );
      },
      onError: (error: AxiosError<unknown>) => {
        const errorMessage = (error.response?.data as ErrorResponse)?.error;
        Toast(errorMessage || "خطایی رخ داده است", <ErrorIcon />, "bg-red-500");
      },
    });
  };

  const parseFieldName = (nameString: string) => {
    try {
      return JSON.parse(nameString.replace(/'/g, '"'));
    } catch (error) {
      return { name: nameString, date: '' };
    }
  };

  const selectedInsuranceFields =
    insuranceNames?.find((item: InsuranceTypes) => item.id === Number(id))
      ?.fields.map(field => ({
        ...field,
        parsedName: parseFieldName(field.name)
      })) || [];

  console.log(selectedInsuranceFields);

  const insuranceOptions =
    insuranceNames?.map((insurance) => ({
      value: insurance.id.toString(),
      label: insurance.name,
    })) ?? [];

  const getExistingFile = (fieldId: string) => {
    return currentInsurance?.files?.find(
      (file: any) => file.field_id.toString() === fieldId
    );
  };

  if (isLoading || isLoadingCurrent) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-[32px] shadow-lg">
        <Spinner />
      </div>
    );
  }

  return (
    <div
      className="max-w-4xl mx-auto my-8 p-8 bg-white rounded-[32px] shadow-lg"
      dir="rtl"
    >
      <h2 className="text-2xl font-bold text-[#29D2C7] mb-8">
        ویرایش بیمه نامه
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <SelectInput
          options={insuranceOptions}
          value={selectedInsurance}
          onChange={handleInsuranceChange}
          label="نوع بیمه"
          placeholder="جستجوی نوع بیمه..."
        />

        {selectedInsuranceFields?.map((field) => {
          const existingFile = getExistingFile(field.id.toString());
          const isRemoved = removedFiles.includes(field.id.toString());

          return (
            <div key={field.id} className="bg-gray-50 p-4 rounded-lg">
              {existingFile && !isRemoved && (
                <div className="mb-3 text-sm text-gray-600 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">فایل فعلی:</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                      {existingFile.file_name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(field.id.toString())}
                    className="text-red-500 hover:text-red-700 px-2 py-1 rounded-md text-sm transition-colors duration-200"
                  >
                    حذف
                  </button>
                </div>
              )}
              <FileInput
                label={`${field.parsedName.name} (تاریخ: ${field.parsedName.date})`}
                onChange={(e) => handleFileChange(field.id.toString(), e)}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </div>
          );
        })}

        <textarea
          placeholder="توضیحات"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 p-4 border border-gray-200 rounded-lg w-full min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#29D2C7] focus:border-transparent"
        />

        <button
          type="submit"
          className="w-full py-4 px-6 mt-8 bg-[#29D2C7] hover:bg-[#008282] text-white rounded-lg transition-colors duration-200 font-medium text-lg"
        >
          ویرایش بیمه نامه
        </button>
      </form>
    </div>
  );
};

export default InsuranceRequestUpdate;
