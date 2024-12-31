import { useMutation } from "@tanstack/react-query";
import { changeOldPassType } from "../types";
import { changeOldPass } from "../services";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}

const useChangeOldPass = () => {
  return useMutation<void, AxiosError<ErrorResponse>, changeOldPassType>({
    mutationKey: ["changeOldPasss"],
    mutationFn: changeOldPass,
  });
};

export default useChangeOldPass;
