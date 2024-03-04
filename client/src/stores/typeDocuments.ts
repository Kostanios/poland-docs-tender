import { defineStore } from 'pinia';
import { getTypeDocumentsPage } from '@/services/typeDocumentsService';
import type { GetTypeDocumentsPagination } from '@/interfaces/documentTypes';
import type { DocumentModel } from '@/types/dto/documentModel';

interface TypeDocumentsStore {
    typeDocuments: DocumentModel[],
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
        async getTypeDocumentsPage (pagination: GetTypeDocumentsPagination | undefined) {
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

                console.log(this.total)

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
