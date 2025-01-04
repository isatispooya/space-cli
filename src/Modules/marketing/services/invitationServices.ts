import { api } from "../../../api";
import { InvitationPostTypes } from "../types";

const getInvitation = {
  getList: async () => {
    const response = await api.get("/marketing/invitation/");
    return response.data;
  },
  getCodes: async () => {
    const response = await api.get("/marketing/invitation-code/");
    return response.data;
  },

  createCodes: async (data: InvitationPostTypes) => {
    const response = await api.post("/marketing/invitation-code/", data);
    return response.data;
  },
};

export default getInvitation;
