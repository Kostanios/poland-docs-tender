<script setup>
import { storeToRefs } from "pinia";
import { nextTick, ref, watch } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { router } from '@/router';
import { useNotificationStore } from '@/stores/notification.store';
import { useDocumentNameStore } from '@/stores/documentName.store';
import { columnsConfig } from '@/views/dashboards/document-names/constants';
import { getFileTypeLabel } from '@/views/dashboards/document-names/helper';
import DocumentNamesFilters from '@/views/dashboards/document-names/DocumentNamesFilters.vue';

const documentNameStore = useDocumentNameStore();
const getDocumentNamesPage = documentNameStore.getDocumentNamesPage;
const notifications = useNotificationStore();
const deleteDocumentName = documentNameStore.deleteDocumentName;

const {
    documentNames,
    total,
    loading,
} = storeToRefs(documentNameStore);
const dialog = ref(false)
const dialogDelete = ref(false)
const headers = ref(columnsConfig);
const editedIndex = ref(-1)

function deleteItem(item) {
    editedIndex.value = documentNames.value.indexOf(item);
    dialogDelete.value = true
}

function deleteItemConfirm() {
    notifications.showNotification(`Документ Успешно Удален!`, 'success');
    deleteDocumentName(documentNames.value[editedIndex.value].id)
    documentNames.value.splice(editedIndex.value, 1)
    closeDelete()
}

function closeDelete() {
    dialogDelete.value = false
    nextTick(() => {
        editedIndex.value = -1
    })
}

watch(dialog, val => {
    val || close()
})
watch(dialogDelete, val => {
    val || closeDelete()
})

function redirectToDocumentsEditPage (item) {
    router.push(`/document-name/${item.id}`);
}

function redirectToDocumentNameCreatePage () {
    router.push(`/document-name-create`);
}

</script>

<template>
    <UiParentCard title="Типовые Документы">
        <DocumentNamesFilters/>
        <v-data-table-server
            class="border rounded-md document-names-table"
            :headers="headers"
            :items="documentNames"
            :items-length="total"
            :loading="loading"
            @update:options="getDocumentNamesPage"
        >
            <template v-slot:top>
                <v-toolbar class="bg-lightsecondary" flat>
                    <v-spacer></v-spacer>
                    <v-btn @click="redirectToDocumentNameCreatePage" color="primary" variant="flat" dark type="button">Добавить Наименование Документа</v-btn>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5 text-center py-6">Вы уверены что хотите удалить документ?</v-card-title>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn color="error" variant="flat" dark @click="closeDelete">отмена</v-btn>
                                <v-btn color="success" variant="flat" dark @click="deleteItemConfirm">ок</v-btn>
                                <v-spacer/>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.inputType="{ item }">
                {{getFileTypeLabel(item.inputType)}}
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon color="info" size="small" class="me-2" @click="redirectToDocumentsEditPage(item)">
                    mdi-pencil
                </v-icon>
                <v-icon color="error" size="small" @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table-server>
    </UiParentCard>
</template>

<style scoped>
/* Set header height using CSS variables */
:root {
    --v-table-header-height: 32px;
}
</style>
