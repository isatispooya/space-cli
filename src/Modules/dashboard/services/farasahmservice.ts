import { api } from "../../../api";

const faraSahmService = {
  post: async () => {
    const response = await api.post("/core/connect-to-farasahm/");
    return response.data;
  },
};

export default faraSahmService;
