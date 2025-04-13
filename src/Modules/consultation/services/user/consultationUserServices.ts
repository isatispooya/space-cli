import { api } from "@/api";


const userServices = {
    getSubjects : async () => {
        const response = await api.get("/consultation/subjects");
        return response.data;
    }
}

export default userServices;
