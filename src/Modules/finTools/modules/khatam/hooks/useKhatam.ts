import { useQuery } from "@tanstack/react-query";
import { KhatamServices } from "../services";

const useKhatam = {
  useGetSymbols: () => {
    return useQuery({
      queryKey: ["khatam-symbols"],
      queryFn: KhatamServices.getSymbols,
    });
  },
};

export default useKhatam;
