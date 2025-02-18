import { useMutation, useQuery } from "@tanstack/react-query";
import leaveTimeFlowService from "../service/leavetimeFlowService";
import { LeaveTimeFlowType } from "../types/LeaveTimeFlow.type";
import { toast } from "react-hot-toast";

const useLeaveTimeFlow = () => {
  return useQuery({
    queryKey: ["leaveTimeFlow"],
    queryFn: () => leaveTimeFlowService().get(),
  });
};

const useLeaveTimeFlowCreate = () => {
  return useMutation({
    mutationFn: (data: LeaveTimeFlowType) => leaveTimeFlowService().create(data),
    onSuccess: () => {
      toast.success("اطلاعات با موفقیت ثبت شد");
    },
    onError: () => {
      toast.error("اطلاعات ثبت نشد");
    },
  });
};

const useLeaveTimeFlowUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: LeaveTimeFlowType }) =>
      leaveTimeFlowService().update(id, data),
    onSuccess: () => {
      toast.success("اطلاعات با موفقیت به روز شد");
    },
    onError: () => {
      toast.error("اطلاعات به تایید نشد");
    },
  });
};

export {
  useLeaveTimeFlow,
  useLeaveTimeFlowCreate,
  useLeaveTimeFlowUpdate,
};
