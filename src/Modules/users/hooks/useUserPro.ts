import { useQuery } from "@tanstack/react-query";
import { UserPro } from "../services";

const useUserPro = () => {
  return useQuery({
    queryKey: ["userPro"],
    queryFn: UserPro,
  });
};

export default useUserPro;
