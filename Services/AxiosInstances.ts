import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storage } from "../Store/Storage";

// const BASE_URL = 'https://unvarying-sidney-unethically.ngrok-free.dev/api/';
// const BASE_URL = 'https://unvarying-sidney-unethically.ngrok-free.dev/CashFlow-backend/public/api';
export const BASE_URL = "https://crbackend.cashflowies.com/public/api";
export const IMAGE_URL = "https://backend.cashflowies.com/public/uploads/";

// ✅ Create Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// ✅ Add async interceptor for token
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await storage.get("token");
      if (token) {
        // Zustand stores are serialized JSON, so parse the string
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["Content-Type"] = "multipart/form-data";
      }
    } catch (error) {
      console.log("Error getting token:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
