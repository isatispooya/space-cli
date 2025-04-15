import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import correspondenceAttacheService from "../../services/sent/correspondenceAttacheService";
import {
  CorrespondenceAttachment,
  AttachmentResponse,
} from "../../types/sent/CorrespondenceAttache.type";

const useCorrespondenceAttachment = {
  useGetAttache: (): UseQueryResult<CorrespondenceAttachment> => {
    return useQuery({
      queryKey: ["attache"],
      queryFn: correspondenceAttacheService.getAttache,
    });
  },
  usePostAttache: (): UseMutationResult<
    AttachmentResponse,
    Error,
    AttachmentResponse
  > => {
    return useMutation({
      mutationFn: correspondenceAttacheService.postAttache,
    });
  },
};

export default useCorrespondenceAttachment;
