<script setup lang="ts">
import { onUnmounted, ref } from 'vue';

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import TypeDocumentsTable from '@/views/dashboards/type-documents/TypeDocumentsTable.vue';
import { useTypeDocumentsStore } from '@/stores/typeDocuments';

const store = useTypeDocumentsStore();

const breadcrumbs = ref([
    {
        text: "Главная",
        disabled: false,
        href: "#",
    },
    {
        text: "Список Типовых Документов",
        disabled: true,
        href: "/type-document",
    },
]);

onUnmounted(() => store.$reset());
</script>

<template>
    <BaseBreadcrumb :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <TypeDocumentsTable/>
</template>
