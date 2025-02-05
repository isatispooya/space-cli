import { toast } from "react-hot-toast";

interface FormDetailProps {
  data: string;
  title: string;
  isCopied: boolean;
  setIsCopied: (isCopied: boolean) => void;
}

const FormDetail = ({
  data,
  title,
  isCopied,
  setIsCopied,
}: FormDetailProps) => {
  return (
    <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 shadow-md">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-800">{title}:</p>
          <p className="text-sm font-medium text-gray-900 bg-white px-4 py-2 rounded-md shadow-inner">
            {data}
          </p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(data || "");
              toast.success(`${title} با موفقیت کپی شد`);
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 2000);
            }}
            className={`px-4 py-2 ${
              isCopied ? "bg-green-500" : "bg-[#29D2C7]"
            } text-white rounded-md shadow hover:bg-[#25b2a8] transition-colors text-xs flex items-center`}
          >
            {isCopied ? "کپی شد!" : `کپی ${title}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormDetail;
