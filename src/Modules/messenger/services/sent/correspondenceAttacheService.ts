import { api } from "@/api";
import {
  APIFormDataType,
  CorrespondenceResponseType,
} from "../../types/sent/sent.type";
import { AttachmentResponseType } from "../../types/sent/attachment.type";
import { CorrespondenceAttachmentType } from "../../types/sent/attachment.type";
const correspondenceAttacheService = {
  getAttache: async (): Promise<CorrespondenceAttachmentType[]> => {
    const response = await api.get("/correspondence/attache/");
    return response.data;
  },
  postAttache: async (
    data: AttachmentResponseType
  ): Promise<AttachmentResponseType> => {
    const response = await api.post("/correspondence/attache/", data);
    return response.data;
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
    const response = await api.patch(
      `/correspondence/correspondence/${data.id}/`,
      data
    );
    return response.data;
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
      // اگر فقط یک آرایه ساده باشد
      senderData = response.data;
    } else if (typeof response.data === "object" && response.data !== null) {
      // اگر یک آبجکت ساده باشد
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
