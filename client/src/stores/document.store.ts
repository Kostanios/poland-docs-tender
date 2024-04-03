import { defineStore } from 'pinia';
import { getDocument, createDocument } from '@/services/documentService';
import type { DocumentEntity, Document } from '@/types/dto/document';
import type { TypicalDocument } from '@/types/dto/typicalDocument';
import { updateTypeDocument } from '@/services/typeDocumentsService';

interface DocumentStore {
    documents: DocumentEntity[],
    documentDetails: DocumentEntity | null,
    total: number,
    params: {
        pagination: {
            page: number,
            pageSize: number,
        },
    },
    loading: boolean
}

export const useDocumentStore = defineStore({
    id: 'document',
    state: (): DocumentStore => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        documents: [],
        documentDetails: null,
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
        async createDocument (data: Document, onSuccess?: () => void) {
            try {
                this.loading = true;

                await createDocument(data);

                this.loading = false;

                if (onSuccess) {
                    onSuccess();
                }
            } catch (e) {
                console.error(e);
                this.loading = false;
                return this.documentDetails;
            }
        },
        async updateDocument (id: string, data: Partial<Document>, onSuccess?: () => void) {
            try {
                this.loading = true;

                const res = await updateTypeDocument(id, data);

                this.loading = false;

                this.documentDetails = { ...res.data.data.attributes, id: res.data.data.id }

                if (onSuccess) {
                    onSuccess();
                }

                return this.documentDetails;
            } catch (e) {
                console.error(e);
                this.loading = false;
                return this.documentDetails;
            }
        },
        async getDocument (id: string) {
            try {
                this.loading = true;

                const res = await getDocument(id);

                this.loading = false;

                this.documentDetails = { ...res.data.data.attributes, id: res.data.data.id }

                return this.documentDetails;
            } catch (e) {
                console.error(e);
                this.loading = false;
            }
        }
    }
});
