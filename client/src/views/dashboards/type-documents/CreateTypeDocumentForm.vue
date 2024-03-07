<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTypeDocumentsStore } from '@/stores/typeDocuments';
import type { DocumentNameEntity } from '@/types/dto/documentName';
import { useDocumentNameStore } from '@/stores/documentName';
import { router } from '@/router';

const documentNameStore = useDocumentNameStore();
const store = useTypeDocumentsStore();
const name = ref<string | null>(null);
const description = ref<string | null>(null);
const documentNames = ref<DocumentNameEntity[]>([]);
const documentNamesLabels = ref<Object[]>([]);
const selectValue = ref<string[] | null>(null);

const createTypeDocument = store.createTypeDocument;
const getDocumentNamesPage = documentNameStore.getDocumentNamesPage;

function createTypeDocumentHandler () {
    const documentNamesIdsToSet = selectValue.value?.map(documentName =>
        documentNames.value
            .find(documentNameObj => documentNameObj.name === documentName)?.id || 0
    );

    if (name.value) {
        const now = new Date().toISOString();

        createTypeDocument({
            createdAt: now,
            updatedAt: now,
            publishedAt: now,
            name: name.value,
            description: description.value,
            document_names: {
                set: documentNamesIdsToSet || []
            }
        })
    }
}

onMounted(() => {
    getDocumentNamesPage({ populate: 'typical_document' })
        .then((data) => {
            documentNames.value = data;
            documentNamesLabels.value = data.map(documentName => ({
                ...documentName,
                title: documentName.name
            }));
        });
});

</script>
<template>
    <v-row class="edit-type-form">
        <v-col cols="12" lg="12">
            <v-label
                class="mb-2 font-weight-medium"
            >
                Название Типового Документа
            </v-label>
            <v-text-field
                placeholder="название типового документа"
                variant="outlined"
                color="primary"
                v-model="name"
            />
            <v-label class="mb-2 font-weight-medium">Описание</v-label>
            <v-textarea
                placeholder="описание типового документа"
                variant="outlined"
                color="primary"
                v-model="description"
            />
            <v-label class="mb-2 font-weight-medium">Связанные Наименования Документов</v-label>
            <v-autocomplete
                multiple
                chips
                v-model="selectValue"
                :items="documentNamesLabels"
                color="primary"
                variant="outlined"
                hide-details
            />
        </v-col>
        <v-btn @click="createTypeDocumentHandler" color="success" variant="flat" dark>
            Добавить Типовой Документ
        </v-btn>
        <v-btn @click="router.back" color="error" variant="flat" dark>Отмена</v-btn>
    </v-row>
</template>
