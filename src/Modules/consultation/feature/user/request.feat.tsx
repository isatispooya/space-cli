// import { Forms } from "@/components";
// import { object, string, date } from "yup";

// const validationSchema = object({
//   consultationType: string().required("نوع مشاوره الزامی است"),
//   consultationDate: date().required("تاریخ مشاوره الزامی است"),
//   subject: string().required("موضوع مشاوره الزامی است"),
//   consulterId: string().required("انتخاب مشاور الزامی است"),
// });

// const initialValues = {
//   consultationType: "",
//   consultationDate: null,
//   subject: "",
//   consulterId: "",
// };

// const ConsultationRequest = () => {
//   const formFields = [
//     {
//       name: "consultationType",
//       label: "نوع مشاوره",
//       type: "select",
//       options: [
//         { value: "online", label: "آنلاین" },
//         { value: "meet", label: "حضوری" },
//         { value: "phone", label: "تماس تلفنی" },
//       ],
//     },
//     {
//       name: "consultationDate",
//       label: "تاریخ مشاوره",
//       type: "date",
//     },
//     {
//       name: "subject",
//       label: "موضوع مشاوره",
//       type: "text",
//     },
//     {
//       name: "consulterId",
//       label: "انتخاب مشاور",
//       type: "select",
//       options: [
//         { value: "1", label: "مشاور 1" },
//         { value: "2", label: "مشاور 2" },
//         { value: "3", label: "مشاور 3" },
//       ],
//     },
//   ];

//   const handleSubmit = async (values: typeof initialValues) => {
//     try {
//       console.log("Form submitted with values:", values);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   return (
//     <Forms
//       formFields={formFields}
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//       title="درخواست مشاوره"
//       submitButtonText={{
//         default: "ثبت درخواست",
//         loading: "در حال ثبت...",
//       }}
//       colors="text-primary-600"
//       buttonColors="bg-primary-600 hover:bg-primary-700"
//     />
//   );
// };

// export default ConsultationRequest;
