import { api } from "../../../api";

const employmentServices = {
  getEmployments: async () => {
    const response = await api.get("/positions/job-offers/");
    return response.data;
  },
  
};

export default employmentServices;
