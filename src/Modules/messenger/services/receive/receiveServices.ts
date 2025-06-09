import { api } from "@/api";
import { ReferralReqType } from "../../types/receive/ReceiveMessage.type";
import { ArchiveReqType } from "../../types/receive/archive";
import toast from "react-hot-toast";

const handleSuccess = (message: string) => {
  toast.success(message || "عملیات با موفقیت انجام شد");
};

const handleError = (error: any) => {
  const msg = error?.response?.data?.error;
  ("خطایی رخ داده است");
  toast.error(msg);
  throw error;
};

const receiveSer = {
  getReceive: async () => {
    const response = await api.get("/correspondence/correspondence/");
    return response.data;
  },
  getReceiveById: async (id: string) => {
    const response = await api.get(`/correspondence/correspondence/${id}/`);
    return response.data;
  },

  postRefferal: async (data: ReferralReqType) => {
    try {
      const response = await api.post("/correspondence/reference/", data);
      handleSuccess("ارجاع با موفقیت انجام شد");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  postArchive: async (data: ArchiveReqType) => {
    try {
      const response = await api.post(
        `/correspondence/archive/correspondence/`,
        data
      );
      handleSuccess("بایگانی با موفقیت انجام شد");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  deleteArchive: async (id: string) => {
    try {
      const response = await api.delete(
        `/correspondence/archive/correspondence/${id}/`
      );
      handleSuccess("آیتم از بایگانی حذف شد");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  getReceiveWorkflow: async () => {
    const response = await api.get(`/correspondence/workflow/`);
    return response.data;
  },

  postReceiveWorkflow: async (data: any) => {
    try {
      const response = await api.post(`/correspondence/workflow/`, data);
      handleSuccess("گردش کار ثبت شد");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  getReference: async (id: string) => {
    const response = await api.get(`/correspondence/reference/${id}/`);
    return response.data;
  },
  patchReference: async (id: string, data: any) => {
    try {
      const response = await api.patch(
        `/correspondence/reference/${id}/`,
        data
      );
      handleSuccess("ارجاع با موفقیت ویرایش شد");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

export default receiveSer;
