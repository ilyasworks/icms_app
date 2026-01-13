import Toast from "react-native-toast-message";
import { ReportType } from "../screens/Report/Report";
import { api } from "./ApiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type LaravelResponse<T> = { status: boolean; message: string; data: T };
export const useGetVoucherNo = () => {
  return useQuery({
    queryKey: ["generate-voucher-no"],
    queryFn: async (): Promise<LaravelResponse<any>> => {
      return await api.get("generate-voucher-no");
    },
    retry: false,
  });
};

export const useVouchers = () => {
  return useQuery({
    queryKey: ["voucher"],
    queryFn: async (): Promise<LaravelResponse<any>> => {
      return await api.get("voucher");
    },
    retry: false,
  });
};

export const useAddVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      return await api.post("voucher", payload, "Voucher Added Successfully!");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["voucher"] });
    },
  });
};
export const useEditVoucher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: any;
    }): Promise<LaravelResponse<any>> => {
      return await api.put(
        `voucher/${id}`,
        data,
        "Voucher Updated Successfully!"
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["voucher"] });
    },
  });
};

export const useUpdateVoucher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const payload = { ...data, _method: "PUT" };
      const response = await api.post(
        `voucher/${id}`,
        payload,
        "Voucher Updated Successfully!"
      );
      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["voucher"] });
    },
  });
};
export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async (): Promise<LaravelResponse<any>> => {
      return await api.get("dashboard");
    },
    retry: false,
  });
};

export const useReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ReportType) => {
      return await api.post("report", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["report"] });
    },
  });
};

export const useVerifyVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      voucher_id: number | string;
      otp: number | string;
    }) => {
      const response = await api.post("verify-otp", payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["voucher"] });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "OTP Verification Failed!",
      });
    },
  });
};

export const useResendVoucherOTP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { voucher_id: number | string }) => {
      const response = await api.post(
        "resend-otp",
        payload,
        "OTP Resend Successfully!"
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["voucher"] });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "OTP Resend Failed!",
      });
    },
  });
};
