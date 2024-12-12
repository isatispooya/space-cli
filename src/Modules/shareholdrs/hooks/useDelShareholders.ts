import { useMutation } from "@tanstack/react-query";
import { deleteShareholders } from "../services";

const useDelShareholders = () => {
  return useMutation({
    mutationKey: ["deleteShareholders"],
    mutationFn: (id: number) => deleteShareholders(id),
  });
};

export default useDelShareholders;
