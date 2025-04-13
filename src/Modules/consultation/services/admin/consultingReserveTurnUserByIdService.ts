import { api } from "@/api";

const consultingReserveTurnUserByIdService = {
  getConsultingReserveTurnUserById: async (id: string) => {
    const response = await api.get(`/consulting/reserve-turn-user/${id}`);
    return response.data;
  },
};

export default consultingReserveTurnUserByIdService;
