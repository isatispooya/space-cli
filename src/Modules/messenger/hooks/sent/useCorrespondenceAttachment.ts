import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import correspondenceAttacheService from "../../services/sent/correspondenceAttacheService";
import {
  FormDataType,
  SenderType as CorrespondenceResponseType,
  ReferenceDataType,
} from "../../types/sent/sent.type";
import {
  CorrespondenceAttachmentType,
  AttachmentType as AttachmentResponseType,
} from "../../types/sent/attachment.type";
import { toast } from "react-toastify";

type CorrespondenceAttachmentsType = CorrespondenceAttachmentType[];
type APIFormDataType = Omit<FormDataType, 'referenceData'> & {
  id?: number;
  referenceData?: ReferenceDataType[];
};

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
    const { refetch } = useCorrespondenceAttachment.useGetAttache();
    return useMutation({
      mutationFn: correspondenceAttacheService.postAttache,
      onSuccess: () => {
        refetch();
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
    return useMutation({
      mutationFn: correspondenceAttacheService.postCorrespondence,
      onSuccess: options?.onSuccess,
      onError: options?.onError,
    });
  },
  useUpdateCorrespondence: (): UseMutationResult<
    AttachmentResponseType,
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
  useGetCorrespondence: (): UseQueryResult<CorrespondenceResponseType> => {
    return useQuery({
      queryKey: ["correspondence"],
      queryFn: correspondenceAttacheService.getCorrespondence,
    });
  },
};

export default useCorrespondenceAttachment;
