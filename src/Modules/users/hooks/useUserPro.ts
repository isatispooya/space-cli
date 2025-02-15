import { useQuery } from "@tanstack/react-query";
import { UserPro } from "../services";

const useUserPro = {
  useUsers: () => {
    return useQuery({
      queryKey: ["userPro"],
      queryFn: UserPro.getUsers,
    });
  },
  useUser: (id: number) => {
    return useQuery({
      queryKey: ["userPro", id],
      queryFn: () => UserPro.getUser(id),
    });
  },
};

export default useUserPro;
