import { api } from "../../../api";
import { CreatePermissionData } from "../types";

const createPermissionGroup = async (data: CreatePermissionData) => {
   const response = await api.post("/groups/", data);
   return response.data;
}
 
export default createPermissionGroup;