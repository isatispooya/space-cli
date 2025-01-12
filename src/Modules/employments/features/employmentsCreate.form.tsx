import { Forms } from "../../../components";
import * as yup from "yup";
import { EmploymentsPostTypes } from "../types";
import { useCompany } from "../../companies";
import { useEmployments } from "../hooks";
import { FormField } from "../../companies/types";
import { useState } from "react";

const EmploymentsCreateForm = () => {
  const { data: companies } = useCompany.useGet();
  const { mutate: postJobOffer } = useEmployments.usePostJobOffer();

  const validationSchema = yup.object({
    job_title: yup.string(),
    job_location: yup.string(),
    job_description: yup.string(),
    eligibility_criteria: yup.string(),
    experience: yup.string(),
    kind_of_job: yup.string(),
    company: yup.string(),
    gender: yup.string(),
    expiration_date: yup.string(),
    is_active: yup.boolean(),
    picture: yup.mixed().test("fileType", "Invalid file type", (value) => {
      if (!value) return true; // Allow empty
      if (value instanceof File) {
        // Accept common image formats
        const acceptedTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/jpg",
        ];
        return acceptedTypes.includes(value.type);
      }
      return false;
    }),
  });

  const kindOfJobs = [
    { label: "تمام وقت", value: "full_time" },
    { label: "پاره وقت", value: "part_time" },
    { label: "قراردادی", value: "contract" },
    { label: "کارآموزی", value: "work_study" },
    { label: "بین المللی", value: "intership" },
  ];
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const formFields: FormField = [
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
        companies?.map((company: { name: string; id: number }) => ({
          label: company.name,
          value: company.id.toString(),
        })) || [],
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
      accept: "image/png, image/jpeg, image/gif",
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          console.log("File selected:", file);
          console.log("File type:", file.type);
          setSelectedFile(file);
          return file;
        } else {
          console.log("No file selected");
          setSelectedFile(null);
          return null;
        }
      },
    },
  ];

  const initialValues: EmploymentsPostTypes = {
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

  const onSubmit = async (values: EmploymentsPostTypes) => {
    try {
      const formData = new FormData();

      console.log("Selected file:", selectedFile);

      if (selectedFile) {
        formData.append("picture", selectedFile);
        console.log("Picture appended to FormData");
      } else {
        console.log("No picture selected");
      }

      Object.entries(values).forEach(([key, value]) => {
        if (key !== "picture" && value !== null) {
          formData.append(key, value.toString());
        }
      });

      console.log("FormData contents before submission:");
      for (let pair of formData.entries()) {
        console.log(pair[0], ":", pair[1]);
      }

      await postJobOffer(formData);
      console.log("Request completed successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
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
        title="ثبت آگهی شغل"
      />
    </>
  );
};

export default EmploymentsCreateForm;
