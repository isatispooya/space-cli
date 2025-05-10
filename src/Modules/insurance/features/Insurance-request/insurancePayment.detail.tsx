/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useInsurance } from "../../hooks";
import { Forms } from "../../../../components";
import * as yup from "yup";
import { ErrorResponseType, FormFieldType } from "@/types";
import { Spinner } from "../../../../components/loaders";
import { formatNumber } from "../../../../utils";
import { CheckmarkIcon, ErrorIcon } from "react-hot-toast";
import { Toast } from "../../../../components";
import { AxiosError } from "axios";
import { FishPaymentType, InsuranceRequestType } from "../../types";
import { server } from "../../../../api";
import { useState, useEffect } from "react";

const InsurancePayment = () => {
  const { id } = useParams();
  const { data: insurancePayment, isLoading } = useInsurance.useGetRequests();
  const navigate = useNavigate();
  const { mutate: postFish } = useInsurance.usePostInsurancePaymentFish();
  const { mutate: postDarghah } = useInsurance.usePostInsurancePaymentDarghah();

  const [paymentType, setPaymentType] = useState<string>("1");
  const [formKey, setFormKey] = useState(0); 
  

  const selectedPayment = insurancePayment?.find(
    (payment: InsuranceRequestType) => payment.id === Number(id)
  );

  useEffect(() => {
    if (selectedPayment?.kind_of_payment) {
      setPaymentType(selectedPayment.kind_of_payment);
    }
  }, [selectedPayment]);

  if (isLoading || !selectedPayment) {
    return <Spinner />;
  }

  const validationSchema = yup.object().shape({
    id: yup.number().required(),
    document: yup.mixed<File>().when("kind_of_payment", {
      is: "1",
      then: (schema) =>
        schema.test(
          "fileRequired",
          "فایل الزامی است",
          (value) => value instanceof File && value.size > 0
        ),
      otherwise: (schema) => schema.optional(),
    }),
    insurance_name: yup.string().required(),
    price: yup.number().required(),
    document_track_id: yup.string().when("kind_of_payment", {
      is: "1",
      then: (schema) => schema.required("شناسه پیگیری الزامی است"),
      otherwise: (schema) => schema.optional(),
    }),
    kind_of_payment: yup.string().required("نوع پرداخت الزامی است"),
    cart_number: yup.string().required("شماره کارت الزامی است"),
    sheba: yup.string().required("شماره شبا الزامی است"),
    first_properties_detail: yup.string().optional(),
  }) as yup.ObjectSchema<FishPaymentType>;

  const handlePaymentTypeChange = (value: string) => {
    console.log("Payment type changed to:", value);
    setPaymentType(value);
    setFormKey((prev) => prev + 1); // Force form re-render when payment type changes
  };

  const formFields: FormFieldType[] = [
    {
      name: "sheba",
      label: "شماره شبا",
      type: "text" as const,
      disabled: true,
    },
    {
      name: "cart_number",
      label: "شماره کارت",
      type: "text" as const,
      disabled: true,
    },
    {
      name: "kind_of_payment",
      label: "نوع پرداخت",
      type: "radio",
      options: [
        { label: "فیش بانکی", value: "1" },
        { label: "درگاه پرداخت", value: "2" },
      ],
      onChange: (value) => handlePaymentTypeChange(value),
    },
    {
      name: "insurance_name",
      label: "نام بیمه",
      type: "text" as const,
      disabled: true,
    },
    {
      name: "price",
      label: "قیمت",
      type: "text" as const,
      disabled: true,
      format: (value: number) => formatNumber(value),
    },
    ...(paymentType === "1"
      ? [
          {
            name: "document",
            label: "فیش بانکی",
            type: "file" as const,
            fileProps: {
              maxSize: 1024 * 1024 * 5,
            },
          },
          {
            name: "document_track_id",
            label: "شناسه پیگیری",
            type: "text" as const,
          },
        ]
      : []),
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
  ];

  const initialValues: FishPaymentType = {
    id: selectedPayment.id,
    document: new File([], ""),
    insurance_name: selectedPayment.insurance_name_detail?.name || "",
    price: selectedPayment.price,
    document_track_id: "",
    kind_of_payment: paymentType,
    cart_number: selectedPayment.insurance_name_detail.cart_number || "",
    sheba: selectedPayment.insurance_name_detail.sheba || "",
  };

  const onSubmit = (values: FishPaymentType) => {
    const formData = new FormData();
    formData.append("document", values.document);
    formData.append("id", String(values.id));
    formData.append("document_track_id", values.document_track_id);
    formData.append("kind_of_payment", values.kind_of_payment);
    formData.append("price", String(initialValues.price));
    if (values.kind_of_payment === "1") {
      postFish(formData, {
        onSuccess: () => {
          Toast("پرداخت با موفقیت انجام شد", <CheckmarkIcon />, "bg-green-500");
          navigate("/requestinsurance/table");
        },
        onError: (error: AxiosError<unknown>) => {
          const errorMessage = (error.response?.data as ErrorResponseType)?.error;
          Toast(
            errorMessage || "پرداخت با خطا مواجه شد",
            <ErrorIcon />,
            "bg-red-500"
          );
        },
      });
    } else {
      postDarghah(
        {
          id: values.id,
          kind_of_payment: values.kind_of_payment,
        },
        {
          onSuccess: (data: any) => {
            Toast(data.message, <CheckmarkIcon />, "bg-green-500");
            window.location.href = `https://ipin.ir/peymentpage?url=${encodeURIComponent(
              data.redirect_url
            )}`;
          },
          onError: (error: AxiosError<unknown>) => {
            const errorMessage = (error.response?.data as ErrorResponseType)?.error;
            Toast(
              errorMessage || "پرداخت با خطا مواجه شد",
              <ErrorIcon />,
              "bg-red-500"
            );
          },
        }
      );
    }
  };

  return (
    <Forms
      key={formKey}
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
