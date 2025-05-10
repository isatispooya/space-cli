import api from "../../../api/api";
import { ChangeOldPassType } from "../types";

const patchOldPass = async (data: ChangeOldPassType) => {
  const response = await api.patch("/change-password/", data);
  return response.data;
};

export default patchOldPass;
