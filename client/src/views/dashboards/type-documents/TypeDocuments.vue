<script setup lang="ts">
import { ref } from 'vue';

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import TypeDocumentsTable from '@/views/dashboards/type-documents/TypeDocumentsTable.vue';

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

</script>

<template>
    <BaseBreadcrumb :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <TypeDocumentsTable/>
</template>
