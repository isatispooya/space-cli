import { api } from "../../../api";
import { Permission } from "../types";

const getPermissionList = async () => {
  try {
    const response = await api.get("/permissions");
    console.log("Raw API response:", response); // Debug log
    return response.data;
  } catch (error) {
    console.error("Error fetching permissions:", error);
    throw error;
  }
};

export default getPermissionList;


