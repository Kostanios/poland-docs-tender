<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { router } from '@/router';
import { type DocumentNameEntity } from '@/types/dto/documentName';
import { useNotificationStore } from '@/stores/notification.store';
import { useDocumentGroupStore } from '@/stores/documentGroup.store';
import { useDocumentNameStore } from '@/stores/documentName.store';
import { storeToRefs } from 'pinia';

const route = useRoute();
const id = route.params.id;
const form = ref();
const notifications = useNotificationStore();
const documentGroupStore = useDocumentGroupStore();
const documentNameStore = useDocumentNameStore();
const { documentGroupDetails } = storeToRefs(documentGroupStore);

const name = ref<string | null>(null);
const selectValue = ref<string[] | null>(null);
const description = ref<string | null>(null);
const selectedTypicalDocuments = ref<string[] | null>(null);

const nameRules = ref([
    (v: string) => !!v || 'Название обязательно',
    (v: string) => (v && v.length <= 30) || 'Название должно быть меньше чем 30 символов'
]);

const documentNames = ref<DocumentNameEntity[]>([]);
const documentNamesLabels = ref<Object[]>([]);
const getDocumentGroup = documentGroupStore.getDocumentGroup;
const updateDocumentGroup = documentGroupStore.updateDocumentGroup;
const getDocumentNamesPage = documentNameStore.getDocumentNamesPage;

onMounted(() => {
    if (typeof id === 'string') {
        getDocumentGroup(id)
            .then((documentGroupDetails) => {
                name.value = documentGroupDetails?.name || null;

            });

        console.log(documentNameStore);
        getDocumentNamesPage({ populate: 'document_lists' })
            .then((data) => {
                documentNames.value = data;
                documentNamesLabels.value = data.map(documentName => ({
                    ...documentName,
                    title: documentName.name
                }));
                selectValue.value = data.filter(documentName => documentName?.typical_documents?.data?.find(typicalDocument => typicalDocument.id === Number(id))).map(documentName => documentName.name);
            });
    }
});

function editDocumentGroupHandler () {
    if (typeof id === 'string' && documentGroupDetails.value) {
        const { createdAt, publishedAt, updatedAt } = documentGroupDetails.value;
        // const typicalDocumentsIdsToSet = selectedTypicalDocuments.value?.map(selectedTypicalDocumentName =>
        //     typicalDocuments.value
        //         .find(typicalDocumentsObj => typicalDocumentsObj.name === selectedTypicalDocumentName)?.id as number
        // );
        const onSuccess = () => {
            notifications.showNotification(`Документ Успешно Обновлен!`, 'success');
            router.push('/document-group');
        };

        if (name.value) {
            updateDocumentGroup(id, {
                createdAt,
                publishedAt,
                updatedAt,
                name: name.value,
            }, onSuccess)
        }

    }
}

async function submit (e: Event) {
    e.preventDefault();

    const { valid } = await form.value.validate();

    if (valid) editDocumentGroupHandler();
}

</script>
<template>
    <v-row class="edit-type-form">
        <v-form ref="form" @submit="submit">
            <v-col cols="12" lg="12">
                <v-label
                    class="mb-2 font-weight-medium"
                >
                    Наименование Документа
                </v-label>
                <v-text-field
                    :rules="nameRules"
                    placeholder="Наименование документа"
                    variant="outlined"
                    color="primary"
                    v-model="name"
                />
            </v-col>
            <v-btn
                type="submit"
                color="success"
                variant="flat"
                dark
            >
                Сохранить
            </v-btn>
            <v-btn
                @click="router.back"
                color="error"
                variant="flat"
                dark
            >
                Отмена
            </v-btn>
        </v-form>
    </v-row>
</template>
