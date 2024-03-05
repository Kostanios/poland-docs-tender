import axiosServices from '@/utils/axios';
import type { GetTypeDocumentsParams } from '@/interfaces/documentTypes';
import type { DocumentModel, DocumentModelDTO } from '@/types/dto/documentModel';
import type { StrapiContentDTO, StrapiContentListDTO } from '@/types/strapi';

export const getTypeDocumentsPage = (params: GetTypeDocumentsParams) => axiosServices.get<StrapiContentListDTO<DocumentModelDTO>>('/api/model-documents', { params });

export const getTypeDocument = (id: string) => axiosServices.get<StrapiContentDTO<DocumentModelDTO>>(`/api/model-documents/${id}`);

export const updateTypeDocument = (id: string, data: DocumentModel) => axiosServices.put<StrapiContentDTO<DocumentModelDTO>>(`/api/model-documents/${id}`, { data });

export const createTypeDocument = (data: DocumentModel) => axiosServices.post<StrapiContentDTO<DocumentModelDTO>>(`/api/model-documents`, { data });

export const deleteTypeDocument = (id: string) => axiosServices.delete(`/api/model-documents/${id}`);
