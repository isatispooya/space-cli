

import { useQuery } from "@tanstack/react-query";
import getUpdatePosition from "../services/position.updateget";

export const useGetUpdatePosition = (id: number) => {
  return useQuery({
    queryKey: ["position", id],
    queryFn: () => getUpdatePosition(id), 
  });
};


