import { motion } from "framer-motion";
import DashboardCard from "../../dashboard/components/DashboardCard";
import { SymbolsType } from "../types";
import useSymbols from "../hooks/useSymbols";
import usePostFaraSahm from "../../dashboard/hooks/useFarasahm";
import { FaChartLine } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { toast } from "react-hot-toast";
import useConsultingReserveTurnUser from "@/Modules/consultation/hooks/admin/useConsultingReserveTurnUser";
type WaveColor = "blue" | "purple" | "green" | "orange" | "red" | "dark";
import farasahm from "@/assets/logo/farasahm.png";

interface FaraSahmResponse {
  cookie: string;
  [key: string]: unknown;
}

export const ToolsFeat: React.FC = () => {
  const { data: symbols } = useSymbols.useGetSymbols();
  const faraSahm = usePostFaraSahm();
  const { data } =
    useConsultingReserveTurnUser.useGetConsultingReserveTurnUser();
  console.log(data);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getCardColor = (description: string): WaveColor => {
    if (description.includes("درآمد ثابت")) return "green";
    if (description.includes("در سهام")) return "blue";
    return "purple";
  };

  const getButtonColors = (waveColor: WaveColor) => {
    switch (waveColor) {
      case "green":
        return {
          background: "#16a34a",
          hoverBackground: "#15803d",
          text: "white",
        };
      case "blue":
        return {
          background: "#1e40af",
          hoverBackground: "#1d4ed8",
          text: "white",
        };
      case "purple":
        return {
          background: "#7e22ce",
          hoverBackground: "#9333ea",
          text: "white",
        };
      default:
        return {
          background: "#1e40af",
          hoverBackground: "#1d4ed8",
          text: "white",
        };
    }
  };

  const handleFaraSahmClick = () => {
    faraSahm.mutate(undefined, {
      onSuccess: (response: FaraSahmResponse) => {
        const faraSahmLink = `https://farasahm.fidip.ir/loginspace/${response.cookie}/`;
        window.open(faraSahmLink, "_blank");
      },
      onError: (error: Error) => {
        toast.error(`خطایی رخ داده است: ${error.message}`);
        window.location.href = "https://farasahm.fidip.ir/";
      },
    });
  };

  const staticCards = [
    {
      id: "farasahm",
      title: "فراسهم",
      icon: <img src={farasahm} alt="fara" className="w-18 h-18" />,
      iconColor: "#16a34a",
      waveColor: "blue" as WaveColor,
      buttonText: "مشاهده",
      buttonLink: "#",
      isExternalLink: false,
      onButtonClick: handleFaraSahmClick,
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-lg font-bold">ابزار تحلیل فراسهم</p>
        </div>
      ),
    },
    {
      id: "consulting",
      title: "مشاوره تخصصی",
      icon: <MdSupportAgent />,
      iconColor: "#7e22ce",
      waveColor: "purple" as WaveColor,
      buttonText: "درخواست",
      buttonLink: "/consultation/request",
      isExternalLink: false,
      content: (
        <div className="flex flex-col">
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-6xl font-bold text-[#7e22ce] font-iranSans mt-12">
              {data?.length || 0}
              <span className="text-base text-[#7e22ce] font-iranSans mr-1">
                عدد
              </span>
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full p-2 md:p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-10xl mx-auto">

        {staticCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="h-[26.5vh]"
          >
            <DashboardCard
              title={card.title}
              icon={card.icon}
              iconColor={card.iconColor}
              waveColor={card.waveColor}
              buttonText={card.buttonText}
              buttonLink={card.buttonLink}
              isExternalLink={card.isExternalLink || false}
              onButtonClick={card.onButtonClick}
              customColors={getButtonColors(card.waveColor)}
              content={card.content}
            />
          </motion.div>
        ))}

    
        {symbols?.map((symbol: SymbolsType["symbolRes"][0], index: number) => {
          const waveColor = getCardColor(symbol.description);
          return (
            <motion.div
              key={symbol.id}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              transition={{
                duration: 0.3,
                delay: (index + staticCards.length) * 0.1,
              }}
              className="h-[26.5vh]"
            >
              <DashboardCard
                title={symbol.description}
                icon={<FaChartLine />}
                iconColor={symbol.last_change >= 0 ? "#16a34a" : "#dc2626"}
                waveColor={waveColor}
                buttonText="مشاهده جزئیات"
                buttonLink={`/symbols/${symbol.id}`}
                isExternalLink={false}
                customColors={getButtonColors(waveColor)}
                content={
                  <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-lg font-bold">{symbol.symbol}</p>
                    <p className="text-2xl font-bold mt-2">
                      {symbol.last_price.toLocaleString()} ریال
                    </p>
                    <div
                      className={`mt-2 px-2 py-1 rounded-md ${
                        symbol.last_change >= 0
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      <span>
                        {symbol.last_change >= 0 ? "+" : ""}
                        {symbol.last_change.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                }
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ToolsFeat;
