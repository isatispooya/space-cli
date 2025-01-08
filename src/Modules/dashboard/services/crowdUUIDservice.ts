import { api } from "../../../api";

const crowdUUIDservice = {
  post: async () => {
    const response = await api.post("/request-to-crowd-login/");
    return response.data;
  },
};

export default crowdUUIDservice;