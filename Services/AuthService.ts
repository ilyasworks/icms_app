import { useMutation } from "@tanstack/react-query";
import { api } from "./ApiClient";

interface LoginPayload {
  email: string;
  password: string;
}

// Login service *****
const login = async (payload: LoginPayload) => {
  return api.post("auth/login", payload );
};
export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    // onSuccess: (data: any) => {
    //   // console.log(data)
    //   const token = data.data.accessToken
    //   if (token) {
    //     localStorage.setItem('imu-token', token)
    //     //  Force manual update for same-tab listeners
    //     window.dispatchEvent(new Event('storage'))
    //   }
    // },
  });
};