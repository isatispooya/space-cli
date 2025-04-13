import { api } from "@/api";

interface PatchPayload {
  status_of_turn: string;
  expert: number;
  date: string;
}

const consultingConsultantsUserByIdPatchService = {
  patchConsultingConsultantsUserById: async (id: string, payload: PatchPayload) => {
    const response = await api.patch(`/consulting/reserve-turn-user/${id}/`, payload);
    return response.data;
  },
};

export default consultingConsultantsUserByIdPatchService;
