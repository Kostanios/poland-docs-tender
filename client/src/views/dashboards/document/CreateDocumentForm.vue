<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useDocumentNameStore } from '@/stores/documentName.store';
import { router } from '@/router';
import { type DocumentNameEntity } from '@/types/dto/documentName';
import { useNotificationStore } from '@/stores/notofication.store';
import { useDocumentStore } from '@/stores/document.store';
import { useUserStore } from '@/stores/users.store';
import type { UserEntity } from '@/types/dto/user';

const form = ref()
const notifications = useNotificationStore();
const documentNameStore = useDocumentNameStore();
const documentStore = useDocumentStore();
const userStore = useUserStore();

const documentNames = ref<DocumentNameEntity[]>([]);
const name = ref<string | null>(null);
const documentNameSelectValue = ref<string[] | null>(null);
const users = ref<UserEntity[]>([]);
const userSelectValue = ref<string | null>(null);
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

const createDocument = documentStore.createDocument;
const getDocumentNamesPage = documentNameStore.getDocumentNamesPage;
const getUsers = userStore.getUsers;

onMounted(() => {
    getDocumentNamesPage({ populate: 'document_lists' })
        .then((data) => {
            documentNames.value = data;
            documentNamesLabels.value = data.map(documentName => ({
                ...documentName,
                title: documentName.name
            }));
        });

    getUsers({ populate: 'document_lists' })
        .then((data) => {
            users.value = data;
            usersLabels.value = data.map(user => ({
                ...user,
                title: user.email
            }));
        });
});

function createTypeDocumentHandler () {
    const documentNamesIdsToSet = documentNameSelectValue.value?.map(documentName =>
        documentNames.value
            .find(documentNameObj => documentNameObj.name === documentName)?.id
    );

    const onSuccess = () => {
        notifications.showNotification(`Документ Успешно Обновлен!`, 'success');
        router.push('/document');
    };

    if (name.value) {
        const now = new Date().toISOString();

        createDocument({
            createdAt: now,
            publishedAt: now,
            updatedAt: now,
            name: name.value,
            document_names: {
                set: documentNamesIdsToSet as number[]
            },
            user: users.value.find(userObj => userObj.email === userSelectValue.value)?.id as number
        }, onSuccess)
    }
}

async function submit (e: Event) {
    e.preventDefault();

    const { valid } = await form.value.validate();

    if (valid) createTypeDocumentHandler();
}

</script>
<template>
    <v-row class="edit-type-form">
        <v-form ref="form" @submit="submit">
            <v-row>
            <v-col cols="12" md="6">
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
                    v-model="documentNameSelectValue"
                    :items="documentNamesLabels"
                    color="primary"
                    variant="outlined"
                />
                <v-label class="mb-2 font-weight-medium">Связанный Пользователь</v-label>
                <v-autocomplete
                    v-model="userSelectValue"
                    :items="usersLabels"
                    color="primary"
                    variant="outlined"
                />
            </v-col>
            <v-col cols="12" md="6">
<!--                <v-expansion-panels>-->
<!--                    <v-expansion-panel elevation="10">-->
<!--                        <v-expansion-panel-title class="text-h6">Accordion 1</v-expansion-panel-title>-->
<!--                        <v-expansion-panel-text> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</v-expansion-panel-text>-->
<!--                    </v-expansion-panel>-->
<!--                    <v-divider></v-divider>-->
<!--                </v-expansion-panels>-->
            </v-col>
            </v-row>
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
