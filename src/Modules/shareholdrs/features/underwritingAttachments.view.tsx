import { useUnusedProcess } from "../hooks";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";

const UnderwritingAttachmentsView = () => {
  const { data } = useUnusedProcess.useGetList();
  const appendixData = data?.[0]?.appendices_data;

  if (!appendixData) return null;

  const appendixItems = [appendixData];

  return (
    <div className="relative flex w-full max-w-2xl flex-col rounded-lg border border-slate-200 bg-white shadow-lg">

      <nav className="flex min-w-[240px] flex-col gap-2 p-3">
        {appendixItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            role="button"
            className="group flex w-full items-center rounded-xl p-4 transition-all hover:bg-slate-50 hover:shadow-md"
            onClick={() => window.open(item.file, "_blank")}
          >
            <div className="mr-4 grid place-items-center">
              <div className="relative inline-block h-14 w-14 rounded-xl bg-[#5677BC] text-white grid place-items-center shadow-lg shadow-[#5677BC]/20">
                <span className="text-xl font-medium">
                  {item.name.charAt(0)}
                </span>
              </div>
            </div>
            <div className="flex-grow">
              <h6 className="text-slate-800 font-medium text-lg mb-1">
                {item.name}
              </h6>
              <p className="text-slate-400 text-sm">
                {new Date(item.created_at).toLocaleDateString("fa-IR")}
              </p>
            </div>
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex items-center gap-2 text-[#5677BC] bg-[#5677BC]/10 px-4 py-2 rounded-lg">
                <FiDownload className="w-5 h-5" />
                <span className="text-sm font-medium">دانلود</span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </nav>
    </div>
  );
};

export default UnderwritingAttachmentsView;
