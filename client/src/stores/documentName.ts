import { defineStore } from 'pinia';
import type { GetTablePaginationParams } from '@/interfaces/documentTypes';
import { getDocumentNamesPage } from '@/services/documentNameService';
import type { DocumentNameEntity } from '@/types/dto/documentName';

interface DocumentNameStore {
    documentNames: DocumentNameEntity[],
    typeDocumentDetails: DocumentNameEntity | null,
    total: number,
    params: {
        pagination: {
            page: number,
            pageSize: number,
        },
        filters?: {
            typical_document?: {
                id: {
                    $eq: string
                }
            }
        },
        populate?: 'typical_document'
    },
    loading: boolean
}

export const useDocumentNameStore = defineStore({
    id: 'documentNames',
    state: (): DocumentNameStore => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        documentNames: [],
        typeDocumentDetails: null,
        total: 0,
        params: {
            pagination: {
                page: 0,
                pageSize: 10,
            }
        },
        loading: false
    }),
    actions: {
        async getDocumentNamesPage (params?: Partial<GetTablePaginationParams & { typicalDocumentsId?: string, populate?: 'typical_document' }> | undefined) {
            try {
                this.loading = true;

                const newParams = {
                    ...params && {
                        pageSize: params.itemsPerPage,
                        page: params.page
                    },
                }

                this.params = { ...this.params, pagination: { ...this.params.pagination, ...newParams } };

                if (params?.typicalDocumentsId) {
                    this.params = {
                        ...this.params, filters: {
                            typical_document: {
                                id: {
                                    $eq: params.typicalDocumentsId
                                }
                            }
                        }
                    };
                }

                if (params?.populate) {
                    this.params = {
                        ...this.params,
                        populate: params.populate
                    };
                }

                const res = await getDocumentNamesPage(this.params);

                this.total = res.data?.meta.pagination.total;

                this.documentNames = res.data?.data.map(e => ({...e.attributes, id: e.id})) || []

                this.loading = false;

                return this.documentNames;
            } catch (e) {
                console.error(e);
                this.loading = false;
                return this.documentNames;
            }
        },
    }
});
