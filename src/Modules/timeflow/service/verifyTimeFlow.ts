import { api } from "../../../api";
import { VerifyPatchTypes } from "../types/verify.type";

const verifyTimeFlow = {
  get: async () => {
    const response = await api.get("/timeflow/verify-timeflow/");
    return response.data;
  },
  post: async (data: VerifyPatchTypes, id: number) => {
    const response = await api.post(`/timeflow/verify-timeflow/${id}/`, data);
    return response.data;
  },
};

export default verifyTimeFlow;
