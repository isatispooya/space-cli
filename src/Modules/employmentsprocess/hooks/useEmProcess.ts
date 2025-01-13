import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { emProcessServices } from "../services";
import { EmProcessPostTypes, EmProcessTypes } from "../types";
import { AxiosError } from "axios";

const UseEmProcess = {
  useGet: (): UseQueryResult<EmProcessTypes[], AxiosError> => {
    return useQuery({
      queryKey: ["emProcess"],
      queryFn: emProcessServices.getEmProcess,
    });
  },
  usePost: (): UseMutationResult<
    EmProcessPostTypes,
    AxiosError,
    EmProcessPostTypes
  > => {
    return useMutation({
      mutationKey: ["emProcessPost"],
      mutationFn: emProcessServices.postEmprocess,
    });
  },
  useDelete: (): UseMutationResult<EmProcessPostTypes, AxiosError, number> => {
    return useMutation({
      mutationKey: ["emProcessPost"],
      mutationFn: (id: number) => emProcessServices.deleteEmprocess(id),
    });
  },


  
  useUpdate: (): UseMutationResult<
    EmProcessPostTypes,
    AxiosError,
    { id: number; data: EmProcessPostTypes }
  > => {
    return useMutation({
      mutationKey: ["emProcessPost"],
      mutationFn: ({ id, data }) => emProcessServices.updateEmprocess(id, data),
    });
  },
};

export default UseEmProcess;
