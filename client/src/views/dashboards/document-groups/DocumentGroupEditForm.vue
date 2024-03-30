<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { router } from '@/router';
import { useNotificationStore } from '@/stores/notification.store';
import { useDocumentGroupStore } from '@/stores/documentGroup.store';
import { storeToRefs } from 'pinia';

const route = useRoute();
const id = route.params.id;
const form = ref();
const notifications = useNotificationStore();
const documentGroupStore = useDocumentGroupStore();
const { documentGroupDetails } = storeToRefs(documentGroupStore);

const name = ref<string | null>(null);

const nameRules = ref([
    (v: string) => !!v || 'Название обязательно',
    (v: string) => (v && v.length <= 30) || 'Название должно быть меньше чем 30 символов'
]);
const getDocumentGroup = documentGroupStore.getDocumentGroup;
const updateDocumentGroup = documentGroupStore.updateDocumentGroup;

onMounted(() => {
    if (typeof id === 'string') {
        getDocumentGroup(id)
            .then((documentGroupDetails) => {
                name.value = documentGroupDetails?.name || null;

            });
    }
});

function editDocumentGroupHandler () {
    if (typeof id === 'string' && documentGroupDetails.value) {
        const { createdAt, publishedAt, updatedAt } = documentGroupDetails.value;
        const onSuccess = () => {
            notifications.showNotification(`Документ Успешно Обновлен!`, 'success');
            router.push('/document-group');
        };

        const onError = (error: Error) => {
            notifications.showNotification(error.message, 'error');
        };

        if (name.value) {
            updateDocumentGroup(id, {
                createdAt,
                publishedAt,
                updatedAt,
                name: name.value,
            }, onSuccess, onError)
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
