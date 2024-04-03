import type { GetStrapiPaginationParams, StrapiContentListDTO } from '@/types/strapi';
import axiosServices from '@/utils/axios';
import type { UserEntity } from '@/types/dto/user';

export const getTypeUsersPage = (params: GetStrapiPaginationParams & { populate?: 'document_lists' }) => axiosServices.get<UserEntity[]>('/api/users', { params });
