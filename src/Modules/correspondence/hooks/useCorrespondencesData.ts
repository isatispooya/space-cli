import { useQuery } from '@tanstack/react-query';
import { getCorrespondences } from '../services/correspondence.get';
import { CorrespondenceData } from '../types';

interface CorrespondencesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CorrespondenceData[];
}

export const useCorrespondencesData = () => {
  return useQuery<CorrespondencesResponse>({
    queryKey: ['correspondences'],
    queryFn: getCorrespondences
  });
}; 