import api from "../../../api/api";

export interface changeOldPassType {
  last_password: string;
  new_password: string;
  new_password_confirm: string;
}

const patchOldPass = async (data: changeOldPassType) => {
  const response = await api.patch("/change-password/", data);
  return response.data;
};

export default patchOldPass;
