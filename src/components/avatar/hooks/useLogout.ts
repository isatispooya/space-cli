import { useMutation } from '@tanstack/react-query';
import logoutService from '../service/logoutService';
import { removeCookie } from '../../../api/cookie';

const useLogout = () => {
  return useMutation({
    mutationFn: (refresh_token: string) => logoutService.post( refresh_token ),
    onSuccess: () => {
      removeCookie("access_token");
      removeCookie("refresh_token");
      window.location.href = "/login";
    }
  });
};

export default useLogout; 