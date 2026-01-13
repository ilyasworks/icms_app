import { AxiosError, type AxiosRequestConfig } from "axios";
// import { logout } from './Services/AuthService';
import axiosInstance from "./AxiosInstances";
import { storage } from "../Store/Storage";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

// ✅ Default config applied to all requests
const defaultConfig: AxiosRequestConfig = {
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
};

// ✅ Handle errors (console-based for now — can be swapped for RN Toast later)
export const handleError = (error: AxiosError) => {
  const navigate = useNavigation();
  if (!error.response) {
    // Network error
    Toast.show({
      type: "error",
      text1: "Network Error",
      text2: "Please check your internet connection.",
    });
    return;
  }

  console.log("errsss", error.response.data);
  const data = error.response.data as { message?: string };

  // Server errors
  if (error.response.status >= 500) {
    Toast.show({
      type: "error",
      text1: "Server Error",
      text2: data?.message || "Please try again later.",
    });
  }
  // Unauthorized / token expired
  else if (error.response.status === 401) {
    Toast.show({
      type: "error",
      text1: "Session Expired",
      text2: data?.message || "Logging out...",
    });

    // Clear storage and redirect to login
    storage.clear();
    navigate.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
    // logout(); // call your logout function here
  }
  // Validation or other API errors
  else if (data?.message) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: data.message,
    });

    // Optional: clear storage if needed
    // storage.clear();
  } else {
    // Fallback
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Something went wrong. Please try again.",
    });
  }
};
export const showMessage = (res: any, message?: string) => {
  // Unauthorized / token expired
  if (message) {
    Toast.show({
      type: "success",
      text1: message,
    });
  } else if (res?.message && res?.success == false) {
    Toast.show({
      type: res?.success ? "success" : "error",
      text1: res?.message,
    });
  }
};

// ✅ Unified request handler
const handleRequest = async <T>(
  request: () => Promise<any>,
  message?: string
): Promise<T> => {
  try {
    const response = await request();
    showMessage(response.data, message);
    return response.data;
  } catch (err: any) {
    const error = err as AxiosError;
    handleError(error);
    throw error;
  }
};

// ✅ Merge config helper
const mergeConfig = (customConfig?: AxiosRequestConfig) => ({
  ...defaultConfig,
  ...customConfig,
  headers: {
    ...defaultConfig.headers,
    ...customConfig?.headers,
  },
});

// ✅ Clean final API methods
const get = <T>(url: string, message?: string, config?: AxiosRequestConfig) =>
  handleRequest<T>(() => axiosInstance.get(url, mergeConfig(config)), message);

const post = <T>(
  url: string,
  data?: any,
  message?: string,
  config?: AxiosRequestConfig
) =>
  handleRequest<T>(
    () => axiosInstance.post(url, data, mergeConfig(config)),
    message
  );

const put = <T>(
  url: string,
  data?: any,
  message?: string,
  config?: AxiosRequestConfig
) =>
  handleRequest<T>(
    () => axiosInstance.put(url, data, mergeConfig(config)),
    message
  );

const del = <T>(url: string, message?: string, config?: AxiosRequestConfig) =>
  handleRequest<T>(
    () => axiosInstance.delete(url, mergeConfig(config)),
    message
  );

export const api = {
  get,
  post,
  put,
  delete: del,
};
