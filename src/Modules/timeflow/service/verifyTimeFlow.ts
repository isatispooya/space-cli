import { api } from "../../../api";

const verifyTimeFlow = {
  get: async () => {
    const response = await api.get("/timeflow/verify-timeflow/");
    return response.data;
  },
  post: async (data) => {
    const response = await api.post("/timeflow/verify-timeflow/", data);
    return response.data;
  },
  

};

export default verifyTimeFlow;
