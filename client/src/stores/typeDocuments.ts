import { defineStore } from 'pinia';
import { getTypeDocumentsPage } from '@/services/typeDocumentsService';
import type { GetTypeDocumentsPagination } from '@/interfaces/documentTypes';

export const useTypeDocumentsStore = defineStore({
    id: 'typeDocuments',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        typeDocuments: [],
        params: {
            pagination: {
                page: 0,
                pageSize: 10,
            }
        },
        loading: {
            getTypeDocumentsPage: false,
        },
        error: {
            getTypeDocumentsPage: null,
        }
    }),
    actions: {
        async getTypeDocumentsPage (pagination: Partial<GetTypeDocumentsPagination> | undefined) {
            try {
                this.loading.getTypeDocumentsPage = true;

                this.params = { ...this.params, pagination: { ...this.params.pagination, ...pagination } }

                const res = await getTypeDocumentsPage(this.params);

                console.log(res);
            } catch (e) {

            }
        }
    }
});
