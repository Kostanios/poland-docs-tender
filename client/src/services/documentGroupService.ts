import axiosServices from '@/utils/axios';
import type { StrapiContentDTO } from '@/types/strapi';
import type { DocumentGroup, DocumentGroupDTO } from '@/types/dto/documentGroup';


export const getDocumentGroup = (id: string) => axiosServices.get<StrapiContentDTO<DocumentGroupDTO>>(`/api/document-groups/${id}`);

export const updateDocumentGroup = (id: string, data: Partial<DocumentGroup>) => axiosServices.put<StrapiContentDTO<DocumentGroupDTO>>(`/api/document-groups/${id}`, { data });
