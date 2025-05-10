import { useUnusedProcess } from "../../hooks";
import { motion } from "framer-motion";
import { FiDownload, FiFileText } from "react-icons/fi";

interface AppendixItemType {
  id: number;
  file: string;
  name: string;
  status: string;
  created_at: string;
  link?: string;
}

const UnderwritingAttachmentsView = () => {
  const { data } = useUnusedProcess.useGetList();
  const appendixItems = data?.[0]?.appendices ? [data[0].appendices] : [];
  if (appendixItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <FiFileText className="w-16 h-16 text-slate-300 mb-4" />
        <p className="text-lg text-slate-500 font-medium">
          فایلی برای مشاهده وجود نداره
        </p>
      </div>
    );
  }
  const getFileFormat = (fileUrl: string) => {
    const format = fileUrl.split(".").pop()?.toUpperCase() || "";
    return format;
  };

  return (
    <div className="relative w-full  mx-auto flex-col rounded-2xl bg-gradient-to-br from-slate-50/80 to-white/90 p-8 ">
      <div className="grid grid-cols-3 gap-6">
        {appendixItems.map((item: AppendixItemType, index: number) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.15,
              type: "spring",
              stiffness: 100,
            }}
            className="group flex w-full items-center justify-between rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-slate-200"
          >
            <div className="flex flex-grow items-center">
              <div className="ml-5">
                <div
                  className={`relative inline-flex h-20 w-20 items-center justify-center rounded-3xl shadow-md ${
                    item.status === "error"
                      ? "bg-gradient-to-br from-red-100 via-red-200 to-red-300 text-red-600"
                      : item.status === "success"
                      ? "bg-gradient-to-br from-emerald-100 via-emerald-200 to-emerald-300 text-emerald-700"
                      : "bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300 text-indigo-700"
                  }`}
                >
                  <span className="font-extrabold text-xl tracking-wider">
                    {item.link ? "link" : getFileFormat(item.file)}
                  </span>
                </div>
              </div>
              <div>
                <h6 className="text-slate-800 font-bold text-lg mb-2 group-hover:text-indigo-600 transition-colors">
                  {item.name}
                </h6>
                <p className="text-slate-500 text-sm flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-slate-300"></span>
                  {new Date(item.created_at).toLocaleDateString("fa-IR")}
                </p>
              </div>
            </div>

            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-700 bg-slate-100 hover:bg-indigo-500 hover:text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <FiFileText className="w-5 h-5" />
                <span className="text-sm font-bold">مشاهده</span>
              </a>
            ) : (
              <a
                href={item.file}
                download
                className="flex items-center gap-2 text-slate-700 bg-slate-100 hover:bg-indigo-500 hover:text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <FiDownload className="w-5 h-5" />
                <span className="text-sm font-bold">دانلود</span>
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UnderwritingAttachmentsView;
