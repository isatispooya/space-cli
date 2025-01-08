import { motion } from "framer-motion";

import { useDashboard } from "../hooks";
import { IoIosArrowBack } from "react-icons/io";

import crowdImg from "../../../../public/assets/crowdlogo.png";
import usePostUUID from "../hooks/useuuidpost";
import toast from "react-hot-toast";

const getMotionDivStyles = () => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  className:
    "relative bg-white rounded-xl shadow-lg p-6 h-full transition-shadow duration-300 hover:shadow-2xl",
  style: { zIndex: 1 },
});

const formatValue = (value: number) => {
  const length = value.toString().length;

  if (length > 9) {
    const billionValue = Math.floor(value / 1000000000);
    return (
      <>
        {billionValue}
        <span className="text-sm text-[#4b0082] font-iranSans"> میلیارد</span>
        <span className="text-sm text-[#4b0082] font-iranSans"> ریال</span>
      </>
    );
  } else if (length > 6) {
    const millionValue = Math.floor(value / 1000000);
    return (
      <>
        {millionValue}
        <span className="text-sm text-[#4b0082] font-iranSans"> میلیون</span>
        <span className="text-sm text-[#4b0082] font-iranSans"> ریال</span>
      </>
    );
  } else if (length > 3) {
    const thousandValue = Math.floor(value / 1000);
    return (
      <>
        {thousandValue}
        <span className="text-sm text-[#4b0082] font-iranSans"> هزار</span>
        <span className="text-sm text-[#4b0082] font-iranSans"> ریال</span>
      </>
    );
  }
  return value;
};

const DashboardCrowdStat = () => {
  const { data: stats } = useDashboard.useGetStats();
  const { mutate: crowdUUID } = usePostUUID();

  const handleCrowdUUID = () => {
    crowdUUID(undefined, {
      onSuccess: (response) => {
        console.log("Response:", response.data.uuid);
        const crowdUUIDLink = `https://app.isatiscrowd.com/onetimeLogin/${response.data.uuid}`;
        window.open(crowdUUIDLink, "_blank");
      },
      onError: (error) => {
        toast.error(`خطایی رخ داده است: ${error.message}`);
      },
    });
  };


  return (
    <div>
      <div className="background">
        {/* پس‌زمینه */}
      </div>

      <motion.div {...getMotionDivStyles()}>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center">
            <img src={crowdImg} alt="crowd" className="w-12 h-12" />
            <h3 className="text-sm text-[#4b0082] font-bold font-iranSans">
              {stats?.crowd?.["title"] || "ایساتیس کراد"}
            </h3>
          </div>
        </div>

        <div className="mb-1">
          <motion.p
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="text-[11px] font-bold text-[#4b0082] mb-2 font-iranSans"
          >
            {stats?.crowd?.["total value"] || "مجموع تامین مالی جمعی"}
          </motion.p>
          <div className="text-center">
            <motion.p
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="text-4xl md:text-6xl lg:text-8xl font-bold text-[#4b0082] mt-4 font-iranSans overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {stats?.crowd?.["total value"] === 0 ? (
                <>
                  0
                  <span className="text-sm text-[#4b0082] font-iranSans">
                    {" "}
                    ریال
                  </span>
                </>
              ) : (
                formatValue(stats?.crowd?.["total value"] || 0)
              )}
            </motion.p>
          </div>
          <a onClick={handleCrowdUUID}>
            <motion.button
              onClick={handleCrowdUUID}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-purple-900 hover:bg-purple-700 text-white py-1 px-2 rounded-lg 
                       font-iranSans duration-200 flex items-center justify-center gap-1 text-sm"
            >
              <span className="text-white font-bold">پنل کراد</span>
              <IoIosArrowBack className="w-3 h-3" />
            </motion.button>
          </a>
        </div>

        <svg
          className="absolute bottom-0 rounded-xl left-0 w-full h-32 md:h-48"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ zIndex: -1 }}
        >
          <path
            fill="#4b0082"
            fillOpacity="0.3"
            d="M0,160L48,170.7C96,181,192,203,288,213.3C384,224,480,224,576,213.3C672,203,768,181,864,170.7C960,160,1056,160,1152,170.7C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </motion.div>
    </div>
  );
};

export default DashboardCrowdStat;
