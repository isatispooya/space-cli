import { useQuery } from "@tanstack/react-query";
import { getUnusedPrecedenceProcess } from "../services";

const useUnusedPrecedenceProcess = () => {
  return useQuery({
    queryKey: ["unusedPrecedenceProcess"],
    queryFn: getUnusedPrecedenceProcess,
  });
};

export default useUnusedPrecedenceProcess;
