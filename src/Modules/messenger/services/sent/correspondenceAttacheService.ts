import { api } from "@/api";
import { CorrespondenceAttachmentType, AttachmentResponseType, APIFormDataType } from "../../types/sent/sent.type";
const correspondenceAttacheService = {
  getAttache: async (): Promise<CorrespondenceAttachmentType[]> => {
    const response = await api.get("/correspondence/attache/");
    return response.data;
  },
  postAttache: async (data: AttachmentResponseType): Promise<AttachmentResponseType> => {
    const response = await api.post("/correspondence/attache/", data);
    return response.data;
  },
  postCorrespondence: async (data: APIFormDataType): Promise<AttachmentResponseType> => {
    const response = await api.post("/correspondence/correspondence/", data);
    return response.data;
  },
  updateCorrespondence: async (data: APIFormDataType & { id: number }): Promise<AttachmentResponseType> => {
    const response = await api.patch(`/correspondence/correspondence/${data.id}/`, data);
    return response.data;
  },
  getCorrespondence: async (): Promise<CorrespondenceAttachmentType[]> => {
    const response = await api.get("/correspondence/correspondence/");
    return response.data;
  },

};

export default correspondenceAttacheService;
