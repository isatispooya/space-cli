import { api } from "../../../api";
import { EmploymentsPostTypes } from "../types";

const employmentServices = {
  getEmployments: async () => {
    const response = await api.get("/positions/job-offers/");
    return response.data;
  },
  postJobOffer: async (data: EmploymentsPostTypes) => {
    const response = await api.post("/positions/job-offers/", data);
    return response.data;
  },
};

export default employmentServices;
