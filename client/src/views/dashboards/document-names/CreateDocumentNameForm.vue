<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DocumentNameInputType } from '@/types/dto/documentName';
import { useDocumentNameStore } from '@/stores/documentName.store';
import { router } from '@/router';
import { useNotificationStore } from '@/stores/notofication.store';
import { useTypeDocumentsStore } from '@/stores/typeDocuments.store';
import type { TypicalDocumentEntity } from '@/types/dto/typicalDocument';

const documentNameStore = useDocumentNameStore();
const typeDocumentsStore = useTypeDocumentsStore();
const createDocumentName = documentNameStore.createDocumentName;
const getTypeDocuments = typeDocumentsStore.getTypeDocuments;

const form = ref()
const notifications = useNotificationStore();

const name = ref<string | null>(null);
const order = ref<number>(1)
const inputType = ref<DocumentNameInputType>(DocumentNameInputType.MULTIPLE);
const description = ref<string | null>(null);
const typicalDocumentsLabels = ref<Object[]>([]);
const selectedTypicalDocuments = ref<string[] | null>(null);
const typicalDocuments = ref<TypicalDocumentEntity[]>([]);

const inputTypes = [{
    title: 'Список',
    value: DocumentNameInputType.MULTIPLE
}, {
    title: 'Одиночный',
    value: DocumentNameInputType.SINGLE
}];

const nameRules = ref([
    (v: string) => !!v || 'Название обязательно',
    (v: string) => (v && v.length <= 30) || 'Название должно быть меньше чем 30 символов'
]);

function createDocumentNameHandler () {
    const typicalDocumentsIdsToSet = selectedTypicalDocuments.value?.map(typicalDocumentName =>
        typicalDocuments.value
            .find(typicalDocumentObj => typicalDocumentObj.name === typicalDocumentName)?.id || 0
    );

    if (name.value) {
        const now = new Date().toISOString();

        const onSuccess = () => {
            notifications.showNotification(`Документ Успешно Создан!`, 'success');
            router.back();
        };

        createDocumentName({
            createdAt: now,
            updatedAt: now,
            publishedAt: now,
            inputType: inputType.value,
            order: order.value,
            name: name.value,
            description: description.value,
            typical_documents: {
                set: typicalDocumentsIdsToSet || []
            }
        }, onSuccess)
    }
}

onMounted(() => {
    getTypeDocuments({ populate: 'document_names' })
        .then((data) => {
            typicalDocuments.value = data;
            typicalDocumentsLabels.value = data.map(documentName => ({
                ...documentName,
                title: documentName.name
            }));
        });
});

async function submit (e: Event) {
    e.preventDefault();

    const { valid } = await form.value.validate();

    if (valid) createDocumentNameHandler();
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
                <v-label class="mb-2 font-weight-medium">Описание</v-label>
                <v-textarea
                    placeholder="Описание Наименования Документа"
                    variant="outlined"
                    color="primary"
                    v-model="description"
                />
                <v-label class="mb-2 font-weight-medium">Порядок</v-label>
                <v-text-field v-model="order" type="number" :min="1"/>
                <v-label class="mb-2 font-weight-medium">Хранение Файла</v-label>
                <v-select
                    item-value="value"
                    v-model="inputType"
                    :items="inputTypes"
                    placeholder="выберите тип храниния фалов"
                    color="primary"
                    variant="outlined"
                />
                <v-label class="mb-2 font-weight-medium">Связанные Типовые Документы</v-label>
                <v-autocomplete
                    multiple
                    chips
                    v-model="selectedTypicalDocuments"
                    :items="typicalDocumentsLabels"
                    placeholder="выберите связанные документы"
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
                Добавить Наименование Документа
            </v-btn>
            <v-btn @click="router.back" color="error" variant="flat" dark>Отмена</v-btn>
        </v-form>
    </v-row>
</template>
