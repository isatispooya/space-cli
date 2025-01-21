import {useQuery} from "@tanstack/react-query";
import {getUsers} from "../services";

const useUserData = () => {
  return useQuery({queryKey: ["users"], queryFn: getUsers});
};

export default useUserData;
