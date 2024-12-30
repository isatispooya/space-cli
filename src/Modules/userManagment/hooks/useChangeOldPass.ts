import { useMutation } from "@tanstack/react-query";
import { changeOldPassType } from "../types";
import { changeOldPass } from "../services";

const useChangeOldPass = () => {
  return useMutation<void, Error, changeOldPassType>({
    mutationKey: ["changeOldPasss"],
    mutationFn: changeOldPass,
  });
};
export default useChangeOldPass;
