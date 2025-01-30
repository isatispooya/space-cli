import { FormField } from "../../../../types";
import { useState } from "react";

export const InsuranceapplicationCreate: React.FC = () => {
  const [formFields, setFormFields] = useState<FormField[]>([
    { name: "file_titles", label: "فایل بارگذاری کرد", type: "file" as const },
  ]);

  const [insuranceType, setInsuranceType] = useState<string>("");

  console.log(insuranceType);
  const handleInsuranceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedInsurance = event.target.value;
    setInsuranceType(selectedInsurance);

    let newFields: FormField[] = [];

    if (selectedInsurance === "insurance1") {
      newFields = [
        ...newFields,
        ...Array(4)
          .fill(null)
          .map((_, index) => ({
            name: `file_titles_${index}`,
            label: `عناوین فایل ${index + 1}`,
            type: "file" as const,
          })),
      ];
    } else if (selectedInsurance === "insurance2") {
      newFields = [
        ...newFields,
        ...Array(2)
          .fill(null)
          .map((_, index) => ({
            name: `file_titles_${index}`,
            label: `عناوین فایل ${index + 1}`,
            type: "file" as const,
          })),
      ];
    }

    setFormFields(newFields);
  };

  const onSubmit = () => {
    console.log("Form Submitted");
  };

  return (
    <div className="flex flex-col items-center justify-start p-8 rounded-2xl shadow-2xl bg-white w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-[#29D2C7] drop-shadow-lg">
        ایجاد بیمه
      </h2>
      <div className="w-full space-y-6">
        <select
          name="insurance_name"
          onChange={handleInsuranceChange}
          className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#29D2C7] shadow-sm"
        >
          <option value="">انتخاب بیمه</option>
          <option value="insurance1">بیمه ۱</option>
          <option value="insurance2">بیمه ۲</option>
          <option value="insurance3">بیمه ۳</option>
          <option value="insurance4">بیمه ۴</option>
          <option value="insurance5">بیمه ۵</option>
        </select>
        {formFields.map((field) => (
          <div
            key={field.name}
            className="flex flex-col items-start gap-2 bg-white p-4 rounded-lg  hover:shadow-lg transition-shadow duration-300"
          >
            <label className="text-sm font-semibold">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.label}
              className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#29D2C7] shadow-sm"
            />
          </div>
        ))}
        <button
          onClick={onSubmit}
          className="w-full bg-[#29D2C7] text-white py-3 rounded-xl shadow-md hover:bg-[#29D2C7] hover:shadow-lg transition-transform duration-300 font-semibold text-lg"
        >
          ایجاد بیمه
        </button>
      </div>
    </div>
  );
};

export default InsuranceapplicationCreate;
