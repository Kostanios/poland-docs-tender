<script setup lang="ts">
import { onUnmounted, ref } from 'vue';

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import { useTypeDocumentsStore } from '@/stores/typeDocuments.store';
import DocumentNamesTable from '@/views/dashboards/document-names/DocumentNamesTable.vue';

const store = useTypeDocumentsStore();

const breadcrumbs = ref([
    {
        text: "Главная",
        disabled: true
    },
    {
        text: "Список Наименований Документов",
        disabled: true,
    },
]);

onUnmounted(() => store.$reset());
</script>

<template>
    <BaseBreadcrumb :breadcrumbs="breadcrumbs"/>
    <DocumentNamesTable/>
</template>
