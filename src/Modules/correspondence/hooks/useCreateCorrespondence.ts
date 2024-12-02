import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import createCorrespondencePost from '../services/createcorrespondence.post';
import { CreateCorrespondenceDTO } from '../types';

export const useCreateCorrespondence = () => {
  return useMutation({
    mutationFn: (data: CreateCorrespondenceDTO) => createCorrespondencePost(data),
    onSuccess: () => {
      message.success('مکاتبه با موفقیت ایجاد شد');
    },
  });
}; 