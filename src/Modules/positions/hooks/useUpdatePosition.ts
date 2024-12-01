import { useMutation } from "@tanstack/react-query";
import { patchPosition } from "../services";
import { PatchPositionParams } from "../types";

const useUpdatePosition = (id: number) => {
  return useMutation({
    mutationKey: ["update-position", id],
    mutationFn: (data: PatchPositionParams) => patchPosition({ ...data, id }),
  });
};

export default useUpdatePosition;