import { Button, FileInput, Toast } from "@/components";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSymbols } from "../../hooks";
import { SymbolsType } from "../../types";
import { Check, X } from "lucide-react";

const InvestDocument = () => {
  const [file, setFile] = useState<File | null>(null);
  const { mutate: postInvestDocument, isPending } =
    useSymbols.usePostInvestDocument();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file_csv", file);
    postInvestDocument(
      formData as unknown as SymbolsType["investDocumentReq"],
      {
        onSuccess: () => {
          Toast("بارگذاری با موفقیت انجام شد", <Check />, "bg-green-500");
        },
        onError: () => {
          Toast("بارگذاری با خطا مواجه شد", <X />, "bg-red-500");
        },
      }
    );
  };
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-md mx-auto p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100"
    >
      <FileInput
        label="فایل سند سرمایه گذاری"
        value={file}
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        disabled={false}
        className="mb-10"
        accept="application/pdf/csv"
        onClear={() => setFile(null)}
      />
      <Button
        type="submit"
        disabled={isPending || !file}
        onClick={handleSubmit}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-2 px-2 bg-[#29D2C7] text-white font-semibold rounded-xl hover:bg-[#008282] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {isPending ? "بارگذاری..." : "بارگذاری"}
        </motion.span>
      </Button>
    </motion.div>
  );
};

export default InvestDocument;
