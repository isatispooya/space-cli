import { useMutation } from "@tanstack/react-query";
import { displacementPrecendencePatch } from "../services";
import { DisplacementPrecendenceTypes } from "../types";

interface UpdateParams {
  data: DisplacementPrecendenceTypes;
  id: number;
}

const useUpdateDisplacment = () => {
  return useMutation({
    mutationKey: ["update-displacement"],
    mutationFn: ({ data, id }: UpdateParams) =>
      displacementPrecendencePatch(data, id),
  });
};

export default useUpdateDisplacment;
