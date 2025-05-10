import { UseQueryResult, useQuery } from "@tanstack/react-query";
import consultingReserveTurnUserByIdService from "../../services/admin/consultingReserveTurnUserByIdService";

interface ConsultantType {
  id: number;
  title: string;
  description: string;
  status: boolean;
  kind_of_consultant: string[];
  price: number;
  picture: string;
  created_at: string;
  updated_at: string;
}

interface CounselingRequesterType {
  id: number;
  first_name: string;
  last_name: string;
  uniqueIdentifier: string;
}

interface ExpertType {
  id: number;
  first_name: string;
  last_name: string;
}

interface ConsultingReserveTurnType {
  id: number;
  consultant: ConsultantType;
  counseling_requester: CounselingRequesterType;
  date: string | null;
  status_of_turn: string;
  created_at: string;
  updated_at: string;
  expert: ExpertType | null;
}

const useConsultingReserveTurnUser = {
  useGetConsultingReserveTurnUser: (id: string): UseQueryResult<ConsultingReserveTurnType[]> => {
    return useQuery({
      queryKey: ["consulting-reserve-turn-user_by_id", id],
      queryFn: () => consultingReserveTurnUserByIdService.getConsultingReserveTurnUserById(id),
    });
  },
};

export default useConsultingReserveTurnUser;
