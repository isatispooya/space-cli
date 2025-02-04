import React, { useState, useEffect } from "react";
import useInsurance from "../../hooks/useInsurance";
import SelectInput from "../../../../components/inputs/selectInput";
import { Spinner } from "../../../../components/loaders";
import FileInput from "../../../../components/inputs/uploadInput";
import { Toast } from "../../../../components/toast";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../../types";
import { CheckmarkIcon, ErrorIcon } from "react-hot-toast";
import {
  InsuranceField,
  InsuranceRequest,
  InsuranceUpdateTypes,
} from "../../types";
import { useParams } from "react-router-dom";
import { server } from "../../../../api/server";
import { useUserPermissions } from "../../../permissions";
import { FormInput, TextAreaInput } from "../../../../components/inputs";
import { formatNumber } from "../../../../utils";

const useInsuranceForm = (dataId: InsuranceUpdateTypes | undefined) => {
  const [selectedInsurance, setSelectedInsurance] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [files, setFiles] = useState<Record<string, File>>({});
  const [description, setDescription] = useState<string>("");

  
  const [descriptionExpert, setDescriptionExpert] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>(
    {}
  );
  const [filesToDelete, setFilesToDelete] = useState<string[]>([]);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    if (dataId) {
      setSelectedInsurance(dataId.insurance_name.toString());
      setStatus(dataId.insurance_status || "");
      setDescription(dataId.description_detail?.[0]?.description_user || "");
      setDescriptionExpert(
        dataId.description_detail?.[0]?.description_expert || ""
      );
      setPrice(dataId.price || "");
    }
  }, [dataId]);

  useEffect(() => {
    if (dataId?.file_detail) {
      const files = dataId.file_detail.reduce(
        (acc, file) => ({
          ...acc,
          [file.file_name]: file.file_attachment,
        }),
        {}
      );
      setUploadedFiles(files);
    }
  }, [dataId]);

  return {
    selectedInsurance,
    setSelectedInsurance,
    status,
    setStatus,
    files,
    setFiles,
    description,
    setDescription,
    uploadedFiles,
    setUploadedFiles,
    filesToDelete,
    setFilesToDelete,
    uploadFile,
    setUploadFile,
    price,
    descriptionExpert,
    setDescriptionExpert,
    setPrice,
  };
};

