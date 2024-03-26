<script setup lang="ts">
import { onUnmounted, ref } from 'vue';

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import { useDocumentGroupStore } from '@/stores/documentGroup.store';
import DocumentGroupEditForm from '@/views/dashboards/document-groups/DocumentGroupEditForm.vue';

const store = useDocumentGroupStore();

const breadcrumbs = ref([
    {
        text: "Главная",
        disabled: true
    },
    {
        text: "Список Групп Документов",
        disabled: true,
    },
]);

onUnmounted(() => store.$reset());
</script>

<template>
    <BaseBreadcrumb :breadcrumbs="breadcrumbs"/>
    <DocumentGroupEditForm />
</template>
