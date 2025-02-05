import { useNavigate, useParams } from "react-router-dom";
import { useInsurance } from "../../hooks";
import Forms from "../../../../components/forms";
import * as yup from "yup";
import { ErrorResponse, FormField } from "../../../../types";
import { Spinner } from "../../../../components/loaders";
import { formatNumber } from "../../../../utils";
import { CheckmarkIcon, ErrorIcon } from "react-hot-toast";
import { Toast } from "../../../../components/toast";
import { AxiosError } from "axios";
import { FishPaymentType, InsuranceRequest } from "../../types";
import { server } from "../../../../api";

const InsurancePayment = () => {
  const { id } = useParams();
  const { data: insurancePayment, isLoading } = useInsurance.useGetRequests();
  const navigate = useNavigate();
  const { mutate: postFish } = useInsurance.usePostInsurancePaymentFish();
  const selectedPayment = insurancePayment?.find(
    (payment: InsuranceRequest) => payment.id === Number(id)
  );

  if (isLoading || !selectedPayment) {
    return <Spinner />;
  }

  const validationSchema = yup.object({
    id: yup.number().required() as yup.NumberSchema<number>,
    document: yup.mixed().required("فایل الزامی است") as yup.MixedSchema<File>,
    insurance_name: yup.string().required() as yup.StringSchema<string>,
    price: yup.number().required() as yup.NumberSchema<number>,
    document_track_id: yup.string().required("شناسه پیگیری الزامی است"),
    kind_of_payment: yup.string().required("نوع پرداخت الزامی است"),
  });

  const formFields: FormField[] = [
    {
      name: "document",
      label: "فیشش بانکی",
      type: "file",
      fileProps: {
        maxSize: 1024 * 1024 * 5,
      },
    },
    {
      name: "insurance_name",
      label: "نام بیمه",
      type: "text",
      disabled: true,
    },
    {
      name: "price",
      label: "قیمت",
      type: "text",
      disabled: true,
      format: (value: number) => formatNumber(value),
    },
    {
      name: "document_track_id",
      label: "شناسه پیگیری",
      type: "text",
    },

    {
      name: "kind_of_payment",
      label: "نوع پرداخت",
      type: "select",
      options: [{ label: "فیش بانکی", value: "1" }],
    },

    ...(selectedPayment?.insurance_name_draft_file
      ? [
          {
            name: "insurance_name_draft_file",
            label: "پیش نویس بیمه نامه",
            type: "viewFile" as const,
            disabled: false,
            viewFileProps: {
              showPreview: true,
              url: server + "/" + selectedPayment.insurance_name_draft_file,
              fileType: selectedPayment.insurance_name_draft_file_type || "",
            },
          },
        ]
      : []),

    {
      name: "document",
      label: "مشاهده فیش بانکی",
      type: "viewFile",
      viewFileProps: {
        showPreview: true,
        url: server + "/" + selectedPayment.payment?.document,
        fileType: selectedPayment.payment?.document_type || "",
      },
    },
  ];

  const initialValues: FishPaymentType = {
    id: selectedPayment.id,
    document: new File([], ""),
    insurance_name: selectedPayment.insurance_name_detail?.name,
    price: selectedPayment.price,
    document_track_id: "",
    kind_of_payment: "1",
  };

  const onSubmit = (values: FishPaymentType) => {
    const formData = new FormData();
    formData.append("document", values.document);
    formData.append("id", String(values.id));
    formData.append("document_track_id", values.document_track_id);
    formData.append("kind_of_payment", values.kind_of_payment);

    postFish(formData, {
      onSuccess: () => {
        Toast("پرداخت با موفقیت انجام شد", <CheckmarkIcon />, "bg-green-500");
        navigate("/requestinsurance/table");
      },
      onError: (error: AxiosError<unknown>) => {
        const errorMessage = (error.response?.data as ErrorResponse)?.error;
        Toast(
          errorMessage || "پرداخت با خطا مواجه شد",
          <ErrorIcon />,
          "bg-red-500"
        );
      },
    });
  };

  return (
    <Forms
      formFields={formFields}
      initialValues={initialValues}
      title=" پرداخت"
      colors="text-[#29D2C7]"
      buttonColors="bg-[#29D2C7] hover:bg-[#008282]"
      submitButtonText={{
        default: "ثبت",
        loading: "در حال ارسال...",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    />
  );
};

export default InsurancePayment;
