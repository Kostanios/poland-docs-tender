import { defineStore } from 'pinia';
import {
    createTypeDocument,
    deleteTypeDocument,
    getTypeDocument,
    getTypeDocumentsPage,
    updateTypeDocument
} from '@/services/typeDocumentsService';
import type { GetTableParams } from '@/interfaces/documentTypes';
import type { TypicalDocument, TypicalDocumentEntity } from '@/types/dto/typicalDocument';

const defaultSort = 'updatedAt:desc';

interface TypeDocumentsStore {
    typeDocuments: TypicalDocumentEntity[],
    typeDocumentDetails: TypicalDocumentEntity | null,
    total: number,
    filters: Record<string, number>,
    params: {
        [filter: string]: string | any
        pagination: {
            page: number,
            pageSize: number,
        },
        filters?: string[],
        sort: string
    },
    loading: boolean
}

export const useTypeDocumentsStore = defineStore({
    id: 'typeDocuments',
    state: (): TypeDocumentsStore => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        typeDocuments: [],
        typeDocumentDetails: null,
        filters: {},
        total: 0,
        params: {
            pagination: {
                page: 0,
                pageSize: 10,
            },
            sort: defaultSort
        },
        loading: false
    }),

    actions: {
        async createTypeDocument (data: TypicalDocument & { document_names: { set: number [] }}, onSuccess?: () => void) {
            try {
                this.loading = true;

                const res = await createTypeDocument(data);

                this.loading = false;

                this.typeDocumentDetails = { ...res.data.data.attributes, id: res.data.data.id }

                if (onSuccess) {
                    onSuccess();
                }
            } catch (e) {
                console.error(e);
                this.loading = false;
                return this.typeDocumentDetails;
            }
        },
        async getTypeDocument (id: string) {
            try {
                this.loading = true;

                const res = await getTypeDocument(id);

                this.loading = false;

                this.typeDocumentDetails = { ...res.data.data.attributes, id: res.data.data.id }

                return this.typeDocumentDetails;
            } catch (e) {
                console.error(e);
                this.loading = false;
                return this.typeDocumentDetails;
            }
        },
        async updateTypeDocument (id: string, data: Partial<TypicalDocument & { document_names: { set: number [] }}>, onSuccess?: () => void) {
            try {
                this.loading = true;

                const res = await updateTypeDocument(id, data);

                this.loading = false;

                this.typeDocumentDetails = { ...res.data.data.attributes, id: res.data.data.id }

                if (onSuccess) {
                    onSuccess();
                }

                return this.typeDocumentDetails;
            } catch (e) {
                console.error(e);
                this.loading = false;
                return this.typeDocumentDetails;
            }
        },
        async deleteTypeDocument (id: string) {
            try {
                this.loading = true;

                await deleteTypeDocument(id);

                this.loading = false;
            } catch (e) {
                console.error(e);
                this.loading = false;
            }
        },
        async getTypeDocuments (params: { populate?: 'document_names' }) {
            try {
                this.loading = true;

                const res = await getTypeDocumentsPage(params);

                this.typeDocuments = res.data?.data.map((e) => ({
                    ...e.attributes,
                    id: e.id,
                }));

                this.total = res.data?.meta.pagination.total;

                this.loading = false;

                return this.typeDocuments;
            } catch (e) {
                console.error(e);
                this.loading = false;
                return this.typeDocuments;
            }
        },
        async getTypeDocumentsPage (tableParams: GetTableParams & { filters?: Record<string, number> } | undefined) {
            try {
                this.loading = true;

                const newParamsPagination = {
                    ...tableParams && {
                        pageSize: tableParams.itemsPerPage || this.params.pagination.pageSize,
                        page: tableParams.page
                    }
                }

                const sortParam = tableParams?.sortBy?.[0];

                const sort = sortParam && `${sortParam.key}:${sortParam.order}`

                this.filters = tableParams?.filters || this.filters;

                this.params = {
                    pagination: { ...this.params.pagination, ...newParamsPagination },
                    sort: sort || defaultSort,
                    ...this.filters
                }

                const res = await getTypeDocumentsPage(this.params);

                this.typeDocuments = res.data?.data.map((e) => ({
                    ...e.attributes,
                    id: e.id,
                }));

                this.total = res.data?.meta.pagination.total;

                this.loading = false;

                return this.typeDocuments;
            } catch (e) {
                console.error(e);
                this.loading = false;
                return this.typeDocuments;
            }
        },
    }
});
