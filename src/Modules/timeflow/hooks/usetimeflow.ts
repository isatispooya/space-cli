import { useQuery } from "@tanstack/react-query";
import { timeflowServices } from "../service";

const useTimeflow = {
  useGetUsersLogin: () => {
    return useQuery({
      queryKey: ["users-login"],
      queryFn: () => timeflowServices.getUsersLogin(),
    });
  },
};

export default useTimeflow;
