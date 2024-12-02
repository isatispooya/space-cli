import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { createCorrespondence } from "../services";
import { CreateCorrespondenceDTO } from "../types";

const useCreateCorrespondence = () => {
  return useMutation({
    mutationFn: (data: CreateCorrespondenceDTO) => createCorrespondence(data),
    onSuccess: () => {
      message.success("مکاتبه با موفقیت ایجاد شد");
    },
  });
};

export default useCreateCorrespondence;
