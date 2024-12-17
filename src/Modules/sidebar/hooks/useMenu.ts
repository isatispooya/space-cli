import { useQuery } from "@tanstack/react-query";
import { getMenu } from "../services/menu.get";

export const useMenu = () => {
  const { data } = useQuery({
    queryKey: ["menu"],
    queryFn: getMenu,
  });

  return { data };
};
