import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { emProcessServices } from "../services";
import { EmProcessPostType, EmProcessType } from "../types";
import { AxiosError } from "axios";

const UseEmProcess = {
  useGet: (): UseQueryResult<EmProcessType[], AxiosError> => {
    return useQuery({
      queryKey: ["emProcess"],
      queryFn: emProcessServices.getEmProcess,
    });
  },
  usePost: (): UseMutationResult<
    EmProcessPostType,
    AxiosError,
    EmProcessPostType
  > => {
    return useMutation({
      mutationKey: ["emProcessPost"],
      mutationFn: emProcessServices.postEmprocess,
    });
  },
  useDelete: (): UseMutationResult<EmProcessPostType, AxiosError, number> => {
    return useMutation({
      mutationKey: ["emProcessPost"],
      mutationFn: (id: number) => emProcessServices.deleteEmprocess(id),
    });
  },

  useUpdate: (): UseMutationResult<
    EmProcessPostType,
    AxiosError,
    { id: number; data: EmProcessPostType }
  > => {
    return useMutation({
      mutationKey: ["emProcessPost"],
      mutationFn: ({ id, data }) => emProcessServices.updateEmprocess(id, data),
    });
  },
};

export default UseEmProcess;
