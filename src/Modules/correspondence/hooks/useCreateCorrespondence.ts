import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { correspondenceService } from "../services";
import { CorrespondenceTypes } from "../types";

const useCreateCorrespondence = () => {
  return useMutation({
    mutationKey: ["createCorrespondence"],
    mutationFn: (data: CorrespondenceTypes) => correspondenceService.create(data),
    onSuccess: () => {
      message.success("مکاتبه با موفقیت ایجاد شد");
    },
  });
};

export default useCreateCorrespondence;
