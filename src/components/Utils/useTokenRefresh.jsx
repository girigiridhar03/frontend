import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { throttle } from "./customFunctions";
import { refreshToken } from "@/Store/LoginSlice/service/Auth.service";

const useTokenRefresh = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const mountedAt = Date.now();

    const throttledRefresh = throttle(() => {
      const token = sessionStorage.getItem("token");
      console.log("triggered");
      if (!token) return;

      const now = Date.now();
      const oneMinutePassed = now - mountedAt >= 60 * 1000;

      if (!oneMinutePassed) return;

      try {
        const { exp } = jwtDecode(token); // exp in seconds
        const expireIn = exp * 1000 - now;

        // Refresh if token is expiring in less than 2 minutes
        if (expireIn > 0 && expireIn < 2 * 60 * 1000) {
          console.log("🔁 Token expiring soon, refreshing...");
          dispatch(refreshToken());
        }
      } catch (error) {
        console.error("Invalid JWT token:", error);
      }
    }, 2 * 60 * 1000); // throttle every 2 minutes

    window.addEventListener("mousemove", throttledRefresh);
    window.addEventListener("keydown", throttledRefresh);
    window.addEventListener("scroll", throttledRefresh);

    return () => {
      window.removeEventListener("mousemove", throttledRefresh);
      window.removeEventListener("keydown", throttledRefresh);
      window.removeEventListener("scroll", throttledRefresh);
    };
  }, [dispatch]);
};

export default useTokenRefresh;
