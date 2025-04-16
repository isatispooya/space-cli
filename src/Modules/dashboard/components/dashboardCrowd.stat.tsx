import { motion } from "framer-motion";
import { useDashboard } from "../hooks";
import { IoIosArrowBack } from "react-icons/io";
import crowdImg from "../../../../public/assets/crowdlogo.png";
import usePostUUID from "../hooks/useuuidpost";
import toast from "react-hot-toast";

const formatValue = (value: number) => {
  const length = value.toString().length;

  if (length > 9) {
    const billionValue = Math.floor(value / 1000000000);
    return (
      <>
        {billionValue}
        <span className="text-base text-[#4b0082] font-iranSans"> میلیارد</span>
        <span className="text-base text-[#4b0082] font-iranSans"> ریال</span>
      </>
    );
  } else if (length > 6) {
    const millionValue = Math.floor(value / 1000000);
    return (
      <>
        {millionValue}
        <span className="text-base text-[#4b0082] font-iranSans"> میلیون</span>
        <span className="text-base text-[#4b0082] font-iranSans"> ریال</span>
      </>
    );
  } else if (length > 3) {
    const thousandValue = Math.floor(value / 1000);
    return (
      <>
        {thousandValue}
        <span className="text-base text-[#4b0082] font-iranSans"> هزار</span>
        <span className="text-base text-[#4b0082] font-iranSans"> ریال</span>
      </>
    );
  }
  return value;
};

const DashboardCrowdStat = () => {
  const { data: stats } = useDashboard.useGetCrowd();
  const { mutate: crowdUUID } = usePostUUID();

  const totalValue = Number(stats?.["total value"]);

  const handleCrowdUUID = () => {
    crowdUUID(undefined, {
      onSuccess: (response) => {
        const crowdUUIDLink = `https://app.isatiscrowd.ir/onetimeLogin/${response.uuid}`;
        window.open(crowdUUIDLink, "_blank");
      },
      onError: (error) => {
        toast.error(`خطایی رخ داده است: ${error.message}`);
        window.location.href = "https://app.isatiscrowd.ir/login";
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white rounded-xl shadow-md p-4 w-full h-full overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col"
    >
      <div className="flex items-center mb-3">
        <img src={crowdImg} alt="crowd" className="w-10 h-10" />
        <h3 className="text-base text-[#4b0082] font-bold font-iranSans mr-2">
          {"ایساتیس کراد"}
        </h3>
      </div>

      <div className="flex-grow">
        <p className="text-sm font-bold text-[#4b0082] font-iranSans">
          {stats?.["total value"]
            ? "مجموع تامین مالی جمعی"
            : "مجموع تامین مالی جمعی"}
        </p>
        <div className="text-center mt-3">
          <p className="text-6xl font-bold text-[#4b0082] font-iranSans overflow-hidden text-ellipsis whitespace-nowrap">
            {!totalValue ? (
              <>
                0
                <span className="text-base text-[#4b0082] font-iranSans">
                  {" "}
                  ریال
                </span>
              </>
            ) : (
              formatValue(totalValue)
            )}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-4 relative z-10">
        <motion.button
          onClick={handleCrowdUUID}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-purple-900 hover:bg-purple-700 text-white py-2 px-3 rounded-lg 
                    font-iranSans duration-200 flex items-center justify-center gap-2 text-base"
        >
          <span className="text-white font-bold">پنل کراد</span>
          <IoIosArrowBack className="w-4 h-4" />
        </motion.button>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ zIndex: 0 }}
      >
        <path
          fill="#4b0082"
          fillOpacity="0.3"
          d="M0,160L48,170.7C96,181,192,203,288,213.3C384,224,480,224,576,213.3C672,203,768,181,864,170.7C960,160,1056,160,1152,170.7C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </motion.div>
  );
};

export default DashboardCrowdStat;
