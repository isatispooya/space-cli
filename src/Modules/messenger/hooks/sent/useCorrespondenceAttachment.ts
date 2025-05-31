import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import correspondenceAttacheService from "../../services/sent/correspondenceAttacheService";
import {
  APIFormDataType,
  CorrespondenceResponseType,
} from "../../types/sent/sent.type";
import { toast } from "react-hot-toast";
import { CorrespondenceAttachmentsType } from "../../types/sent/attachment.type";
import { AttachmentResponseType } from "../../types";

const useCorrespondenceAttachment = {
  useGetAttache: (): UseQueryResult<CorrespondenceAttachmentsType> => {
    return useQuery({
      queryKey: ["attache"],
      queryFn: correspondenceAttacheService.getAttache,
    });
  },
  usePostAttache: (options?: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
  }): UseMutationResult<
    AttachmentResponseType,
    Error,
    AttachmentResponseType
  > => {
    const { refetch: refetchAttache } = useCorrespondenceAttachment.useGetAttache();
    const { refetch: refetchCorrespondence } = useCorrespondenceAttachment.useGetCorrespondence();
    return useMutation({
      mutationFn: correspondenceAttacheService.postAttache,
      onSuccess: () => {
        refetchAttache();
        refetchCorrespondence();
        options?.onSuccess?.();
      },
      onError: (error) => {
        options?.onError?.(error);
      },
    });
  },
  usePostCorrespondence: (options?: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
  }): UseMutationResult<AttachmentResponseType, Error, APIFormDataType> => {
    const { refetch: refetchAttache } = useCorrespondenceAttachment.useGetAttache();
    const { refetch: refetchCorrespondence } = useCorrespondenceAttachment.useGetCorrespondence();
    return useMutation({
      mutationFn: correspondenceAttacheService.postCorrespondence,
      onSuccess: () => {
        refetchAttache();
        refetchCorrespondence();
        options?.onSuccess?.();
      },
      onError: options?.onError,
    });
  },
  useUpdateCorrespondence: (): UseMutationResult<
    AttachmentResponseType,
    Error,
    APIFormDataType & { id: number }
  > => {
    const { refetch: refetchAttache } = useCorrespondenceAttachment.useGetAttache();
    const { refetch: refetchCorrespondence } = useCorrespondenceAttachment.useGetCorrespondence();
    return useMutation({
      mutationFn: correspondenceAttacheService.updateCorrespondence,
      onSuccess: () => {
        refetchAttache();
        refetchCorrespondence();
        toast.success("اطلاعات با موفقیت ثبت شد");
      },
    });
  },

  usePublishCorrespondence: (): UseMutationResult<
    AttachmentResponseType,
    Error,
    number
  > => {
    const { refetch: refetchAttache } = useCorrespondenceAttachment.useGetAttache();
    const { refetch: refetchCorrespondence } = useCorrespondenceAttachment.useGetCorrespondence();
    return useMutation({
      mutationFn: (id: number) =>
        correspondenceAttacheService.publishCorrespondence(id),
      onSuccess: (response: any) => {
        refetchAttache();
        refetchCorrespondence();
        toast.success(response.message);
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "اطلاعات با مشکل مواجه شد"
        );
      },
    });
  },

  useGetCorrespondence: (): UseQueryResult<CorrespondenceResponseType> => {
    return useQuery({
      queryKey: ["correspondence"],
      queryFn: correspondenceAttacheService.getCorrespondence,
    });
  },
};

export default useCorrespondenceAttachment;
