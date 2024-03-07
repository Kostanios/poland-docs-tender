import { defineStore } from 'pinia';
import {
    createTypeDocument,
    deleteTypeDocument,
    getTypeDocument,
    getTypeDocumentsPage,
    updateTypeDocument
} from '@/services/typeDocumentsService';
import type { GetTablePaginationParams } from '@/interfaces/documentTypes';
import type { TypicalDocument, TypicalDocumentEntity } from '@/types/dto/typicalDocument';
import { router } from '@/router';

interface TypeDocumentsStore {
    typeDocuments: TypicalDocumentEntity[],
    typeDocumentDetails: TypicalDocumentEntity | null,
    total: number,
    params: {
        pagination: {
            page: number,
            pageSize: number,
        }
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
        async createTypeDocument (data: TypicalDocument) {
            try {
                this.loading = true;

                const res = await createTypeDocument(data);

                this.loading = false;

                this.typeDocumentDetails = { ...res.data.data.attributes, id: res.data.data.id }

                router.back();
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
        async getTypeDocumentsPage (pagination: GetTablePaginationParams | undefined) {
            try {
                this.loading = true;

                const newParams = {
                    ...pagination && {
                        pageSize: pagination.itemsPerPage,
                        page: pagination.page
                    }
                }

                this.params = { ...this.params, pagination: { ...this.params.pagination, ...newParams } }

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
