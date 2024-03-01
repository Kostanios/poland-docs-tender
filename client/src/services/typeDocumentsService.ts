import axiosServices from '@/utils/axios';
import type { GetTypeDocumentsParams } from '@/interfaces/documentTypes';

export const getTypeDocumentsPage = (params: GetTypeDocumentsParams) => axiosServices.get<[]>('/api/model-documents', { params })
