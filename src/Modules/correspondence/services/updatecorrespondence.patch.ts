import api from '../../../api/api';
import { CorrespondenceData, CorrespondenceFormValues } from '../types';

export interface UpdateCorrespondenceResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CorrespondenceData[];
}

export const updateCorrespondence = async (
  id: string, 
  data: CorrespondenceFormValues
): Promise<UpdateCorrespondenceResponse> => {
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'attachments') {
      formData.append(key, value as string);
    }
  });

  if (data.attachments) {
    Array.from(data.attachments).forEach((file) => {
      formData.append('attachments', file);
    });
  }

  const response = await api.patch(`/correspondence/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}; 