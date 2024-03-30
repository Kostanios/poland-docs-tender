import { defineStore } from 'pinia';
import type { DocumentGroup, DocumentGroupEntity } from '@/types/dto/documentGroup';
import { getDocumentGroup, updateDocumentGroup } from '@/services/documentGroupService';

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

                const res = await getDocumentGroup(id);

                this.loading = false;

                this.documentGroupDetails = { ...res.data.data.attributes, id: res.data.data.id }

                return this.documentGroupDetails;
            } catch (e) {
                console.error(e);
                this.loading = false;
            }
        },
        async updateDocumentGroup (id: string, data: Partial<DocumentGroup>, onSuccess?: () => void, onError?: (message: Error) => void) {
            try {
                this.loading = true;

                const res = await updateDocumentGroup(id, data);

                this.loading = false;

                this.documentGroupDetails = { ...res.data.data.attributes, id: res.data.data.id }

                if (onSuccess) {
                    onSuccess();
                }

                return this.documentGroupDetails;
            } catch (e) {
                console.error(e);
                if (onError) {
                    onError(e as Error);
                }
                this.loading = false;
            }
        },
    }
});
