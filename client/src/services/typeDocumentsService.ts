import axiosServices from '@/utils/axios';
import type { GetTypeDocumentsParams } from '@/interfaces/documentTypes';
import type { DocumentModel, DocumentModelDTO } from '@/types/dto/documentModel';
import type { StrapiContentListDTO } from '@/types/strapi';

export const getTypeDocumentsPage = (params: GetTypeDocumentsParams) => axiosServices.get<StrapiContentListDTO<DocumentModelDTO>>('/api/model-documents', { params })
