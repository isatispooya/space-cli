import { Forms } from "../../../components";
import * as yup from "yup";
import { EmploymentsPostType } from "../types";
import { useCompany } from "../../companies";
import { CompanyType } from "../../companies/types";
import { useEmployments } from "../hooks";
import { FormikHelpers } from "formik";
import toast from "react-hot-toast";
import { FormFieldType } from "@/types";

const EmploymentsCreateForm = () => {
  const { data: companies } = useCompany.useGet();
  const { mutate: postJobOffer } = useEmployments.usePostJobOffer();

  const validationSchema = yup.object({
    job_title: yup.string().required("عنوان شغل الزامی است"),
    job_location: yup.string().required("مکان شغل الزامی است"),
    job_description: yup.string().required("شرح شغل الزامی است"),
    eligibility_criteria: yup.string().required("شرایط احزار الزامی است"),
    experience: yup.string().required("سابقه کار الزامی است"),
    kind_of_job: yup.string().required("نوع شغل الزامی است"),
    company: yup.string().required("شرکت الزامی است"),
    gender: yup.string().required("جنسیت الزامی است"),
    expiration_date: yup.string().required("تاریخ انقضا الزامی است"),
    is_active: yup.boolean().required("وضعیت الزامی است"),
    picture: yup.mixed<File>().required("عکس الزامی است"),
  });

  const kindOfJobs = [
    { label: "تمام وقت", value: "full_time" },
    { label: "پاره وقت", value: "part_time" },
    { label: "قراردادی", value: "contract" },
    { label: "کارآموزی", value: "work_study" },
    { label: "بین المللی", value: "intership" },
  ];

  const formFields: FormFieldType[] = [
    {
      name: "job_title",
      label: "عنوان شغل",
      type: "text" as const,
    },
    {
      name: "job_location",
      label: "مکان شغل",
      type: "text" as const,
    },
    {
      name: "job_description",
      label: "شرح شغل",
      type: "text" as const,
    },
    {
      name: "kind_of_job",
      label: "نوع شغل",
      type: "select" as const,
      options: kindOfJobs,
    },
    {
      name: "eligibility_criteria",
      label: "شرایط احزار",
      type: "text" as const,
    },
    {
      name: "expiration_date",
      label: "تاریخ انقضا",
      type: "date" as const,
    },
    {
      name: "experience",
      label: "سابقه کار",
      type: "text" as const,
    },
    {
      name: "company",
      label: "شرکت",
      type: "select" as const,
      options:
        companies?.flatMap((company: CompanyType[]) =>
          company.map((c) => ({
            label: c.name,
            value: c.id.toString(),
          }))
        ) || [],
    },
    {
      name: "gender",
      label: "جنسیت",
      type: "select" as const,
      options: [
        { label: "مرد", value: "male" },
        { label: "زن", value: "female" },
        { label: "هر دو", value: "both" },
      ],
    },
    {
      name: "picture",
      label: "عکس",
      type: "file" as const,
    },
  ];

  const initialValues: EmploymentsPostType = {
    job_title: "",
    job_location: "",
    job_description: "",
    eligibility_criteria: "",
    experience: "",
    kind_of_job: "",
    company: "",
    gender: "",
    expiration_date: "",
    is_active: false,
    picture: null,
  };

  const handleSubmit = async (
    values: EmploymentsPostType,
    { setSubmitting }: FormikHelpers<EmploymentsPostType>
  ) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      const value = values[key as keyof EmploymentsPostType];
      if (key === "picture") {
        const fileInput = document.querySelector(
          `input[name="${key}"]`
        ) as HTMLInputElement;
        const file = fileInput?.files?.[0];
        if (file) formData.append(key, file);
      } else if (value) {
        formData.append(key, String(value));
      }
    });

    postJobOffer(formData, {
      onSuccess: () => {
        toast.success("آگهی شغلی با موفقیت ایجاد شد");
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <>
      <Forms
        formFields={formFields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        colors="text-[#29D2C7]"
        buttonColors="bg-[#29D2C7] hover:bg-[#29D2C7]"
        showCloseButton={true}
        onSubmit={handleSubmit}
        submitButtonText={{ default: "ثبت", loading: "در حال ثبت..." }}
        title="ثبت آگهی شغل"
      />
    </>
  );
};

export default EmploymentsCreateForm;
