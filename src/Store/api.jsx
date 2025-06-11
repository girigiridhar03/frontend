// api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-practice-project-9ds3.onrender.com",
  withCredentials: true,
});

// Attach token to every request
API.interceptors.request.use(
  (config) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 (unauthorized)
API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const isUnauthorized = error?.response?.status === 401;
    const errorMsg = error?.response?.data?.message;

    const shouldTryRefresh =
      isUnauthorized &&
      errorMsg === "jwt expired" &&
      !originalRequest._retry;

    if (shouldTryRefresh) {
      originalRequest._retry = true;
      try {
        const refreshRes = await axios.get(
          "https://backend-practice-project-9ds3.onrender.com/auth/refreshToken",
          { withCredentials: true }
        );

        const newToken = refreshRes.data.accessToken;
        sessionStorage.setItem("token", JSON.stringify(newToken));
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return API(originalRequest);
      } catch (refreshError) {
        sessionStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    if (isUnauthorized && !shouldTryRefresh) {
      sessionStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;
