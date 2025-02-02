import { api } from "../../../api";
import { InsurancePostTypes } from "../types";

const insuranceService = {
  getFields: async () => {
    const response = await api.get("/insurance/insurance-with-fields/");
    return response.data;
  },
  getRequests: async () => {
    const response = await api.get("/insurance/insurance-request/");
    return response.data;
  },
  postFields: async (data: InsurancePostTypes) => {
    const response = await api.post("/insurance/insurance-with-fields/", data);
    return response.data;
  },
  postRequest: async (data: any) => {
    const response = await api.post("/insurance/insurance-request/", data);
    return response.data;
  },
};

export default insuranceService;
