<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTypeDocumentsStore } from '@/stores/typeDocuments.store';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useDocumentNameStore } from '@/stores/documentName.store';
import { router } from '@/router';
import { type DocumentNameEntity, DocumentNameInputType } from '@/types/dto/documentName';
import { useNotificationStore } from '@/stores/notofication.store';
import type { TypicalDocumentEntity } from '@/types/dto/typicalDocument';
import { useDocumentStore } from '@/stores/document.store';

const route = useRoute();
const id = route.params.id;
const form = ref()
const notifications = useNotificationStore();
const documentNameStore = useDocumentNameStore();
const documentStore = useDocumentStore();
const { documentNameDetails } = storeToRefs(documentNameStore);

const documentNames = ref<DocumentNameEntity[]>([]);
const name = ref<string | null>(null);
const selectValue = ref<string[] | null>(null);
const description = ref<string | null>(null);
const selectedTypicalDocuments = ref<string[] | null>(null);
const typicalDocuments = ref<TypicalDocumentEntity[]>([]);
const documentNamesLabels = ref<Object[]>([]);

const nameRules = ref([
    (v: string) => !!v || 'Название обязательно',
    (v: string) => (v && v.length <= 30) || 'Название должно быть меньше чем 30 символов'
]);

const documentNamesRules = ref([
    (v: string) => !!v || 'Типовой документ должен иметь минимум 1 связанное Наименование Документа',
    (v: string) => (v && v.length >= 1) || 'Типовой документ должен иметь минимум 1 связанное Наименование Документа',
]);

const updateDocumentName = documentNameStore.updateDocumentName;
const getDocument = documentStore.getDocument;
const getDocumentNamesPage = documentNameStore.getDocumentNamesPage;

onMounted(() => {
    if (typeof id === 'string') {
        getDocument(id)
            .then(documentNameDetails => {
                name.value = documentNameDetails?.name || null;
            });

        getDocumentNamesPage({ populate: 'document_lists' })
            .then((data) => {
                documentNames.value = data;
                documentNamesLabels.value = data.map(documentName => ({
                    ...documentName,
                    title: documentName.name
                }));
                selectValue.value = data.filter(documentName => documentName?.document_lists?.data?.find(typicalDocument => typicalDocument.id === Number(id))).map(documentName => documentName.name);
            });

        // getTypeDocuments({ populate: 'document_names' })
        //     .then((data) => {
        //         typicalDocuments.value = data;
        //         typicalDocumentsLabels.value = data.map(documentName => ({
        //             ...documentName,
        //             title: documentName.name
        //         }));

        //         selectedTypicalDocuments.value = data
        //             .filter(typicalDocument => typicalDocument.document_names?.data?.find(documentName => documentName.id === Number(id)))
        //             .map(typicalDocument => typicalDocument.name);
        //     });
    }

});

function editTypeDocumentHandler () {
    if (typeof id === 'string' && documentNameDetails.value) {
        const { createdAt, publishedAt, updatedAt } = documentNameDetails.value;
        const onSuccess = () => {
            notifications.showNotification(`Документ Успешно Обновлен!`, 'success');
            router.push('/document-name');
        };

        if (name.value) {
            updateDocumentName(id, {
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

    if (valid) editTypeDocumentHandler();
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
                <v-label class="mb-2 font-weight-medium">Связанные Наименования Документов</v-label>
                <v-autocomplete
                    multiple
                    chips
                    :rules="documentNamesRules"
                    v-model="selectValue"
                    :items="documentNamesLabels"
                    color="primary"
                    variant="outlined"
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
