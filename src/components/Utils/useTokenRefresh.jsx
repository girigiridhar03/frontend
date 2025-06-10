import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { throttle } from "./customFunctions";
import { refreshToken } from "@/Store/LoginSlice/service/Auth.service";

const useTokenRefresh = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const throttledRefresh = throttle(() => {
      const token = sessionStorage.getItem("token");

      if (!token) return;
      console.log("triggered")
      try {
        const { exp } = jwtDecode(token);
        const now = Date.now();
        const expireIn = exp * 1000 - now;

        if (expireIn < 5 * 60 * 1000) {
          dispatch(refreshToken());
        }
      } catch (error) {
        console.log("Invalid jwt : ", error);
      }
    }, 5 * 60 * 1000);

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
