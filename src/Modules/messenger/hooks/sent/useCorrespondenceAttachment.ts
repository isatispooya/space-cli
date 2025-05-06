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
import { toast } from "react-toastify";

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
    const { refetch } = useCorrespondenceAttachment.useGetAttache();
    return useMutation({
      mutationFn: correspondenceAttacheService.postAttache,
      onSuccess: () => {
        refetch();
      },
    });
  },
  usePostCorrespondence: (options?: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
  }): UseMutationResult<AttachmentResponse, Error, APIFormDataType> => {
    return useMutation({
      mutationFn: correspondenceAttacheService.postCorrespondence,
      onSuccess: options?.onSuccess,
      onError: options?.onError,
    });
  },
  useUpdateCorrespondence: (): UseMutationResult<
    AttachmentResponse,
    Error,
    APIFormDataType & { id: number }
  > => {
    return useMutation({
      mutationFn: correspondenceAttacheService.updateCorrespondence,
      onSuccess: () => {
        toast.success("اطلاعات با موفقیت ثبت شد");
      },
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
