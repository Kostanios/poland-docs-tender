<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTypeDocumentsStore } from '@/stores/typeDocuments.store';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useDocumentNameStore } from '@/stores/documentName.store';
import { router } from '@/router';
import { DocumentNameInputType } from '@/types/dto/documentName';
import { useNotificationStore } from '@/stores/notification.store';
import type { TypicalDocumentEntity } from '@/types/dto/typicalDocument';

const route = useRoute();
const id = route.params.id;
const form = ref()
const notifications = useNotificationStore();
const typeDocumentsStore = useTypeDocumentsStore();
const documentNameStore = useDocumentNameStore();
const { documentNameDetails } = storeToRefs(documentNameStore);

const name = ref<string | null>(null);
const order = ref<number>(0)
const inputType = ref<DocumentNameInputType>(DocumentNameInputType.MULTIPLE);
const description = ref<string | null>(null);
const typicalDocumentsLabels = ref<Object[]>([]);
const selectedTypicalDocuments = ref<string[] | null>(null);
const typicalDocuments = ref<TypicalDocumentEntity[]>([])

const nameRules = ref([
    (v: string) => !!v || 'Название обязательно',
    (v: string) => (v && v.length <= 30) || 'Название должно быть меньше чем 30 символов'
]);

const inputTypes = [{
    title: 'Список',
    value: DocumentNameInputType.MULTIPLE
}, {
    title: 'Одиночный',
    value: DocumentNameInputType.SINGLE
}];

const getTypeDocuments = typeDocumentsStore.getTypeDocuments;
const getDocumentName = documentNameStore.getDocumentName;
const updateDocumentName = documentNameStore.updateDocumentName;

onMounted(() => {
    if (typeof id === 'string') {
        getDocumentName(id)
            .then(documentNameDetails => {
                name.value = documentNameDetails?.name || null;
                description.value = documentNameDetails?.description || null;
                order.value = documentNameDetails?.order || 1;
                inputType.value = documentNameDetails?.inputType || DocumentNameInputType.SINGLE;
            });

        getTypeDocuments({ populate: 'document_names' })
            .then((data) => {
                typicalDocuments.value = data;
                typicalDocumentsLabels.value = data.map(documentName => ({
                    ...documentName,
                    title: documentName.name
                }));
                selectedTypicalDocuments.value = data
                    .filter(typicalDocument => typicalDocument.document_names?.data?.find(documentName => documentName.id === Number(id)))
                    .map(typicalDocument => typicalDocument.name);
            });
    }

});

function editTypeDocumentHandler () {
    if (typeof id === 'string' && documentNameDetails.value) {
        const { createdAt, publishedAt, updatedAt } = documentNameDetails.value;
        const typicalDocumentsIdsToSet = selectedTypicalDocuments.value?.map(selectedTypicalDocumentName =>
            typicalDocuments.value
                .find(typicalDocumentsObj => typicalDocumentsObj.name === selectedTypicalDocumentName)?.id as number
        );
        const onSuccess = () => {
            notifications.showNotification(`Документ Успешно Обновлен!`, 'success');
            router.push('/document-name');
        };

        if (name.value) {
            updateDocumentName(id, {
                createdAt,
                publishedAt,
                updatedAt,
                description: description.value,
                name: name.value,
                typical_documents: {
                    set: typicalDocumentsIdsToSet || []
                }
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
                    placeholder="выберите тип связки"
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
