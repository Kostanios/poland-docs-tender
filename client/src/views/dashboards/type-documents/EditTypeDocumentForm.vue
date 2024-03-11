<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTypeDocumentsStore } from '@/stores/typeDocuments.store';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import debounce from '@/utils/debounce';
import { useDocumentNameStore } from '@/stores/documentName.store';
import { router } from '@/router';
import type { DocumentNameEntity } from '@/types/dto/documentName';
import { useNotificationStore } from '@/stores/notofication.store';

const route = useRoute();
const id = route.params.id;
const form = ref()
const notifications = useNotificationStore();
const typeDocumentsStore = useTypeDocumentsStore();
const documentNameStore = useDocumentNameStore();
const { typeDocumentDetails } = storeToRefs(typeDocumentsStore);

const documentNames = ref<DocumentNameEntity[]>([]);
const documentNamesLabels = ref<Object[]>([]);
const name = ref<string | null>(null);
const description = ref<string | null>(null);
const selectValue = ref<string[] | null>(null);

const nameRules = ref([
    (v: string) => !!v || 'Название обязательно',
    (v: string) => (v && v.length <= 30) || 'Название должно быть меньше чем 30 символов'
]);
const documentNamesRules = ref([
    (v: string) => !!v || 'Типовой документ должен иметь минимум 1 связанное Наименование Документа',
    (v: string) => (v && v.length >= 1) || 'Типовой документ должен иметь минимум 1 связанное Наименование Документа',
]);

const getTypeDocument = typeDocumentsStore.getTypeDocument;
const getDocumentNamesPage = documentNameStore.getDocumentNamesPage;
const updateTypeDocument = debounce(typeDocumentsStore.updateTypeDocument, 300);

onMounted(() => {
    if (typeof id === 'string') {
        getTypeDocument(id)
            .then(typeDocumentDetails => {
                name.value = typeDocumentDetails?.name || null;
                description.value = typeDocumentDetails?.description || null;
            });

        getDocumentNamesPage({ populate: 'typical_documents' })
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

function editTypeDocumentHandler () {
    if (typeof id === 'string' && typeDocumentDetails.value) {
        const { createdAt, publishedAt, updatedAt } = typeDocumentDetails.value;
        const documentNamesIdsToSet = selectValue.value?.map(documentName =>
            documentNames.value
                .find(documentNameObj => documentNameObj.name === documentName)?.id
        );
        const onSuccess = () => {
            notifications.showNotification(`Документ Успешно Обновлен!`, 'success');
            router.push('/type-document');
        };

        updateTypeDocument(id, {
            createdAt,
            publishedAt,
            updatedAt,
            description: description.value,
            name: name.value,
            document_names: {
                set: documentNamesIdsToSet
            }
        }, onSuccess)
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
                <v-label class="mb-2 font-weight-medium">Название Типового Документа</v-label>
                <v-text-field
                    variant="outlined"
                    color="primary"
                    :rules="nameRules"
                    v-model="name"
                />
                <v-label class="mb-2 font-weight-medium">Описание</v-label>
                <v-textarea
                    variant="outlined"
                    color="primary"
                    v-model="description"
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
            <v-btn @click="submit" color="success" variant="flat" dark>Сохранить</v-btn>
            <v-btn @click="router.back" color="error" variant="flat" dark>Отмена</v-btn>
        </v-form>
    </v-row>
</template>
