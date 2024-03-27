import axiosServices from '@/utils/axios';
import type { TypicalDocument, TypicalDocumentDTO } from '@/types/dto/typicalDocument';
import type { GetStrapiPaginationParams, StrapiContentDTO, StrapiContentListDTO } from '@/types/strapi';
import type { DocumentGroupDTO } from '@/types/dto/documentGroup';

export const createDocumentGroup = (data: TypicalDocument) => axiosServices.post<StrapiContentDTO<TypicalDocumentDTO>>(`/api/typical-documents`, { data });

export const getDocumentList = (id: string) => axiosServices.get<StrapiContentDTO<DocumentGroupDTO>>(`/api/document-lists/${id}`);

export const updateDocumentGroup = (id: string, data: Partial<TypicalDocument & { document_names: { set: number [] }}>) => axiosServices.put<StrapiContentDTO<TypicalDocumentDTO>>(`/api/typical-documents/${id}`, { data });

export const deleteDocumentGroup = (id: string) => axiosServices.delete(`/api/typical-documents/${id}`);
