import { api } from "../../../api";
import { SetShiftUserType } from "../types/shifts.type";
const shiftsassignServices = {


  getShiftsassign: async () => {
    const response = await api.get("/positions/list-of-subcategory/");
    console.log(response.data , "shiftassaindsd")
    return response.data;
  },

  createShiftsassign: async (SetShiftUser: SetShiftUserType) => {
    const response = await api.patch(
      `/timeflow/set-shift-user/${SetShiftUser.shift_id}/`,
      {
        uniqueidentifier: SetShiftUser.uniqueidentifier,
      }
    );
    return response.data;
  },
};

export default shiftsassignServices;
