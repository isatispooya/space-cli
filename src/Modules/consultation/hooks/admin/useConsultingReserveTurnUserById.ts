import { UseQueryResult, useQuery } from "@tanstack/react-query";
import consultingReserveTurnUserByIdService from "../../services/admin/consultingReserveTurnUserByIdService";

interface Consultant {
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

interface CounselingRequester {
  id: number;
  first_name: string;
  last_name: string;
  uniqueIdentifier: string;
}

interface Expert {
  id: number;
  first_name: string;
  last_name: string;
}

interface ConsultingReserveTurn {
  id: number;
  consultant: Consultant;
  counseling_requester: CounselingRequester;
  date: string | null;
  status_of_turn: string;
  created_at: string;
  updated_at: string;
  expert: Expert | null;
}

const useConsultingReserveTurnUser = {
  useGetConsultingReserveTurnUser: (id: string): UseQueryResult<ConsultingReserveTurn[]> => {
    return useQuery({
      queryKey: ["consulting-reserve-turn-user_by_id", id],
      queryFn: () => consultingReserveTurnUserByIdService.getConsultingReserveTurnUserById(id),
    });
  },
};

export default useConsultingReserveTurnUser;
