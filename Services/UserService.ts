import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./ApiClient";

export type LaravelResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};

//  GET users ********
const getUsers = async (): Promise<LaravelResponse<any[]>> => {
  return api.get("users");
};
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    retry: false,
  });
};

// // Add User *********
// export const useAddUser = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: (userData: UserFormValuesType): Promise<LaravelResponse<any>> => {
//       return api.post('users', userData, 'User Added Successfully!')
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['users'] }) //  refetch user list
//     },
//   })
// }

// //  DELETE user ********
// const deleteUser = async (id: number) => {
//   return api.delete(users/${id}, 'User deleted successfully!')
// }
// export const useDeleteUser = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: deleteUser,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['users'] })
//     },
//   })
// }

// //  EDIT user ********

interface UserFormValuesType {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role?: string;
  status?: string;
  gender?: string;
  dob?: string;
  phone?: string;
  bio?: string;
}
const editUser = async (id: number, payload: UserFormValuesType) => {
  return api.put(`users/${id}`, payload);
};
export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UserFormValuesType }) =>
      editUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
export const useEditProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      return await api.post("users/profile-update", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] }); // refetch profile
    },
  });
};
// // Get User Dropdowns *********
// const getUsersDropdowns = async (): Promise<LaravelResponse<any>> => {
//   return api.get('user-dropdowns')
// }
// export const useGetUsersDropdowns = () => {
//   return useQuery({
//     queryKey: ['userdropdowns'],
//     queryFn: getUsersDropdowns,
//     retry: false
//   })
// }
