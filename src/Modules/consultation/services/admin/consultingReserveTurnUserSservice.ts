import { api } from "@/api";

const consultingReserveTurnUserSservice = {
  getConsultingReserveTurnUser: async () => {
    const response = await api.get("/consulting/reserve-turn-user");
    return response.data;
  },
};

export default consultingReserveTurnUserSservice;
