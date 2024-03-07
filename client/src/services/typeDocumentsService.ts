import axiosServices from '@/utils/axios';
import type { TypicalDocument, TypicalDocumentDTO } from '@/types/dto/typicalDocument';
import type { GetStrapiPaginationParams, StrapiContentDTO, StrapiContentListDTO } from '@/types/strapi';

export const getTypeDocumentsPage = (params: GetStrapiPaginationParams) => axiosServices.get<StrapiContentListDTO<TypicalDocumentDTO>>('/api/typical-documents', { params });

export const getTypeDocument = (id: string) => axiosServices.get<StrapiContentDTO<TypicalDocumentDTO>>(`/api/typical-documents/${id}`);

export const updateTypeDocument = (id: string, data: Partial<TypicalDocument & { document_names: { set: number [] }}>) => axiosServices.put<StrapiContentDTO<TypicalDocumentDTO>>(`/api/typical-documents/${id}`, { data });

export const createTypeDocument = (data: TypicalDocument) => axiosServices.post<StrapiContentDTO<TypicalDocumentDTO>>(`/api/typical-documents`, { data });

export const deleteTypeDocument = (id: string) => axiosServices.delete(`/api/typical-documents/${id}`);
