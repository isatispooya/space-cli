import {
  useQuery,
  useMutation,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { getInvitation } from "../services";
import { InvitationPostTypes, InvitationTypes } from "../types";

const useInvitation = {
  useGetList: (): UseQueryResult<InvitationTypes[]> =>
    useQuery({
      queryKey: ["invitation"],
      queryFn: getInvitation.getList,
    }),
  useGetCodes: (): UseQueryResult<InvitationTypes[]> =>
    useQuery({
      queryKey: ["invitation-codes"],
      queryFn: getInvitation.getCodes,
    }),
  useCreateCodes: (): UseMutationResult<
    InvitationPostTypes,
    Error,
    InvitationPostTypes
  > =>
    useMutation({
      mutationKey: ["invitation-codes-mutate"],
      mutationFn: getInvitation.createCodes,
    }),
};

export default useInvitation;
