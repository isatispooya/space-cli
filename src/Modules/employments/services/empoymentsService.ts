import { api } from "../../../api";
import { EmploymentsPostType } from "../types";

const employmentServices = {
  getEmployments: async () => {
    const response = await api.get("/positions/job-offers/");
    return response.data;
  },
  postJobOffer: async (data: EmploymentsPostType) => {
    const response = await api.post("/positions/job-offers/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default employmentServices;
