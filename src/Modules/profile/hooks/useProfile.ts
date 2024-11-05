import { useQuery } from "@tanstack/react-query";
import api from "../../../api/api";
import { server } from "../../../api/server";

const getProfile = async () => {
  const response = await api.get(`${server}/user/profile/`);
  return response.data;
};

export const useProfile = (data) => {
  return useQuery({
    queryKey: ["profile" , data],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
};

export default useProfile;
