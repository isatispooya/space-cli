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

export const useReceiveById = (id: string) => {
  const receiveQuery = useQuery({
    queryKey: ["receiveById", id],
    queryFn: () => receiveSer.getReceiveById(id),
  });
  return { data: receiveQuery.data };
};
