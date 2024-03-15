import axiosServices from '@/utils/axios';
import type { GetStrapiPaginationParams, StrapiContentDTO, StrapiContentListDTO } from '@/types/strapi';
import type { DocumentName, DocumentNameDTO } from '@/types/dto/documentName';

export const createDocumentName = (data: DocumentName) => axiosServices.post<StrapiContentDTO<DocumentNameDTO>>('/api/document-names', { data });

export const getDocumentNamesPage = (params: GetStrapiPaginationParams) => axiosServices.get<StrapiContentListDTO<DocumentNameDTO>>('/api/document-names', { params });

export const getDocumentName = (id: string) => axiosServices.get<StrapiContentDTO<DocumentNameDTO>>(`/api/document-names/${id}`);

export const updateDocumentName = (id: string, data: Partial<DocumentName & { document_names: { set: number [] }}>) => axiosServices.put<StrapiContentDTO<DocumentNameDTO>>(`/api/document-names/${id}`, { data });

export const deleteDocumentName = (id: string) => axiosServices.delete(`/api/document-names/${id}`)
