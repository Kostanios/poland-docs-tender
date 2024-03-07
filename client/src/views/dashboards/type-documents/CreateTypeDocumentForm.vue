<script setup lang="ts">
import { ref } from 'vue';
import { useTypeDocumentsStore } from '@/stores/typeDocuments';

const store = useTypeDocumentsStore();
const name = ref<string | null>(null);
const description = ref<string | null>(null);

const createTypeDocument = store.createTypeDocument;

function createTypeDocumentHandler () {
    if (name.value) {
        const now = new Date().toISOString();
        createTypeDocument({
            createdAt: now,
            updatedAt: now,
            publishedAt: now,
            name: name.value,
            description: description.value
        })
    }
}

</script>
<template>
    <v-row>
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
        </v-col>
        <v-btn @click="createTypeDocumentHandler" color="primary" variant="flat" dark>
            Добавить Типовой Документ
        </v-btn>
    </v-row>
</template>
