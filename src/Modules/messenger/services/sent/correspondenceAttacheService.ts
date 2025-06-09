import { api } from "@/api";
import {
  APIFormDataType,
  CorrespondenceResponseType,
} from "../../types/sent/sent.type";
import { AttachmentResponseType } from "../../types/sent/attachment.type";
import { CorrespondenceAttachmentType } from "../../types/sent/attachment.type";
import toast from "react-hot-toast";

const handleSuccess = (message: string) => {
  toast.success(message || "عملیات با موفقیت انجام شد");
};
const handleError = (error: any) => {
  const msg = error?.response?.data?.error || "خطایی رخ داده است";
  toast.error(msg);
  throw error;
};
const correspondenceAttacheService = {
  getAttache: async (): Promise<CorrespondenceAttachmentType[]> => {
    const response = await api.get("/correspondence/attache/");
    return response.data;
  },

  postAttache: async (
    data: AttachmentResponseType
  ): Promise<AttachmentResponseType> => {
    try {
      const response = await api.post("/correspondence/attache/", data);
      handleSuccess("فایل با موفقیت ارسال شد");
      return response.data;
    } catch (error) {
      handleError(error);
      return {} as AttachmentResponseType;
    }
  },

  postCorrespondence: async (
    data: APIFormDataType
  ): Promise<AttachmentResponseType> => {
    const response = await api.post("/correspondence/correspondence/", data);
    return response.data;
  },

  updateCorrespondence: async (
    data: APIFormDataType & { id: number }
  ): Promise<AttachmentResponseType> => {
    try {
      const response = await api.patch(
        `/correspondence/correspondence-update/${data.id}/`,
        data
      );
      handleSuccess("نامه با موفقیت ویرایش شد");
      return response.data;
    } catch (error) {
      handleError(error);
      return {} as AttachmentResponseType;
    }
  },

  publishCorrespondence: async (
    id: number
  ): Promise<AttachmentResponseType> => {
    try {
      const response = await api.patch(
        `/correspondence/correspondence/${id}/`,
        {}
      );
      handleSuccess("نامه با موفقیت منتشر شد");
      return response.data;
    } catch (error) {
      handleError(error);
      return {} as AttachmentResponseType;
    }
  },

  getCorrespondence: async (): Promise<CorrespondenceResponseType> => {
    const response = await api.get("/correspondence/correspondence/");

    let senderData = [];
    let receiverData = [];

    if (
      response.data &&
      response.data.sender &&
      Array.isArray(response.data.sender) &&
      response.data.sender.length > 0
    ) {
      if (
        response.data.sender[0] &&
        response.data.sender[0].sender &&
        Array.isArray(response.data.sender[0].sender)
      ) {
        senderData = response.data.sender[0].sender;

        if (
          response.data.sender[0].receiver &&
          Array.isArray(response.data.sender[0].receiver)
        ) {
          receiverData = response.data.sender[0].receiver;
        }
      } else {
        senderData = response.data.sender;

        if (response.data.receiver && Array.isArray(response.data.receiver)) {
          receiverData = response.data.receiver;
        }
      }
    } else if (Array.isArray(response.data)) {
      senderData = response.data;
    } else if (typeof response.data === "object" && response.data !== null) {
      senderData = [response.data];
    }

    const transformedData: CorrespondenceResponseType = {
      sender: senderData,
      receiver: receiverData,
    };

    console.log("Transformed Data:", transformedData);
    return transformedData;
  },
};

export default correspondenceAttacheService;
