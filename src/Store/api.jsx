// api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-practice-project-9ds3.onrender.com",
  withCredentials: true, // Send cookies with every request
});

// Request interceptor (no token needed since cookies handle it)
API.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    const isUnauthorized = error?.response?.status === 401;
    const errorMsg = error?.response?.data?.message;

    const shouldTryRefresh =
      isUnauthorized && errorMsg === "jwt expired" && !originalRequest._retry;

    if (shouldTryRefresh) {
      originalRequest._retry = true;
      try {
        // Try to refresh the token
        await axios.get(
          "https://backend-practice-project-9ds3.onrender.com/auth/refreshToken",
          { withCredentials: true }
        );

        // Retry the original request after refresh
        return API(originalRequest);
      } catch (refreshError) {
        // Refresh failed → logout
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Other 401s → logout
    if (isUnauthorized && !shouldTryRefresh) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;
