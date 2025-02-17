import toast from "react-hot-toast";
import { Forms } from "../../../../components";
import { DisplacementPrecendenceTypes } from "../../types/displacementPrecendence.type";
import * as yup from "yup";
import { useDisplacement } from "../../hooks";
import { useUserData } from "../../../users/hooks";
import { useCompany } from "../../../companies/hooks";
import { useNavigate, useParams } from "react-router-dom";

const EditDisplacmentForm: React.FC = () => {
  const { mutate } = useDisplacement.useUpdate();
  const { data: displacementData } = useDisplacement.useGet();
  const { data: users } = useUserData();
  const { data: companies } = useCompany.useGet();
  const { id } = useParams();

  const navigate = useNavigate();
  const displacement = displacementData?.find(
    (item: DisplacementPrecendenceTypes) => item.id === Number(id)
  );

  if (!displacement && !id) {
    navigate("/displacement/table");
  }

  const formFields = [
    {
      name: "buyer",
      label: "خریدار",
      type: "select" as const,
      options:
        users?.map(
          (user: { first_name: string; last_name: string; id: number }) => ({
            label: `${user.first_name} ${user.last_name}`,
            value: user.id.toString(),
          })
        ) || [],
    },
    {
      name: "number_of_shares",
      label: "تعداد حق تقدم",
      type: "text" as const,
    },
    {
      name: "seller",
      label: "فروشنده",
      type: "select" as const,
      options:
        users?.map(
          (user: { first_name: string; last_name: string; id: number }) => ({
            label: `${user.first_name} ${user.last_name}`,
            value: user.id.toString(),
          })
        ) || [],
    },
    {
      name: "price",
      label: "قیمت",
      type: "text" as const,
    },
    {
      name: "company",
      label: "شرکت",
      type: "select" as const,
      options:
        companies?.map((company: { name: string; id: number }) => ({
          label: company.name,
          value: company.id.toString(),
        })) || [],
    },
  ];

  const initialValues: DisplacementPrecendenceTypes = {
    id: displacement?.id || 0,
    buyer: displacement?.buyer || 0,
    seller: displacement?.seller || 0,
    company: displacement?.company || 0,
    number_of_shares: displacement?.number_of_shares || 0,
    price: displacement?.price || 0,
  };

  const validationSchema = yup.object().shape({
    id: yup.number().required(),
    buyer: yup.number().required("خریدار الزامی است"),
    seller: yup.number().required("فروشنده الزامی است"),
    company: yup.number().required("شرکت الزامی است"),
    number_of_shares: yup.number().required("تعداد سهام الزامی است"),
    price: yup.number().required("قیمت الزامی است"),
  }) as yup.ObjectSchema<DisplacementPrecendenceTypes>;

  const onSubmit = (values: DisplacementPrecendenceTypes) => {
    if (displacement?.id) {
      mutate(
        { data: values, id: displacement?.id.toString() },
        {
          onSuccess: () => {
            toast.success("حق تقدم با موفقیت ویرایش شد");
            navigate("/displacement/table");
          },
          onError: (
            error: Error | { response?: { data?: { error?: string } } }
          ) => {
            const errorMessage =
              ("response" in error && error?.response?.data?.error) ||
              "خطایی رخ داده است";
            toast.error(errorMessage);
          },
        }
      );
    }
  };

  return (
    <>
      <Forms
        formFields={formFields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        colors="text-[#5677BC]"
        buttonColors="bg-[#5677BC] hover:bg-[#02205F]"
        showCloseButton={true}
        onSubmit={onSubmit}
        submitButtonText={{ default: "ثبت", loading: "در حال ثبت..." }}
        title="ویرایش جابه جایی حق تقدم"
      />
    </>
  );
};

export default EditDisplacmentForm;
