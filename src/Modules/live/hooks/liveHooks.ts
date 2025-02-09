import { useQuery } from "@tanstack/react-query";
import { liveServices } from "../services";

const useLiveStream = {
  useLiveStream: () => {
    return useQuery({
      queryKey: ["liveStream"],
      queryFn: liveServices.getLiveStream,
    });
  },
};

export default useLiveStream;
