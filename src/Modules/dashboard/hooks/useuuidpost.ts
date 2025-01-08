
import { useMutation } from "@tanstack/react-query";
import crowdUUIDservice from "../services/crowdUUIDservice";

const usePostUUID = () => {
  return useMutation({
    mutationKey: ["post-uuid"],
    mutationFn: () => crowdUUIDservice.post(),
  });
};

export default usePostUUID;