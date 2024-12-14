import { api } from "../../../api";
import { ShareholdersTypes } from "../types";

const postShareholders = async (data: ShareholdersTypes) => {
  const response = await api.post("/stock_affairs/shareholders/", data);
  return response.data;
};

export default postShareholders;
