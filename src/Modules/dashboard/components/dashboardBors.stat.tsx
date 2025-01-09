import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { useDashboard } from "../hooks";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, TooltipItem } from 'chart.js';
// Register the ArcElement
ChartJS.register(ArcElement);

interface PortfolioItem {
  Symbol: string;
  VolumeInPrice: string | number;
}

const getMotionDivStyles = () => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  className: "relative bg-white rounded-lg shadow-md p-2 h-full transition-shadow duration-300 hover:shadow-lg transform hover:scale-105",
  style: { zIndex: 2 }
});

const DashboardBorsStat = () => {
  const { data } = useDashboard.useGetStats();
  console.log(data);

  const title = data?.title || "کارگزاری ایساتیس پویا (بورس)";

  // داده‌های جدید برای چارت
  const chartData = {
    labels: data?.protfolio ? data.protfolio.map((item: PortfolioItem) => item.Symbol) : ['نبابک1', 'سیسکو1'],
    datasets: [
      {
        data: data?.protfolio ? data.protfolio.map((item: PortfolioItem) => parseInt(item.VolumeInPrice.toString())) : [606400, 19532800],
        backgroundColor: ['#ff6384', '#36a2eb'],
        hoverBackgroundColor: ['#ff6384', '#36a2eb'],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context: TooltipItem<'doughnut'>) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = ((value / context.dataset.data.reduce((a, b) => a + b, 0)) * 100).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          },
          labelTextColor: function() {
            return '#000000';
          }
        }
      }
    }
  };

  return (
    <div className="container mx-auto px-1">
      <div className="background">
        {/* پس‌زمینه */}
      </div>

      <motion.div {...getMotionDivStyles()}>
        <div className="flex flex-wrap mr-2 items-center justify-between space-x-1">
          <div className="flex items-center">
            <img src="public/Artboard 1 copy 16.png" alt="بورس آیکن" className="w-12 h-12" />
            <h3 className="text-base text-[#1e40af] font-bold font-iranSans">
              {title}
            </h3>
          </div>
        </div>

        <div className="mb-4 flex justify-center items-center relative">
          <Doughnut data={chartData} options={chartOptions} />
          <div className="absolute bottom-[-10px] left-0 right-0 flex flex-row items-center justify-center space-x-1 mt-4">
            {data?.bourse?.protfolio ? data.bourse.protfolio.map((item: PortfolioItem, index: number) => (
              <div key={index} className="flex items-center space-x-1 text-xs">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}></span>
                <span className="font-bold">{item.Symbol}:</span>
                <span>{item.VolumeInPrice}</span>
              </div>
            )) : null}
          </div>
        </div>

        <a href="https://ipb.ir" target="_blank" className="mt-4 block">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-900 hover:bg-blue-700 text-white py-1 px-1 rounded-md 
                       font-iranSans duration-200 flex items-center justify-center gap-1 text-xs"
          >
            <span className="text-white font-bold">پنل بورس</span>
            <IoIosArrowBack className="w-3 h-3" />
          </motion.button>
        </a>

        <svg
          className="absolute bottom-0 rounded-lg left-0 w-full h-16 md:h-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          width="100%"
          style={{ zIndex: -1 }}
        >
          <path
            fill="#1e40af"
            fillOpacity="0.3"
            d="M0,224L48,213.3C96,203,192,181,288,192C384,203,480,245,576,245.3C672,245,768,203,864,186.7C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </motion.div>
    </div>
  );
};

export default DashboardBorsStat;
