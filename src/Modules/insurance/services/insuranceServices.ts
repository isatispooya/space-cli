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
  getRequestsById: async (id: number) => {
    const response = await api.get(`/insurance/insurance-request/${id}/`);
    return response.data;
  },
  postFields: async (data: InsurancePostTypes) => {
    const response = await api.post("/insurance/insurance-with-fields/", data);
    return response.data;
  },

  postRequest: async (data: FormData) => {
    const response = await api.post("/insurance/insurance-request/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  updateRequest: async (data: FormData, id: number) => {
    const response = await api.patch(
      `/insurance/insurance-request/${id}/`,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  },
  getInsuranceCompanies: async () => {
    const response = await api.get("/insurance/insurance-companies/");
    return response.data;
  },
  getInsurancePayment: async () => {
    const response = await api.get("/insurance/payment_insurance-request/");
    return response.data;
  },
  postInsurancePayment: async (data: FormData) => {
    const response = await api.post(
      "/insurance/payment_insurance_request/",
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },
  updateInsurancePayment: async (data: FormData, id: number) => {
    const response = await api.patch(
      `/insurance/payment_insurance_request/${id}/`,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  },
};

export default insuranceService;
