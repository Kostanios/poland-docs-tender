<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTypeDocumentsStore } from '@/stores/typeDocuments.store';
import type { DocumentNameEntity } from '@/types/dto/documentName';
import { useDocumentNameStore } from '@/stores/documentName.store';
import { router } from '@/router';
import { useCustomizerStore } from '@/stores/customizer';

const documentNameStore = useDocumentNameStore();
const form = ref()
const store = useTypeDocumentsStore();
const customizer = useCustomizerStore();

const name = ref<string | null>(null);
const description = ref<string | null>(null);
const documentNames = ref<DocumentNameEntity[]>([]);
const documentNamesLabels = ref<Object[]>([]);
const selectValue = ref<string[] | null>(null);

const nameRules = ref([
    (v: string) => !!v || 'Название обязательно',
    (v: string) => (v && v.length <= 30) || 'Название должно быть меньше чем 30 символов'
]);
const documentNamesRules = ref([
    (v: string) => !!v || 'Типовой документ должен иметь минимум 1 связанное Наименование Документа',
    (v: string) => (v && v.length >= 1) || 'Типовой документ должен иметь минимум 1 связанное Наименование Документа',
]);

const createTypeDocument = store.createTypeDocument;
const getDocumentNamesPage = documentNameStore.getDocumentNamesPage;

function createTypeDocumentHandler () {
    const documentNamesIdsToSet = selectValue.value?.map(documentName =>
        documentNames.value
            .find(documentNameObj => documentNameObj.name === documentName)?.id || 0
    );

    if (name.value) {
        const now = new Date().toISOString();

        const onSuccess = () => {
            customizer.showNotification(`Документ Успешно Создан!`, 'success');
            router.push('/type-document');
        };

        createTypeDocument({
            createdAt: now,
            updatedAt: now,
            publishedAt: now,
            name: name.value,
            description: description.value,
            document_names: {
                set: documentNamesIdsToSet || []
            }
        }, onSuccess)
    }
}

onMounted(() => {
    getDocumentNamesPage({ populate: 'typical_documents' })
        .then((data) => {
            documentNames.value = data;
            documentNamesLabels.value = data.map(documentName => ({
                ...documentName,
                title: documentName.name
            }));
        });
});

async function submit (e: Event) {
    e.preventDefault();

    const { valid } = await form.value.validate();

    if (valid) createTypeDocumentHandler();
}


</script>
<template>
    <v-row class="edit-type-form">
        <v-form ref="form" @submit="submit">
            <v-col cols="12" lg="12">
                <v-label
                    class="mb-2 font-weight-medium"
                >
                    Название Типового Документа
                </v-label>
                <v-text-field
                    :rules="nameRules"
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
                Добавить Типовой Документ
            </v-btn>
            <v-btn @click="router.back" color="error" variant="flat" dark>Отмена</v-btn>
        </v-form>
    </v-row>
</template>
