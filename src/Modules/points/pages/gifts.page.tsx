import { Gifts } from "../feature";
import { useGifts } from "../hooks";

const GiftsPage = () => {
  const { data } = useGifts.useGetGifts();

  console.log(data);
  return <Gifts />;
};

export default GiftsPage;
