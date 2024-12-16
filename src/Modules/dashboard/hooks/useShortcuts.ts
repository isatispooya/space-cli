import { useQuery } from "@tanstack/react-query";
import { GetShortcuts } from "../services";

 const useShortcuts = () => {
  return useQuery({
    queryKey: ["shortcuts"],
    queryFn: GetShortcuts,
  });
};

export default useShortcuts;
