<script setup lang="ts">
import { ref } from 'vue';
import { useDocumentNameStore } from '@/stores/documentName.store';
import { DocumentNameInputType } from '@/types/dto/documentName';
import { storeToRefs } from 'pinia';

const documentNameStore = useDocumentNameStore();
const getDocumentNamesPage = documentNameStore.getDocumentNamesPage;
const { params } = storeToRefs(documentNameStore);

const select = ref<DocumentNameInputType | undefined>(undefined);
const name = ref("");

const DocumentNameInputTypeLabels = ref([{
    title: 'Список',
    value: DocumentNameInputType.MULTIPLE
}, {
    title: 'Одиночный',
    value: DocumentNameInputType.SINGLE
}]);

function onsearch (query: string) {
    getDocumentNamesPage({
        page: 0,
        itemsPerPage: params.value.pagination.pageSize,
        filters: {
            inputType: select.value,
            name: query
        }

    })
}

function onselect (item: DocumentNameInputType | undefined) {
    getDocumentNamesPage({
        page: 0,
        itemsPerPage: params.value.pagination.pageSize,
        filters: {
            inputType: item,
            name: name.value
        }

    })
}

</script>
<template>
    <v-row class="type-documents-filters" align="center">
            <v-text-field
                @update:model-value="onsearch"
                v-model="name"
                hide-details
                clearable
                label="Наименование Документа"
            />
            <v-select
                @update:modelValue="onselect"
                v-model="select"
                :items="DocumentNameInputTypeLabels"
                hide-details
                label="Тип Файла"
                clearable
            />
        <v-spacer/>
    </v-row>
</template>
