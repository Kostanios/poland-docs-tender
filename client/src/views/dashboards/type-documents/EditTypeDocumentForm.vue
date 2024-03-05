<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTypeDocumentsStore } from '@/stores/typeDocuments';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import debounce from '@/utils/debounce';

const route = useRoute();
const id = route.params.id;
const store = useTypeDocumentsStore();
const { typeDocumentDetails } = storeToRefs(store);
const modelName = ref<string | null>(null);
const description = ref<string | null>(null);

const getTypeDocument = store.getTypeDocument;
const updateTypeDocument = debounce(store.updateTypeDocument, 300);

onMounted(() => typeof id === 'string' && getTypeDocument(id)
    .then(typeDocumentDetails => {
        modelName.value = typeDocumentDetails?.modelName || null
        description.value = typeDocumentDetails?.description || null
    })
);

function onModelNameChange (e: Event) {
    if (typeof id === 'string' && typeDocumentDetails.value) {
        const { createdAt, description, publishedAt, updatedAt } = typeDocumentDetails.value;
        updateTypeDocument(id, {
            createdAt,
            description,
            publishedAt,
            updatedAt,
            modelName: (e.target as HTMLInputElement).value || typeDocumentDetails.value.modelName
        })
    }
}

function onDescriptionChange (e: Event) {
    if (typeof id === 'string' && typeDocumentDetails.value) {
        const { createdAt, publishedAt, updatedAt, modelName } = typeDocumentDetails.value;
        updateTypeDocument(id, {
            createdAt,
            description: (e.target as HTMLInputElement).value || typeDocumentDetails.value.description,
            publishedAt,
            updatedAt,
            modelName,
        })
    }
}

</script>
<template>
    <v-row>
        <v-col cols="12" lg="12">
            <v-label class="mb-2 font-weight-medium">Название Типового Документа</v-label>
            <v-text-field @input="onModelNameChange" variant="outlined" color="primary" v-model="modelName"/>
            <v-label class="mb-2 font-weight-medium">Описание</v-label>
            <v-textarea @input="onDescriptionChange" variant="outlined" color="primary" v-model="description"/>
        </v-col>
    </v-row>
</template>
