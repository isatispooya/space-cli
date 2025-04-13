import { useMutation } from "@tanstack/react-query";
import consultingConsultantsUserByIdPatchService from "../../services/admin/consultingConsultantsUserByIdPatch";

interface PatchPayload {
  status_of_turn: string;
  expert: number;
  date: string;
}

export const useConsultingReserveTurnUserPatch = () =>
  useMutation<unknown, Error, { id: string; payload: PatchPayload }>({
    mutationKey: ["consulting-reserve-turn-user"],
    mutationFn: ({ id, payload }) =>
      consultingConsultantsUserByIdPatchService.patchConsultingConsultantsUserById(id, payload),
  });
