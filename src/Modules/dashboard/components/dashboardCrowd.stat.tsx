import { useDashboard } from "../hooks";
import { IoIosArrowBack } from "react-icons/io";
import crowdImg from "../../../../public/assets/crowdlogo.png";
import usePostUUID from "../hooks/useuuidpost";
import toast from "react-hot-toast";
import Card from "../../../components/cards/card";
import WaveEffect from "../../../ui/wave";
import "../../../ui/wave.css";
import { Button } from "@/components";

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

  const content = (
    <div className="flex flex-col h-full w-full p-4">
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

      <div className="mt-auto relative z-10 w-full">
        <Button
          variant="custom"
          customColors={{
            background: "#4b0082",
            hoverBackground: "#6b238e",
            text: "white",
          }}
          fullWidth
          animationOnHover="scale"
          animationOnTap="scale"
          rightIcon={<IoIosArrowBack className="w-4 h-4" />}
          className="font-iranSans text-base"
          onClick={handleCrowdUUID}
        >
          <span className="font-bold">پنل کراد</span>
        </Button>
      </div>
    </div>
  );

  return (
    <Card
      disableAnimation={true}
      className="relative bg-white rounded-xl shadow-md w-full h-full overflow-hidden transition-all duration-300 hover:shadow-xl wave-container"
      contentClassName="h-full p-0 flex flex-col"
      content={content}
      customStyles={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 0,
      }}
      padding="0"
      footerSlot={<WaveEffect color="purple" />}
    />
  );
};

export default DashboardCrowdStat;
