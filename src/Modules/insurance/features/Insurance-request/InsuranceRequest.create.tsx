import React from "react";
import useInsurance from "../../hooks/useInsurance";
import { SelectInput } from "../../../../components";
import { Spinner } from "../../../../components/loaders";
import { FileInput } from "../../../../components";
import { Toast } from "../../../../components";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../../types";
import { CheckmarkIcon, ErrorIcon } from "react-hot-toast";
import { MultiSelect } from "../../../../components";
import { useInsuranceStore } from "../../store";

const InsuranceRequestCreate: React.FC = () => {
  const { data: insuranceNames, isLoading } = useInsurance.useGetFields();
  const { mutate: postFields, isPending: isPostLoading } =
    useInsurance.usePostRequest();
  const { data: insuranceCompanies } = useInsurance.useGetInsuranceCompanies();

  const {
    selectedInsurance,
    selectedCompanies,
    files,
    description,
    setSelectedInsurance,
    setSelectedCompanies,
    addFile,
    setDescription,
    resetStore,
  } = useInsuranceStore();

  const insuranceCompanyOptions =
    insuranceCompanies?.map((company) => ({
      value: company.id.toString(),
      label: company.name,
    })) ?? [];

  const handleInsuranceChange = (value: string) => {
    setSelectedInsurance(value);
  };

  const handleFileChange = (
    fieldId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      addFile(fieldId, file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("insurance", selectedInsurance);

    let priority = 1;
    selectedCompanies.forEach((companyId) => {
      if (priority === 1) {
        formData.append("first_properties", companyId);
      } else if (priority === 2) {
        formData.append("second_properties", companyId);
      } else if (priority === 3) {
        formData.append("third_properties", companyId);
      }
      priority++;
    });

    Object.entries(files).forEach(([fieldId, file]) => {
      formData.append(fieldId, file);
    });

    formData.append("description", description);

    postFields(formData, {
      onSuccess: () => {
        resetStore();
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

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-[32px] shadow-lg">
        <Spinner />
      </div>
    );
  }

  if (isPostLoading) {
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
      <h2 className="text-2xl font-bold text-[#29D2C7] mb-6">
        درخواست خرید بیمه نامه
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectInput
            options={insuranceOptions}
            value={selectedInsurance}
            onChange={handleInsuranceChange}
            label="نوع بیمه"
            placeholder="جستجوی نوع بیمه..."
          />

          {selectedInsurance && (
            <MultiSelect
              options={insuranceCompanyOptions}
              selectedValues={selectedCompanies}
              onChange={setSelectedCompanies}
              label="شرکت های بیمه گر منتخب"
              placeholder="انتخاب شرکت‌های بیمه..."
              maxSelect={3}
            />
          )}
        </div>

        {selectedInsuranceFields.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectedInsuranceFields.map((field) => (
              <div key={field.id}>
                <FileInput
                  label={field.name}
                  onChange={(e) => handleFileChange(field.id.toString(), e)}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </div>
            ))}
          </div>
        )}

        <input
          type="text"
          placeholder="توضیحات"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 p-2 border rounded-md w-full"
        />

        <button
          type="submit"
          disabled={isPostLoading}
          className="w-full py-3 px-4 mt-6 bg-[#29D2C7] hover:bg-[#008282] text-white rounded-md"
        >
          ثبت
        </button>
      </form>
    </div>
  );
};

export default InsuranceRequestCreate;
