import { useMutation, useQuery } from "@tanstack/react-query";
import { MissionTimeFlowType } from "../types/missionTimeFlow.type";
import { toast } from "react-hot-toast";
import missionTimeFlowService from "../service/MissionTimeFlowِService";

const useMissionTimeFlow = () => {
  return useQuery({
    queryKey: ["missionTimeFlow"],
    queryFn: () => missionTimeFlowService().get(),
  });
};

const useMissionTimeFlowCreate = () => {
  return useMutation({
    mutationFn: (data: MissionTimeFlowType) =>
      missionTimeFlowService().create(data),
    onSuccess: () => {
      toast.success("اطلاعات با موفقیت ثبت شد");
    },
    onError: () => {
      toast.error("اطلاعات ثبت نشد");
    },
  });
};

const useMissionTimeFlowUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: MissionTimeFlowType }) =>
      missionTimeFlowService().update(id, data),
    onSuccess: (response) => {
      toast.success(response.message || "اطلاعات با موفقیت به روز شد");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "اطلاعات به روز نشد");
    },
  });
};

export {
  useMissionTimeFlow,
  useMissionTimeFlowCreate,
  useMissionTimeFlowUpdate,
};
