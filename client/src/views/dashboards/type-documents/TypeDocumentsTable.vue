<script setup>
import { storeToRefs } from "pinia";
import { nextTick, ref, watch } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useTypeDocumentsStore } from '@/stores/typeDocuments.store';
import { router } from '@/router';
import TypeDocumentsFilters from '@/views/dashboards/type-documents/TypeDocumentsFilters.vue';
import { useCustomizerStore } from '@/stores/customizer';

const typeModelStore = useTypeDocumentsStore();
const getTypeDocumentsPage = typeModelStore.getTypeDocumentsPage;
const deleteTypeDocument = typeModelStore.deleteTypeDocument;
const customizer = useCustomizerStore();

const {
    typeDocuments,
    total,
    loading,
} = storeToRefs(typeModelStore);
const dialog = ref(false)
const dialogDelete = ref(false)
const headers = ref([
    {
        title: 'Название Документа',
        align: 'start',
        sortable: true,
        key: 'name'
    },
    {
        title: 'Описание',
        align: 'start',
        sortable: false,
        key: 'description'
    },
    {
        title: 'Действия',
        key: 'actions',
        sortable: false,
        align: 'end'
    },
]);
const editedIndex = ref(-1)
const editedItem = ref({
    name: '',
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
})
const defaultItem = ref({
    name: '',
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
})

function deleteItem(item) {
    editedIndex.value = typeDocuments.value.indexOf(item)
    editedItem.value = Object.assign({}, item)
    dialogDelete.value = true
}
function deleteItemConfirm() {
    customizer.showNotification(`Документ Успешно Удален!`, 'success');
    deleteTypeDocument(typeDocuments.value[editedIndex.value].id)
    typeDocuments.value.splice(editedIndex.value, 1)
    closeDelete()
}

function closeDelete() {
    dialogDelete.value = false
    nextTick(() => {
        editedItem.value = Object.assign({}, defaultItem.value)
        editedIndex.value = -1
    })
}
function save() {
    if (editedIndex.value > -1) {
        Object.assign(typeDocuments.value[editedIndex.value], editedItem.value)
    } else {
        typeDocuments.value.push(editedItem.value)
    }
    close()
}
watch(dialog, val => {
    val || close()
})
watch(dialogDelete, val => {
    val || closeDelete()
})

function redirectToDocumentsEditPage (item) {
    router.push(`/type-document/${item.id}`);
}

function redirectToDocumentsCreatePage () {
    router.push(`/type-document-create`);
}

</script>

<template>
    <UiParentCard title="Типовые Документы">
        <TypeDocumentsFilters/>
        <v-data-table-server
            class="border rounded-md document-type-table"
            :headers="headers"
            :items="typeDocuments"
            :items-length="total"
            :loading="loading"
            @update:options="getTypeDocumentsPage"
        >
            <template v-slot:top>
                <v-toolbar class="bg-lightsecondary" flat>
                    <v-spacer></v-spacer>
                    <v-btn @click="redirectToDocumentsCreatePage" color="primary"  variant="flat" dark type="button">Добавить Типовой Документ</v-btn>
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