const FileField: React.FC<{
  field: { id: number; name: string };
  existingFile: { file_name: number; file_attachment: string };
  filesToDelete: string[];
  handleDeleteFile: (fieldId: string) => void;
  handleFileChange: (
    fieldId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  uploadedFiles: Record<string, string>;
}> = ({
  field,
  existingFile,
  filesToDelete,
  handleDeleteFile,
  handleFileChange,
}) => (
  <div className="space-y-2">
    {existingFile && !filesToDelete.includes(field.id.toString()) ? (
      <div className="flex items-center justify-between mb-2 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{field.name}:</span>
          <a
            href={`${server}${existingFile.file_attachment}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline text-sm"
            onClick={(e) => {
              e.preventDefault();
              window.open(`${server}${existingFile.file_attachment}`, "_blank");
            }}
          >
            مشاهده فایل
          </a>
        </div>
        <button
          type="button"
          onClick={() => handleDeleteFile(field.id.toString())}
          className="px-3 py-1 text-sm text-red-500 hover:text-red-700 border border-red-500 hover:border-red-700 rounded-md"
        >
          حذف
        </button>
      </div>
    ) : (
      <FileInput
        label={field.name}
        onChange={(e) => handleFileChange(field.id.toString(), e)}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      />
    )}
  </div>
);

const InsuranceRequestUpdate: React.FC = () => {
  const { data: permissions } = useUserPermissions();

  const hasPermission =
    Array.isArray(permissions) &&
    permissions.some((perm) => perm.codename === "add_insurancename");

  const { id } = useParams();

  const { data: insuranceNames, isLoading } = useInsurance.useGetFields();
  const { data: currentInsurance, isLoading: isLoadingCurrent } =
    useInsurance.useGetRequests();
  const { mutate: updateFields } = useInsurance.useUpdateRequest(id);
  // const { mutate: deleteRequest } = useInsurance.useDeleteRequest(Number(id));

  console.log(currentInsurance);

  const dataId = currentInsurance?.find(
    (item: InsuranceRequest) => item.id === Number(id)
  );

  const {
    selectedInsurance,
    setSelectedInsurance,
    status,
    setStatus,
    files,
    setFiles,
    description,
    setDescription,
    uploadedFiles,
    setUploadedFiles,
    filesToDelete,
    setFilesToDelete,
    uploadFile,
    setUploadFile,
    price,
    setPrice,
    descriptionExpert,
    setDescriptionExpert,
  } = useInsuranceForm(dataId);

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const fileUrl = URL.createObjectURL(file);
      setUploadedFiles((prev) => ({
        ...prev,
        [fieldId]: fileUrl,
      }));
    }
  };

  const handleDeleteFile = (fieldId: string) => {
    setFilesToDelete((prev) => [...prev, fieldId]);
    setUploadedFiles((prev) => {
      const newFiles = { ...prev };
      delete newFiles[fieldId];
      return newFiles;
    });
  };

  const handleUploadFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();

    formData.append("insurance", selectedInsurance);
    formData.append("insurance_status", status);

    Object.entries(files).forEach(([fieldId, file]) => {
      formData.append(`insurance_name_file[${fieldId}]`, file);
    });

    formData.append("description", description);

    filesToDelete.forEach((fieldId) => {
      formData.append("delete_files[]", fieldId);
    });

    if (uploadFile) {
      formData.append("insurance_name_file", uploadFile);
    }

    formData.append("price", price);

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
        const errorMessage = (error.response?.data as ErrorResponse)?.error;
        Toast(errorMessage || "خطایی رخ داده است", <ErrorIcon />, "bg-red-500");
        setIsSubmitting(false);
      },
    });
  };

  // const handleDelete = () => {
  //   console.log("Deleting insurance with ID:", id);

  //   if (!id) {
  //     Toast("شناسه درخواست نامعتبر است", <ErrorIcon />, "bg-red-500");
  //     return;
  //   }

  //   if (window.confirm("آیا از حذف این درخواست بیمه اطمینان دارید؟")) {
  //     try {
  //       deleteRequest(Number(id), {
  //         onSuccess: () => {
  //           Toast(
  //             "درخواست بیمه با موفقیت حذف شد",
  //             <CheckmarkIcon />,
  //             "bg-green-500"
  //           );
  //           window.history.back();
  //         },
  //         onError: (error: AxiosError<unknown>) => {
  //           console.error("Delete error:", error);
  //           const errorMessage = (error.response?.data as ErrorResponse)?.error;
  //           Toast(
  //             errorMessage || "خطایی در حذف رخ داده است",
  //             <ErrorIcon />,
  //             "bg-red-500"
  //           );
  //         },
  //       });
  //     } catch (error) {
  //       console.error("Unexpected error:", error);
  //       Toast("خطای غیر منتظره رخ داد", <ErrorIcon />, "bg-red-500");
  //     }
  //   }
  // };

  const selectedInsuranceFields =
    dataId?.insurance_name_detail?.field_detail || [];

  const insuranceOptions =
    insuranceNames?.map((insurance) => ({
      value: insurance.id.toString(),
      label: insurance.name,
    })) ?? [];

  const statusOptions = [
    { value: "pending_review", label: "در انتظار بررسی " },
    { value: "missing_document", label: "نقص مدارک" },
    { value: "pending_payment", label: "در انتظار پرداخت" },
    { value: "pending_issue", label: "در انتظار بررسی مستندات" },
    { value: "finished", label: "صادر شده" },
    { value: "rejected", label: "رد شده" },
  ];

  const getExistingFile = (fieldId: string) => {
    return dataId?.file_detail?.find(
      (file: { file_name: number; file_attachment: string }) =>
        file.file_name === Number(fieldId)
    );
  };

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
        <h2 className="text-2xl font-bold text-[#29D2C7]">ویرایش بیمه نامه</h2>
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
        </div>

        {selectedInsuranceFields?.map((field: InsuranceField) => {
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
              <FileInput
                label="آپلود بیمه نامه"
                onChange={handleUploadFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <FormInput
                label="قیمت"
                value={formatNumber(Number(price))}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-8 p-2 border rounded-md w-full"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 mt-6 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#29D2C7] hover:bg-[#008282]"
          } text-white rounded-md`}
        >
          {isSubmitting ? "در حال ویرایش..." : "ویرایش"}
        </button>
      </form>
    </div>
  );
};

export default InsuranceRequestUpdate;
