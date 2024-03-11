<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useDocumentNameStore } from '@/stores/documentName.store';
import type { DocumentNameEntity } from '@/types/dto/documentName';
import { useTypeDocumentsStore } from '@/stores/typeDocuments.store';

const typicalDocumentStore = useTypeDocumentsStore();
const documentNameStore = useDocumentNameStore();
const getTypeDocumentsPage = typicalDocumentStore.getTypeDocumentsPage;
const params = typicalDocumentStore.params;

const select = ref([])

const documentNames = ref<DocumentNameEntity[]>([]);
const documentNamesLabels = ref<Object[]>([]);

const getDocumentNamesPage = documentNameStore.getDocumentNamesPage;

onMounted(() => {
    getDocumentNamesPage({ populate: 'typical_documents' })
        .then((data) => {
            documentNames.value = data;
            documentNamesLabels.value = data.map(documentName => documentName.name);
        });
});

function onselect (values: string[]) {
    const documentNamesIdsToSet = values.map(documentName =>
        documentNames.value
            .find(documentNameObj => documentNameObj.name === documentName)?.id || 0
    );
    const filters = documentNamesIdsToSet.reduce<Record<string, number>>((filters, id, index) => {
        return {
            ...filters,
            [`filters[document_names][id][$in][${index}]`]: id
        }
    }, {});
    getTypeDocumentsPage({ page: 0, itemsPerPage: params.pagination.pageSize, filters })
}

</script>
<template>
    <v-row class="type-documents-filters">
        <v-col cols="12">
            <v-combobox
                clearable
                @update:model-value="onselect"
                v-model="select"
                :items="documentNamesLabels"
                hide-details
                label="Наименования Документов"
                multiple
                chips
            >
            </v-combobox>
        </v-col>
        <v-spacer/>
    </v-row>
</template>
