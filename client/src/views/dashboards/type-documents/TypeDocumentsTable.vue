<script setup>
import { storeToRefs } from "pinia";
import { computed, nextTick, ref, watch } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useTypeDocumentsStore } from '@/stores/typeDocuments';
import { router } from '@/router';

const typeModelStore = useTypeDocumentsStore();
const getTypeDocumentsPage = typeModelStore.getTypeDocumentsPage;
const {
    typeDocuments,
    total,
    loading,
} = storeToRefs(typeModelStore);
const dialog = ref(false)
const dialogDelete = ref(false)
const headers = ref([
    {
        title: 'Document Name',
        align: 'start',
        sortable: true,
        key: 'modelName'
    },
    {
        title: 'Description',
        align: 'start',
        sortable: false,
        key: 'description'
    },
    {
        title: 'Actions',
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
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'New Item' : 'Edit Item'
})

function deleteItem(item) {
    editedIndex.value = typeDocuments.value.indexOf(item)
    editedItem.value = Object.assign({}, item)
    dialogDelete.value = true
}
function deleteItemConfirm() {
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

</script>

<template>
    <UiParentCard title="Наименования Документов">
        <v-data-table-server
            class="border rounded-md document-type-table"
            :headers="headers"
            :items="typeDocuments"
            :items-length="total"
            :sort-by="[{ key: 'calories', order: 'asc' }]"
            :loading="loading"
            @update:options="getTypeDocumentsPage"
        >
            <template v-slot:top>
                <v-toolbar class="bg-lightsecondary" flat>
                    <v-spacer></v-spacer>
                    <v-btn color="primary"  variant="flat" dark >Add New Item</v-btn>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5 text-center py-6">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="error" variant="flat" dark   @click="closeDelete">Cancel</v-btn>
                                <v-btn color="success" variant="flat" dark   @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>plo
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
<!--            <template v-slot:no-data>-->
<!--                <v-btn color="primary" @click="initialize">-->
<!--                    Reset-->
<!--                </v-btn>-->
<!--            </template>-->
        </v-data-table-server>
    </UiParentCard>
</template>

<style scoped>
/* Set header height using CSS variables */
:root {
    --v-table-header-height: 32px;
}
</style>