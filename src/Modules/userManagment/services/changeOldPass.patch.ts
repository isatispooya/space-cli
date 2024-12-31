import api from "../../../api/api";
import { changeOldPassType } from "../types";

const patchOldPass = async (data: changeOldPassType) => {
  const response = await api.patch("/change-password/", data);
  console.log(response);
  return response.data;
};

export default patchOldPass;
