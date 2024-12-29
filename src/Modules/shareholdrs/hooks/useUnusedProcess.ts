import { useQuery } from "@tanstack/react-query";
import { unnusedProcess } from "../services";

const useUnusedProcess = {
  useGetList: () => {
    return useQuery({
      queryKey: ["unused-process"],
      queryFn: unnusedProcess.getList,
    });
  },
};

export default useUnusedProcess;
