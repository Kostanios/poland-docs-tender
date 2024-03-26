import { defineStore } from 'pinia';
import {
    getDocumentList
} from '@/services/documentGroupService';
import type { DocumentGroupEntity } from '@/types/dto/documentGroup';

interface DocumentGroupStore {
    documentGroups: DocumentGroupEntity[],
    documentGroupDetails: DocumentGroupEntity | null,
    total: number,
    params: {
        pagination: {
            page: number,
            pageSize: number,
        }
    },
    loading: boolean
}

export const useDocumentGroupStore = defineStore({
    id: 'documentGroups',
    state: (): DocumentGroupStore => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        documentGroups: [],
        documentGroupDetails: null,
        total: 0,
        params: {
            pagination: {
                page: 0,
                pageSize: 10,
            },
        },
        loading: false
    }),
    actions: {
        async getDocumentGroup (id: string) {
            try {
                this.loading = true;

                const res = await getDocumentList(id);

                this.loading = false;

                this.documentGroupDetails = { ...res.data.data.attributes, id: res.data.data.id }

                return this.documentGroupDetails;
            } catch (e) {
                console.error(e);
                this.loading = false;
            }
        },
    }
});
