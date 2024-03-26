import { defineStore } from 'pinia';
import type { GetTableParams } from '@/interfaces/documentTypes';
import {
    createDocumentName,
    deleteDocumentName,
    getDocumentName,
    getDocumentNamesPage,
    updateDocumentName
} from '@/services/documentNameService';
import { type DocumentName, type DocumentNameEntity, DocumentNameInputType } from '@/types/dto/documentName';

interface DocumentNameStore {
    documentNames: DocumentNameEntity[],
    documentNameDetails: DocumentNameEntity | null,
    total: number,
    params: {
        pagination: {
            page: number,
            pageSize: number,
        },
        filters?: {
            typical_documents?: {
                id: {
                    $eq: string
                }
            },
            name?: {
                $containsi: string | null
            }
            inputType?: {
                $eq: string | null
            }
        },
        populate?: 'typical_documents' | 'document_lists',
    },
    loading: boolean
}

export const useDocumentNameStore = defineStore({
    id: 'documentNames',
    state: (): DocumentNameStore => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        documentNames: [],
        documentNameDetails: null,
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
        async createDocumentName (data: DocumentName & { typical_documents: { set: number [] }}, onSuccess?: () => void) {
            try {
                this.loading = true;

                await createDocumentName(data);

                this.loading = false;

                if (onSuccess) {
                    onSuccess();
                }
            } catch (e) {
                console.error(e);
                this.loading = false;
                return this.documentNameDetails;
            }
        },
        async getDocumentName (id: string) {
            try {
                this.loading = true;

                const res = await getDocumentName(id);

                this.loading = false;

                this.documentNameDetails = { ...res.data.data.attributes, id: res.data.data.id }

                return this.documentNameDetails;
            } catch (e) {
                console.error(e);
                this.loading = false;
            }
        },
        async getDocumentNamesPage (params?: Partial<GetTableParams & {
            typicalDocumentsId?: string,
            populate?: 'typical_documents' | 'document_lists',
            filters: {
                name?: string,
                inputType?: DocumentNameInputType
            }
        }> | undefined) {
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
                            typical_documents: {
                                id: {
                                    $eq: params.typicalDocumentsId
                                }
                            }
                        }
                    };
                }

                if (params?.filters) {
                    this.params = {
                        ...this.params, filters: {
                            name: {
                                $containsi: params.filters.name || null
                            },
                            inputType: {
                                $eq: params?.filters.inputType || null
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
        async updateDocumentName (id: string, data: Partial<DocumentName & { typical_documents: { set: number [] }}>, onSuccess?: () => void) {
            try {
                this.loading = true;

                const res = await updateDocumentName(id, data);

                this.loading = false;

                this.documentNameDetails = { ...res.data.data.attributes, id: res.data.data.id }

                if (onSuccess) {
                    onSuccess();
                }

                return this.documentNameDetails;
            } catch (e) {
                console.error(e);
                this.loading = false;
            }
        },
        async deleteDocumentName (id: string) {
            try {
                this.loading = true;

                await deleteDocumentName(id);

                this.loading = false;

                return this.documentNameDetails;
            } catch (e) {
                console.error(e);
                this.loading = false;
            }
        }
    }
});
