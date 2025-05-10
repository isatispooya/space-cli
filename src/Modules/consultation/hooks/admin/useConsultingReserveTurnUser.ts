import { UseQueryResult, useQuery } from "@tanstack/react-query";
import consultingReserveTurnUserSservice from "../../services/admin/consultingReserveTurnUserSservice";

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
  useGetConsultingReserveTurnUser: (): UseQueryResult<ConsultingReserveTurnType[]> => {
    return useQuery({
      queryKey: ["consulting-reserve-turn-user"],
      queryFn: consultingReserveTurnUserSservice.getConsultingReserveTurnUser,
    });
  },
};

export default useConsultingReserveTurnUser;
