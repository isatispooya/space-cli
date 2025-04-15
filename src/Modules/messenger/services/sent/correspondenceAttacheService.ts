import { api } from "@/api";
import { CorrespondenceAttachment, AttachmentResponse, FormDataType } from "../../types/sent/CorrespondenceAttache.type";
const correspondenceAttacheService = {
  getAttache: async (): Promise<CorrespondenceAttachment[]> => {
    const response = await api.get("/correspondence/attache/");
    return response.data;
  },
  postAttache: async (data: AttachmentResponse): Promise<AttachmentResponse> => {
    const response = await api.post("/correspondence/attache/", data);
    return response.data;
  },
  postCorrespondence: async (data: FormDataType): Promise<AttachmentResponse> => {
    const response = await api.post("/correspondence/correspondence/", data);
    return response.data;
  },

};

export default correspondenceAttacheService;
