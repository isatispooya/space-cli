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
          is_repetitive: mission.is_repetitive,
        }))
      : []),
  ];

  console.log(
    "Mapped gifts data:",
    giftsData.map((g) => ({ id: g.id, is_repetitive: g.is_repetitive }))
  );

  return (
    <div>
      <div>
        <div className="bg-white p-4 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            سهام شرکت صنایع مفتول ایساتیس پویا
          </h2>
          <p className="text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
            با توجه به عضویت شما و انجام ماموریت‌ها می‌توانید امتیازات کسب شده
            سکه یا بذر خود را به هدایای زیر تبدیل کنید
          </p>
          <p className="text-green-500 font-semibold text-center max-w-2xl mx-auto leading-relaxed border border-green-300 p-1 rounded-md">
            توجه: بذرها و سکه‌های شما هرگز از بین نمی‌روند و می‌توانید در آینده
            از آن‌ها بهره‌برداری کنید!
          </p>
          <p className="text-gray-500 text-center max-w-3xl mx-auto leading-relaxed italic">
            با افزایش امتیازات خود، می‌توانید به جوایز جذاب‌تری دست یابید!
          </p>
        </div>
      </div>
      <GiftCard gifts={giftsData} postGift={postGift} />
    </div>
  );
};

export default Gifts;
