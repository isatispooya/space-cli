import { useQuery } from "@tanstack/react-query";
import { receiveSer } from "../../services/receive";

const useReceive = () => {
  const receiveQuery = useQuery({
    queryKey: ["receive"],
    queryFn: receiveSer.getReceive,
  });

  return { getReceive: () => receiveQuery };
};

export default useReceive;
