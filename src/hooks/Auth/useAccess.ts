import { useMutation } from "@tanstack/react-query";
import { getCookie } from "../../api/cookie";
import api from "../../api/api";
import { server } from "../../api/server";

const getAccessToken = async (): Promise<string> => {
  const refresh = getCookie("refresh");
  if (!refresh) {
    throw new Error("No refresh token found");
  }
  const response = await api.post<{ access: string }>(
    `${server}/token/refresh/`,
    { refresh }
  );
  console.log(response.data.access);
  return response.data.access;
};

export const useAccess = () => {
  const { data, mutate, error } = useMutation<string, Error>({
    mutationKey: ["access"],
    mutationFn: getAccessToken,
    onError: (error) => {
      console.error("Error in fetching access token", error);
    },
  });

  return { accessToken: data, refetchAccessToken: mutate, error };
};
