import { api } from "../../../api";
import { CorrespondenceTypes } from "../types";

const updateCorrespondence = async (
  id: string,
  data: CorrespondenceTypes
): Promise<CorrespondenceTypes> => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key !== "attachments") {
      formData.append(key, value as string);
    }
  });

  if (data.attachments) {
    Array.from(data.attachments).forEach((file) => {
      formData.append("attachments", file);
    });
  }

  const response = await api.patch(`/correspondence/${id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export default updateCorrespondence;
