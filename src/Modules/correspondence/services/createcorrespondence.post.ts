import api from '../../../api/api';
import { CreateCorrespondenceDTO } from '../types';

const createCorrespondencePost = async (data: CreateCorrespondenceDTO) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('توکن احراز هویت یافت نشد');
  }

  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => {
        formData.append(key, item.toString());
      });
    } else if (value !== null) {
      formData.append(key, value.toString());
    }
  });

  const response = await api.post('/correspondence/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    },
  });
  
  return response.data;
};

export default createCorrespondencePost;