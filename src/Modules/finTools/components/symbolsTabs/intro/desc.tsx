import { Button, NoContent } from "@/components";
import { motion } from "framer-motion";
import { SymbolsType } from "../../../types";
import { useNavigate } from "react-router-dom";
import { server } from "@/api";
import { FiExternalLink, FiMessageCircle } from "react-icons/fi";
import { useConsultUser } from "@/Modules/consultation/hooks";
import { Calculator as CalculatorIcon } from "lucide-react";
import { useUserPermissions } from "@/Modules/permissions";
import toast from "react-hot-toast";
import usePostFaraSahm from "@/Modules/dashboard/hooks/useFarasahm";

interface FaraSahmResponseType {
  cookie: string;
  [key: string]: unknown;
}

const Details = ({
  symbol,
  onSwitchToCalculator,
}: {
  symbol: SymbolsType["symbolRes"][0] | undefined;
  onSwitchToCalculator: () => void;
}) => {
  const navigate = useNavigate();
  const { mutate: postSubject } = useConsultUser.usePostSubject();
  const { checkPermission } = useUserPermissions();
  const faraSahm = usePostFaraSahm();

  const HasFarasahmPermission = checkPermission(["view_all_introduce_symbols"]);

  if (!symbol) {
    return <NoContent label="هیچ صندوقی یافت نشد" />;
  }

  const handleConsultRequest = () => {
    if (!symbol.id) return;

    postSubject(
      { consultant_id: 1 },
      {
        onSuccess: () => {
          console.log("درخواست مشاوره با موفقیت ثبت شد");
          navigate("/consultation/requests");
        },
        onError: (err) => {
          console.error("خطا در ثبت درخواست مشاوره", err);
        },
      }
    );
  };

  const isFixedIncome = symbol.symbol_detail?.type === "fixincome";

  const handleFaraSahmClick = () => {
    faraSahm.mutate(undefined, {
      onSuccess: (response: FaraSahmResponseType) => {
        const faraSahmLink = `https://farasahm.fidip.ir/loginspace/${response.cookie}/`;
        window.open(faraSahmLink, "_blank");
      },
      onError: (error: Error) => {
        toast.error(`خطایی رخ داده است: ${error.message}`);
        window.location.href = "https://farasahm.fidip.ir/";
      },
    });
  };
  return (
    <motion.div
      key={symbol.id}
      className="flex-1 flex flex-col items-center justify-start overflow-hidden p-2 max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="mb-1 relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center p-4 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <img
            src={server + symbol.photo}
            alt={symbol.description || "ETF Logo"}
            className="h-16 w-auto object-contain z-10"
          />
        </div>
      </motion.div>

      {/* اطلاعات متنی */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.h1
          className="text-3xl font-bold mb-3 text-[#02205F] tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {symbol.description || "نام صندوق"}
        </motion.h1>

        <motion.div
          className="py-2 px-4 bg-blue-100 rounded-full text-blue-800 text-sm font-medium inline-block mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          {symbol.symbol || "نماد"}
        </motion.div>

        <motion.div
          className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mb-6"
          initial={{ width: 0 }}
          animate={{ width: "4rem" }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />

        <motion.p
          className="text-lg max-w-md leading-relaxed text-[#09193C] font-light mb-8 bg-white/50 p-4 rounded-xl shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {symbol.description || "توضیحات صندوق"}
        </motion.p>
      </motion.div>

      {/* دکمه‌ها */}
      <motion.div
        className="mt-2 grid grid-cols-3 gap-2 w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Button
          onClick={() => {
            if (symbol.link) {
              window.open(symbol.link, "_blank");
            }
          }}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:shadow-blue-100 hover:from-blue-600 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-1 py-1.5 px-3 text-sm"
        >
          <FiExternalLink className="w-3.5 h-3.5" />
          <span>خرید</span>
        </Button>

        <Button
          onClick={handleConsultRequest}
          className="border bg-white border-green-500 text-green-600 rounded-lg shadow-sm hover:bg-green-500 hover:text-white hover:shadow-green-100 transition-all duration-200 flex items-center justify-center gap-1 py-1.5 px-3 text-sm"
        >
          <FiMessageCircle className="w-3.5 h-3.5" />
          <span>مشاوره</span>
        </Button>

        {isFixedIncome && (
          <Button
            onClick={onSwitchToCalculator}
            className="border bg-white border-blue-500 text-blue-600 rounded-lg shadow-sm hover:bg-blue-500 hover:text-white hover:shadow-blue-100 transition-all duration-200 flex items-center justify-center gap-1 py-1.5 px-3 text-sm"
          >
            <CalculatorIcon />
            <span>ماشین حساب سود</span>
          </Button>
        )}
        {HasFarasahmPermission && (
          <Button
            onClick={handleFaraSahmClick}
            className="border bg-white border-blue-500 text-blue-600 rounded-lg shadow-sm hover:bg-blue-500 hover:text-white hover:shadow-blue-100 transition-all duration-200 flex items-center justify-center gap-1 py-1.5 px-3 text-sm"
          >
            <img src={farasahm} alt="farasahm" className="w-4 h-4" />
            <span>رفتن به فراسهم</span>
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Details;
