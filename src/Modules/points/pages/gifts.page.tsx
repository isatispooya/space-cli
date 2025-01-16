import ComingSoon from "../../../components/comingSoon";
// import { Gifts } from "../feature";
import { useGifts } from "../hooks";

const GiftsPage = () => {
  const { data } = useGifts.useGetGifts();

  console.log(data);
  return <ComingSoon />;
};

export default GiftsPage;
