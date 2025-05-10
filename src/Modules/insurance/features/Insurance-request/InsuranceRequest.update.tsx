import { server } from "@/api";
import React, { useEffect } from "react";
import {
  FormInput,
  SelectInput,
  Toast,
  FileInput,
  Spinner,
  ViewFileInput,
  TextAreaInput,
} from "@/components";

import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import useInsurance from "../../hooks/useInsurance";
import { useUserPermissions } from "../../../permissions";
import { useInsuranceRStore } from "../../store";
import { CheckmarkIcon, ErrorIcon } from "react-hot-toast";
import { FileField } from "../../components";
import { ErrorResponseType } from "@/types";
import { InsuranceFieldType, InsuranceRequestType } from "../../types";
import { statusOptions } from "../../data";

const InsuranceRequestUpdate: React.FC = () => {
  const { id } = useParams();
  const { data: permissions } = useUserPermissions();
  const { data: insuranceNames, isLoading } = useInsurance.useGetFields();
  const { data: currentInsurance, isLoading: isLoadingCurrent } =
    useInsurance.useGetRequests();
  const { mutate: updateFields } = useInsurance.useUpdateRequest(id);
  const {
    selectedInsurance,
    setSelectedInsurance,
    status,
    setStatus,
    files,
    description,
    setDescription,
    draftFile,
    setDraftFile,
    descriptionExpert,
    setDescriptionExpert,
    uploadedFiles,
    setUploadedFiles,
    filesToDelete,
    uploadFile,
    setUploadFile,
    price,
    setPrice,
    isSubmitting,
    setIsSubmitting,
  } = useInsuranceRStore();

  const dataId = currentInsurance?.find(
    (item: InsuranceRequestType) => item.id === Number(id)
  );
  const hasPermission =
    Array.isArray(permissions) &&
    permissions.some((perm) => perm.codename === "add_insurance_name");

  const handleInsuranceChange = (value: string) => setSelectedInsurance(value);

  const handleFileChange = (
    fieldId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      useInsuranceRStore.setState((state) => ({
        files: { ...state.files, [fieldId]: file },
        uploadedFiles: {
          ...state.uploadedFiles,
          [fieldId]: URL.createObjectURL(file),
        },
      }));
    }
  };

  const handleDeleteFile = (fieldId: string) => {
    useInsuranceRStore.setState((state) => ({
      filesToDelete: [...state.filesToDelete, fieldId],
      uploadedFiles: Object.fromEntries(
        Object.entries(state.uploadedFiles).filter(([key]) => key !== fieldId)
      ),
    }));
  };

  const handleUploadFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadFile(file);
  };

  const handleClearUploadFile = () => {
    setUploadFile(null);
  };

  const handleDraftFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setDraftFile(file);
  };

  const handleClearDraftFile = () => {
    setDraftFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("insurance", selectedInsurance);
    formData.append("insurance_status", status);
    formData.append("description_expert", descriptionExpert);
    Object.entries(files).forEach(([fieldId, file]) => {
      formData.append(`insurance_name_file[${fieldId}]`, file);
    });
    formData.append("description", description);
    filesToDelete.forEach((fieldId) =>
      formData.append("delete_files[]", fieldId)
    );
    if (draftFile) formData.append("insurance_name_draft_file", draftFile);
    if (uploadFile) formData.append("insurance_name_file", uploadFile);
    formData.append("price", price.toString());

    updateFields(formData, {
      onSuccess: () => {
        Toast(
          "بیمه نامه با موفقیت ویرایش شد",
          <CheckmarkIcon />,
          "bg-green-500"
        );
        setIsSubmitting(false);
      },
      onError: (error: AxiosError<unknown>) => {
        const errorMessage = (error.response?.data as ErrorResponseType)?.error;
        Toast(errorMessage || "خطایی رخ داده است", <ErrorIcon />, "bg-red-500");
        setIsSubmitting(false);
      },
    });
  };

  const selectedInsuranceFields =
    dataId?.insurance_name_detail?.field_detail || [];
  const insuranceOptions =
    insuranceNames?.map((insurance) => ({
      value: insurance.id.toString(),
      label: insurance.name,
    })) ?? [];

  const getExistingFile = (fieldId: string) => {
    return dataId?.file_detail?.find(
      (file: { file_name: number; file_attachment: string }) =>
        file.file_name === Number(fieldId)
    );
  };

  useEffect(() => {
    if (dataId) {
      setSelectedInsurance(dataId.insurance_name.toString());
      setStatus(dataId.insurance_status || "");
      setDraftFile(dataId.insurance_name_draft_file || null);
      setUploadFile(dataId.insurance_name_file || null);
      setDescription(dataId.description_detail?.[0]?.description_user || "");
      setDescriptionExpert(
        dataId.description_detail?.map(
          (item: { description_expert: string }) => item.description_expert
        ) || ""
      );
      setPrice(dataId.price || "");
    }
  }, [
    dataId,
    setSelectedInsurance,
    setStatus,
    setDraftFile,
    setUploadFile,
    setDescription,
    setDescriptionExpert,
    setPrice,
  ]);

  useEffect(() => {
    if (dataId?.file_detail) {
      const files = dataId.file_detail.reduce(
        (
          acc: Record<string, string>,
          file: { file_name: number; file_attachment: string }
        ) => ({
          ...acc,
          [file.file_name.toString()]: file.file_attachment,
        }),
        {}
      );
      const filteredFiles = Object.fromEntries(
        Object.entries(files).filter(([key]) => !filesToDelete.includes(key))
      ) as Record<string, string>;
      setUploadedFiles(filteredFiles);
    }
  }, [dataId?.file_detail, filesToDelete, setUploadedFiles]);

  if (isLoading || isLoadingCurrent || !dataId) {
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#5677BC]">ویرایش بیمه نامه</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <SelectInput
            options={insuranceOptions}
            value={selectedInsurance}
            onChange={handleInsuranceChange}
            label="نوع بیمه"
            placeholder="جستجوی نوع بیمه..."
          />
          {hasPermission && (
            <SelectInput
              options={statusOptions}
              value={status}
              onChange={(value) => setStatus(value)}
              label="وضعیت"
              placeholder="انتخاب وضعیت..."
            />
          )}
          {dataId?.user_detail?.mobile && (
            <div className="p-2 border rounded-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                شماره موبایل کاربر
              </label>
              <div className="text-gray-900">{dataId.user_detail.mobile}</div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {dataId?.first_properties_detail?.name && (
            <div className="p-2 border rounded-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                شرکت بیمه اول
              </label>
              <div className="text-gray-900">
                {dataId.first_properties_detail.name}
              </div>
            </div>
          )}
          {dataId?.second_properties_detail?.name && (
            <div className="p-2 border rounded-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                شرکت بیمه دوم
              </label>
              <div className="text-gray-900">
                {dataId.second_properties_detail.name}
              </div>
            </div>
          )}
          {dataId?.third_properties_detail?.name && (
            <div className="p-2 border rounded-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                شرکت بیمه سوم
              </label>
              <div className="text-gray-900">
                {dataId.third_properties_detail.name}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TextAreaInput
            label="توضیحات"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded-md w-full"
          />

          <TextAreaInput
            label="توضیحات کارشناسی"
            value={descriptionExpert}
            onChange={(e) => setDescriptionExpert(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
        </div>

        {hasPermission && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {uploadFile && (
                <ViewFileInput
                  label="مشاهده بیمه نامه"
                  url={server + uploadFile}
                  fileType="application/pdf"
                />
              )}
              <FileInput
                label="آپلود بیمه نامه"
                onChange={handleUploadFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onClear={handleClearUploadFile}
              />

              {draftFile && (
                <ViewFileInput
                  label="مشاهده پیش نویس بیمه نامه"
                  url={server + draftFile}
                  fileType="application/pdf"
                />
              )}
              <FileInput
                label="آپلود پیش نویس بیمه نامه"
                onChange={handleDraftFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onClear={handleClearDraftFile}
              />
              <FormInput
                label="قیمت"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="mt-8 p-2 border rounded-md w-full"
              />
            </div>
          </>
        )}

        {selectedInsuranceFields?.map((field: InsuranceFieldType) => {
          const existingFile = getExistingFile(field.id.toString());
          return (
            <FileField
              key={field.id}
              field={field}
              existingFile={existingFile}
              filesToDelete={filesToDelete}
              handleDeleteFile={handleDeleteFile}
              handleFileChange={handleFileChange}
              uploadedFiles={uploadedFiles}
            />
          );
        })}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 mt-6 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#5677BC] hover:bg-[#5677BC]"
          } text-white rounded-md`}
        >
          {isSubmitting ? "در حال ویرایش..." : "ویرایش"}
        </button>
      </form>
    </div>
  );
};

export default InsuranceRequestUpdate;
