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
  FormDataType,
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
  usePostCorrespondence: (): UseMutationResult<
    AttachmentResponse,
    Error,
    FormDataType
  > => {
    return useMutation({
      mutationFn: correspondenceAttacheService.postCorrespondence,
    });
  },
  useGetCorrespondence: (): UseQueryResult<CorrespondenceAttachment> => {
    return useQuery({
      queryKey: ["correspondence"],
      queryFn: correspondenceAttacheService.getCorrespondence,
    });
  },
};

export default useCorrespondenceAttachment;
