import { employmentServices } from "../services";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { EmploymentsTypes } from "../types";

const useEmployments = {
  useGetJobOffers: () : UseQueryResult<EmploymentsTypes[]> => {
    return useQuery({
      queryKey: ["employments"],
      queryFn: employmentServices.getEmployments,
    });
  },
};

export default useEmployments;
