import api from "../../../api/api";
import { server } from "../../../api/server";

const getProfile = async () => {
    const response = await api.get(
      `${server}/user/profile/`
    );
    return response.data;
  };

export default getProfile;