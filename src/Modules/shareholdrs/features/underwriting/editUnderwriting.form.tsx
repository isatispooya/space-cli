import { useUnderwriting } from "../../hooks";
import { Forms } from "../../../../components";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { UnderwritingType } from "../../types/underwriting.type";
import moment from "moment-jalaali";
import { FormFieldType } from "../../../../types";
import toast from "react-hot-toast";
import { formatNumber } from "../../../../utils";
import { server } from "../../../../api";

const EditUnderWritingForm = () => {
  const { id: urlId } = useParams();
  const { data: processData, refetch: refetchProcess } =
    useUnderwriting.useGet();
  const { mutate: update } = useUnderwriting.useUpdate();

  const navigate = useNavigate();

  const process = processData?.find(
    (item: UnderwritingType) => item.id === Number(urlId)
  );

  if (!process && !urlId) {
    navigate("/underwriting/table");
  }

  const validationSchema = yup.object().shape({
    id: yup.number().required(),
    process: yup.number().required(),
    status: yup.string().required("ثبت وضعیت الزامی است"),
  }) as yup.ObjectSchema<UnderwritingType>;

  const formFields: FormFieldType[] = [
    {
      name: "price",
      label: "قیمت",
      type: "text",
      disabled: true,
    },
    {
      name: "status",
      label: "وضعیت",
      type: "select",
      options: [
        { label: "تایید شده", value: "approved" },
        { label: "رد شده", value: "rejected" },
        { label: "در انتظار تایید", value: "pending" },
        { label: "تایید نهایی", value: "success" },
      ],
    },
    {
      name: "type",
      label: "نوع",
      type: "select" as const,
      disabled: true,
      options: [
        { label: "فیش", value: "1" },
        { label: "درگاه", value: "2" },
      ],
    },
    {
      name: "created_at",
      label: "تاریخ ایجاد",
      type: "text",
      disabled: true,
    },
    {
      name: "user",
      label: "کاربر",
      type: "text",
      disabled: true,
      value: `${process?.user_detail?.first_name || ""} ${
        process?.user_detail?.last_name || ""
      }`,
    },
    {
      name: "document",
      label: "فیش فایل",
      type: "viewFile",
      viewFileProps: {
        showPreview: true,
        url: server + "/" + process?.document || "",
        fileType: process?.document_type || "",
      },
    },
  ];

  const initialValues: UnderwritingType = {
    id: process?.id || 0,
    price: formatNumber(process?.price || 0) as unknown as number,
    process: process?.process || 0,
    status: process?.status || "",
    type: process?.type || "",
    created_at: moment(process?.created_at).format("jYYYY/jMM/jDD") || "",
    user: `${process?.user_detail?.first_name || ""} ${
      process?.user_detail?.last_name || ""
    }`,
    requested_amount: process?.requested_amount || 0,
  };

  const onSubmit = (values: Pick<UnderwritingType, "status">) => {
    if (process) {
      update(
        {
          ...process,
          status: values.status,
        },
        {
          onSuccess: () => {
            refetchProcess();
            toast.success("پرداخت با موفقیت ویرایش شد");
            navigate("/underwriting/table");
          },
          onError: () => {
            toast.error("خطایی رخ داده است");
          },
        }
      );
    }
  };

  return (
    <>
      <Forms
        formFields={formFields as FormFieldType[]}
        initialValues={initialValues}
        validationSchema={validationSchema}
        title="ویرایش پرداخت"
        colors="text-[#5677BC]"
        buttonColors="bg-[#5677BC] hover:bg-[#02205F]"
        submitButtonText={{
          default: "ویرایش",
          loading: "در حال ویرایش",
        }}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default EditUnderWritingForm;
