import { userServices } from "../../services";
import {
  useQuery,
  UseQueryResult,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { ConsultationUserType } from "../../types";

const useConsultUser = {
  useGetSubjects: (): UseQueryResult<ConsultationUserType["SubjectsType"]> => {
    return useQuery({
      queryKey: ["consultation-subjects"],
      queryFn: () => userServices.getSubjects(),
    });
  },
  usePostSubject: (): UseMutationResult<
    ConsultationUserType["SubjectsType"],
    Error,
    { consultant_id: number }
  > => {
    return useMutation({
      mutationFn: (data: { consultant_id: number }) =>
        userServices.postSubject(data),
    });
  },
  useGetRequests: (): UseQueryResult<ConsultationUserType["RequestsType"]> => {
    return useQuery({
      queryKey: ["consultation-requests"],
      queryFn: () => userServices.getRequests(),
    });
  },
};

export default useConsultUser;
