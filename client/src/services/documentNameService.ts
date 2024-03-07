import axiosServices from '@/utils/axios';
import type { GetStrapiPaginationParams, StrapiContentListDTO } from '@/types/strapi';
import type { DocumentNameDTO } from '@/types/dto/documentName';

export const getDocumentNamesPage = (params: GetStrapiPaginationParams) => axiosServices.get<StrapiContentListDTO<DocumentNameDTO>>('/api/document-names', { params });
