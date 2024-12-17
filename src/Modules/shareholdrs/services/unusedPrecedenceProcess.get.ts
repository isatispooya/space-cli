import { api } from "../../../api";

 const getUnusedPrecedenceProcess =  async () => {
  const response = await api.get("/stock_affairs/unused_precedence_process/");
  return response.data;
};


export default getUnusedPrecedenceProcess;
