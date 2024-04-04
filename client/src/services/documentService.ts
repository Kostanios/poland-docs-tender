import axiosServices from '@/utils/axios';
import type { StrapiContentDTO } from '@/types/strapi';
import type { DocumentDTO, Document } from '@/types/dto/document';

export const createDocument = (data: Document & { document_names: { set: number[] }, user: number }) =>
    axiosServices.post<StrapiContentDTO<DocumentDTO>>('/api/document-lists', { data });

export const getDocument = (id: string) =>
    axiosServices.get<StrapiContentDTO<DocumentDTO>>(`/api/document-lists/${id}`);

export const updateDocument = (id: string, data: Partial<Document & { document_names: { set: number [] }, user: number}>) =>
    axiosServices.put<StrapiContentDTO<DocumentDTO>>(`/api/document-lists/${id}`, { data });
