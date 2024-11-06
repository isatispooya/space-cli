import axios from "axios";
import { server } from "./server";
import { getCookie, setCookie } from "./cookie";

const api = axios.create({
  baseURL: server,
});

// افزودن interceptor برای ارسال توکن در هدر
api.interceptors.request.use(
  (config) => {
    const token = getCookie("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// افزودن interceptor برای مدیریت خطای 401 و تجدید توکن
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getCookie("refresh_token");
        const response = await axios.post(`${server}/token/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;
        setCookie("access_token", access, 1);

        // تنظیم توکن جدید در درخواست اصلی
        originalRequest.headers.Authorization = `Bearer ${access}`;

        // تکرار درخواست اصلی با توکن جدید
        return api(originalRequest);
      } catch (refreshError) {
        
        // در صورت خطا در تجدید توکن، کاربر را به صفحه لاگین هدایت کنید
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
