import { useMutation } from "@tanstack/react-query";
import { displacementPrecendenceDelete } from "../services";

const useDelDisplacment = () => {
  return useMutation({
    mutationFn: (id: number) => displacementPrecendenceDelete(id),
    mutationKey: ["delete-displacement"],
  });
};

export default useDelDisplacment;
