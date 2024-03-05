<script setup lang="ts">
import { ref } from 'vue';
import { useTypeDocumentsStore } from '@/stores/typeDocuments';

const store = useTypeDocumentsStore();
const modelName = ref<string | null>(null);
const description = ref<string | null>(null);

const getTypeDocument = store.createTypeDocument;

function createTypeDocument () {
    if (modelName.value) {
        const now = new Date().toISOString();
        getTypeDocument({
            createdAt: now,
            updatedAt: now,
            publishedAt: now,
            modelName: modelName.value,
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
                v-model="modelName"
            />
            <v-label class="mb-2 font-weight-medium">Описание</v-label>
            <v-textarea
                placeholder="описание типового документа"
                variant="outlined"
                color="primary"
                v-model="description"
            />
        </v-col>
        <v-btn @click="createTypeDocument" color="primary"  variant="flat" dark >Добавить Типовой Документ</v-btn>
    </v-row>
</template>
