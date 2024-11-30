import { useMutation } from "@tanstack/react-query";
import patchOldPass from "../services/changeOldPass.patch";
import { changeOldPassType } from "../services/changeOldPass.patch";

const useChangeOldPass = () => {
  return useMutation<void, Error, changeOldPassType>({
    mutationKey: ["changeOldPasss"],
    mutationFn: patchOldPass,
  });
};

export default useChangeOldPass;
