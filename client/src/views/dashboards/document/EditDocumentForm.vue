<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useDocumentNameStore } from '@/stores/documentName.store';
import { router } from '@/router';
import { type DocumentNameEntity } from '@/types/dto/documentName';
import { useNotificationStore } from '@/stores/notofication.store';
import { useDocumentStore } from '@/stores/document.store';
import { useUserStore } from '@/stores/users.store';
import type { UserEntity } from '@/types/dto/user';

const route = useRoute();
const id = route.params.id;
const form = ref()
const notifications = useNotificationStore();
const documentNameStore = useDocumentNameStore();
const documentStore = useDocumentStore();
const userStore = useUserStore();
const { documentDetails } = storeToRefs(documentStore);

const documentNames = ref<DocumentNameEntity[]>([]);
const name = ref<string | null>(null);
const selectValue = ref<string[] | null>(null);
const users = ref<UserEntity[]>([]);
const userSelectValue = ref<string[] | null>(null);
const usersLabels = ref<Object[]>([]);
const documentNamesLabels = ref<Object[]>([]);

const nameRules = ref([
    (v: string) => !!v || 'Название обязательно',
    (v: string) => (v && v.length <= 30) || 'Название должно быть меньше чем 30 символов'
]);

const documentNamesRules = ref([
    (v: string) => !!v || 'Типовой документ должен иметь минимум 1 связанное Наименование Документа',
    (v: string) => (v && v.length >= 1) || 'Типовой документ должен иметь минимум 1 связанное Наименование Документа',
]);

const updateDocument = documentStore.updateDocument;
const getDocument = documentStore.getDocument;
const getDocumentNamesPage = documentNameStore.getDocumentNamesPage;
const getUsers = userStore.getUsers;

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

        getUsers({ populate: 'document_lists' })
            .then((data) => {
                users.value = data;
                usersLabels.value = data.map(user => ({
                    ...user,
                    title: user.email
                }));

                userSelectValue.value = data
                    .filter(user => {
                        return user?.document_lists?.find(documentList => documentList.id === Number(id));
                    })
                    .map(user => user.email);
            });
    }

});

function editTypeDocumentHandler () {
    if (typeof id === 'string' && documentDetails.value) {
        const { createdAt, publishedAt, updatedAt } = documentDetails.value;
        const onSuccess = () => {
            notifications.showNotification(`Документ Успешно Обновлен!`, 'success');
            router.push('/document');
        };

        if (name.value) {
            updateDocument(id, {
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
                <v-label class="mb-2 font-weight-medium">Связанные Пользователи</v-label>
                <v-autocomplete
                    multiple
                    chips
                    v-model="userSelectValue"
                    :items="usersLabels"
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
