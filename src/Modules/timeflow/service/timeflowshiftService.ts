import { api } from "../../../api";

const timeflowShiftService = {
  get: async () => {
    const response = await api.get("/timeflow/work-shift/");
    return response.data;
  },

};

export default timeflowShiftService;
