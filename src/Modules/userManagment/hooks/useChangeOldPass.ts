import { useMutation } from "@tanstack/react-query";
import { ChangeOldPassType } from "../types";
import { changeOldPass } from "../services";
import { AxiosError } from "axios";

interface ErrorResponseType {
  message: string;
}

const useChangeOldPass = () => {
  return useMutation<void, AxiosError<ErrorResponseType>, ChangeOldPassType>({
    mutationKey: ["changeOldPasss"],
    mutationFn: changeOldPass,
  });
};

export default useChangeOldPass;
