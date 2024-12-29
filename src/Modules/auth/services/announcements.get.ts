import { api } from "../../../api";

const getAnnouncements = async () => {
  const response = await api.get("/core/announcements/");
  return response.data;
};

export default getAnnouncements;
