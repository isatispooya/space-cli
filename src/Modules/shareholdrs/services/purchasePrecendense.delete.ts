import { api } from "../../../api";

 const getUnusedPrecedenceProcess =  async (id : number) => {
  const response = await api.delete(`/stock_affairs/unused_precedence_process/${id}/`);
  return response.data;
};


export default getUnusedPrecedenceProcess;


