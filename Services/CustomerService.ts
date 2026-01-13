import z from "zod";

export const customerSchema = z.object({
  customer_type: z.string().min(1, "Customer type is required"),
  company_name: z.string().nullable().optional(),
  company_phone: z.string().nullable().optional(),
  company_email: z.string().nullable().optional(),
  company_address: z.string().nullable().optional(),
  name: z.string().min(1, "Customer name is required!"),
  phone: z.string().min(5, "Phone No is required!"),
  email: z.string().nullable().optional(),
});

export type CustomerFormValuesType = z.infer<typeof customerSchema>;

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LaravelResponse } from "./VoucherService";
import { api } from "./ApiClient";
// ===============================
// Get Customers List
// ===============================
export const useGetCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async (): Promise<LaravelResponse<any>> => {
      return await api.get("customers");
    },
    retry: false,
  });
};

// ===============================
// Add Customer
// ===============================
export const useAddCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CustomerFormValuesType) => {
      return await api.post(
        "customers",
        payload,
        "Customer Added Successfully!"
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

// ===============================
// Edit Customer
// ===============================
export const useEditCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: CustomerFormValuesType;
    }): Promise<LaravelResponse<any>> => {
      return await api.put(
        `customers/${id}`,
        data,
        "Customer Updated Successfully!"
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: CustomerFormValuesType;
    }) => {
      const payload = { ...data, _method: "PUT" };
      const response = await api.post(
        `customers/${id}`,
        payload,
        "Customer Updated Successfully!"
      );
      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

// ===============================
// Delete Customer
// ===============================
export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<LaravelResponse<any>> => {
      return await api.delete(
        `customers/${id}`,
        "Customer Deleted Successfully!"
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};
