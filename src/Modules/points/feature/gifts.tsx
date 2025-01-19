import { useNavigate } from "react-router-dom";
import { useGifts } from "../hooks";
import { server } from "../../../api";
import GiftCard from "../components/gift.card";

const Gifts = () => {
  const navigate = useNavigate();

  const { data: gifts } = useGifts.useGetGifts();
  const { mutate: postGift } = useGifts.usePostGift();

  const giftsData = [
    ...(Array.isArray(gifts)
      ? gifts.map((mission) => ({
          point_2: mission.point_2,
          point_1: mission.point_1,
          id: mission.id,
          display_name: mission.display_name || "Default Title",
          description: mission.description,
          onNavigate: () => {
            navigate("/");
          },
          image: server + mission.image,
          link: mission.link,
          status: mission.status,
          user_attempts: mission.user_attempts,
        }))
      : []),
  ];

  return (
    <div>
      <div>
        <div className="bg-white p-4 rounded-xl  ">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            سهام شرکت صنایع مفتول ایساتیس پویا
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
              شما می‌توانید در باشگاه مشتریان صنایع مفتول ایساتیس پویا امتیازات کسب شده تا کنون را در موارد پیشنهادی زیر مورد استفاده قرار دهید.
          </p>
        </div>
      </div>
      <GiftCard gifts={giftsData} postGift={postGift} />
    </div>
  );
};

export default Gifts;
