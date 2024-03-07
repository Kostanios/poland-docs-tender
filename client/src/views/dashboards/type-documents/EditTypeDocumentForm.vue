<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTypeDocumentsStore } from '@/stores/typeDocuments';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import debounce from '@/utils/debounce';
import { useDocumentNameStore } from '@/stores/documentName';
import { router } from '@/router';
import type { DocumentNameEntity } from '@/types/dto/documentName';

const route = useRoute();
const id = route.params.id;
const typeDocumentsStore = useTypeDocumentsStore();
const documentNameStore = useDocumentNameStore();
const { typeDocumentDetails } = storeToRefs(typeDocumentsStore);

const documentNames = ref<DocumentNameEntity[]>([]);
const documentNamesLabels = ref<Object[]>([]);
const name = ref<string | null>(null);
const description = ref<string | null>(null);
const selectValue = ref<string[] | null>(null);

const getTypeDocument = typeDocumentsStore.getTypeDocument;
const getDocumentNamesPage = documentNameStore.getDocumentNamesPage;
const updateTypeDocument = debounce(typeDocumentsStore.updateTypeDocument, 300);

onMounted(() => {
    if (typeof id === 'string') {
        getTypeDocument(id)
            .then(typeDocumentDetails => {
                name.value = typeDocumentDetails?.name || null;
                description.value = typeDocumentDetails?.description || null;
            });

        getDocumentNamesPage({ populate: 'typical_document' })
            .then((data) => {
                documentNames.value = data;
                documentNamesLabels.value = data.map(documentName => ({
                    ...documentName,
                    title: documentName.name
                }));
                selectValue.value = data.filter(documentName => documentName?.typical_document?.data?.id === Number(id)).map(documentName => documentName.name);
            });
    }


});

function submitForm () {
    if (typeof id === 'string' && typeDocumentDetails.value) {
        const { createdAt, publishedAt, updatedAt } = typeDocumentDetails.value;
        const documentNamesIdsToSet = selectValue.value?.map(documentName =>
            documentNames.value
                .find(documentNameObj => documentNameObj.name === documentName)?.id
        );
        updateTypeDocument(id, {
            createdAt,
            publishedAt,
            updatedAt,
            description: description.value,
            name: name.value,
            document_names: {
                set: documentNamesIdsToSet
            }
        }, router.back)
    }
}

</script>
<template>
    <v-row class="edit-type-form">
        <v-col cols="12" lg="12">
            <v-label class="mb-2 font-weight-medium">Название Типового Документа</v-label>
            <v-text-field
                variant="outlined"
                color="primary"
                v-model="name"
            />
            <v-label class="mb-2 font-weight-medium">Описание</v-label>
            <v-textarea
                variant="outlined"
                color="primary"
                v-model="description"
            />
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
        <v-btn @click="submitForm" color="success" variant="flat" dark>Сохранить</v-btn>
        <v-btn @click="router.back" color="error" variant="flat" dark>Отмена</v-btn>
    </v-row>
</template>
