import {
  useQuery,
  useMutation,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { getInvitation } from "../services";
import { InvitationPostType, InvitationType } from "../types";

const useInvitation = {
  useGetList: (): UseQueryResult<InvitationType[]> =>
    useQuery({
      queryKey: ["invitation"],
      queryFn: getInvitation.getList,
    }),
  useGetCodes: (): UseQueryResult<InvitationType[]> =>
    useQuery({
      queryKey: ["invitation-codes"],
      queryFn: getInvitation.getCodes,
    }),
  useCreateCodes: (): UseMutationResult<
    InvitationPostType,
    Error,
    InvitationPostType
  > =>
    useMutation({
      mutationKey: ["invitation-codes-mutate"],
      mutationFn: getInvitation.createCodes,
    }),
};

export default useInvitation;
