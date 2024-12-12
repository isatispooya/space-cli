import { useMutation } from "@tanstack/react-query";
import { patchShareholders } from "../services";
import { ShareholdersTypes } from "../types";

interface UpdateShareholdersTypes {
  id: number;
  data: ShareholdersTypes;
}

const useUpdateShareholders = () => {
  return useMutation({
    mutationKey: ["updateShareholders"],
    mutationFn: ({ id, data }: UpdateShareholdersTypes) =>
      patchShareholders(id, data),
  });
};

export default useUpdateShareholders;
