

import { useQuery } from "@tanstack/react-query";
import getUpdatePosition from "../services/position.updateget";

export const useGetUpdatePosition = (id: number) => {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["position", id],
    queryFn: () => getUpdatePosition(id), 
  });

  return { data, isLoading, isPending };
};


