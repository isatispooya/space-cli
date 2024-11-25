import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../service";

export const useProfile = () => {

  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
};

export default useProfile;
