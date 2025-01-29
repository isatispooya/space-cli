import { FormField } from "../../../../types";
import { useState } from "react";

export const InsuranceCreate: React.FC = () => {
  const [formFields, setFormFields] = useState<FormField[]>([
    { name: "insurance_name", label: "نام بیمه", type: "text" as const },
    { name: "file_titles", label: "عناوین فایل‌ها", type: "text" as const },
  ]);

  const addField = () => {
    setFormFields([
      ...formFields,
      {
        name: `file_titles_${formFields.length}`,
        label: `عناوین فایل ${formFields.length + 1}`,
        type: "text" as const,
      },
    ]);
  };

  const removeField = (index: number) => {
    const updatedFields = formFields.filter((_, i) => i !== index);
    setFormFields(updatedFields);
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
        {formFields.map((field, index) => (
          <div
            key={field.name}
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <input
              type="text"
              name={field.name}
              placeholder={field.label}
              className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#29D2C7] shadow-sm"
            />
            {index >= 2 && (
              <button
                onClick={() => removeField(index)}
                className="flex items-center justify-center w-12 h-12 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 hover:shadow-lg transition-transform duration-200 hover:scale-110"
                title="حذف"
              >
                -
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addField}
          className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition-transform duration-200 hover:scale-110"
          title="افزودن"
        >
          +
        </button>
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

export default InsuranceCreate;
