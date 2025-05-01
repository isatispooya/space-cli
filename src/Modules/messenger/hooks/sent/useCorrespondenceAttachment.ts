import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import correspondenceAttacheService from "../../services/sent/correspondenceAttacheService";
import {
  CorrespondenceAttachments,
  AttachmentResponse,
  APIFormDataType,
  CorrespondenceResponse,
} from "../../types/sent/sent.type";

const useCorrespondenceAttachment = {
  useGetAttache: (): UseQueryResult<CorrespondenceAttachments> => {
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
  usePostCorrespondence: (): UseMutationResult<
    AttachmentResponse,
    Error,
    APIFormDataType
  > => {
    return useMutation({
      mutationFn: correspondenceAttacheService.postCorrespondence,
    });
  },
  useUpdateCorrespondence: (): UseMutationResult<
    AttachmentResponse,
    Error,
    APIFormDataType & { id: number }
  > => {
    return useMutation({
      mutationFn: correspondenceAttacheService.updateCorrespondence,
    });
  },
  useGetCorrespondence: (): UseQueryResult<CorrespondenceResponse> => {
    return useQuery({
      queryKey: ["correspondence"],
      queryFn: correspondenceAttacheService.getCorrespondence,
    });
  },
};

export default useCorrespondenceAttachment;
