import { api } from "@/api";

const consultingConsultantsService = {
  getConsultingConsultants: async () => {
    const response = await api.get("/consulting/consultants");
    return response.data;
  },
};

export default consultingConsultantsService;
