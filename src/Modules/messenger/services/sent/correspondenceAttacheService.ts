import { api } from "@/api";
import {
  CorrespondenceAttachmentType,
  AttachmentResponseType,
  APIFormDataType,
  CorrespondenceResponseType,
} from "../../types/sent/sent.type";
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
    // Transform the data to match the expected format
    const transformedData: CorrespondenceResponseType = {
      sender: response.data,
      receiver: [],
    };
    return transformedData;
  },
};

export default correspondenceAttacheService;
