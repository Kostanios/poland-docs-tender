import axiosServices from '@/utils/axios';
import type { LoginAdmin, LoginUser, RegisterUser } from '@/interfaces/auth';
import type { Admin, User } from '@/types/dto/auth';

export const loginAdmin = (params: LoginAdmin) => axiosServices.post<Admin>('admin/login', params);
export const loginUser = (params: LoginUser) => axiosServices.post<{ user: User, jwt: string }>('api/auth/local', params);
export const registerUser = (params: RegisterUser) => axiosServices.post<{ user: User, jwt: string }>('api/auth/local/register', params);
