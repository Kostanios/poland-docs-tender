import axiosServices from '@/utils/axios';
import type { StrapiContentDTO } from '@/types/strapi';
import type { DocumentDTO, Document } from '@/types/dto/document';

export const createDocument = (data: Document) => axiosServices.post<StrapiContentDTO<DocumentDTO>>('/api/document-lists', { data });

export const getDocument = (id: string) => axiosServices.get<StrapiContentDTO<DocumentDTO>>(`/api/document-lists/${id}`);
