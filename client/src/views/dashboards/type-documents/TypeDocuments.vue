<script setup lang="ts">
import { onMounted, ref } from 'vue';

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import { useTypeDocumentsStore } from '@/stores/typeDocuments';
import CrudTable from '@/views/dashboards/type-documents/CrudTable.vue';

const page = ref({ title: "Classic" });
const breadcrumbs = ref([
    {
        text: "Главная",
        disabled: false,
        href: "#",
    },
    {
        text: "Наименования Документов",
        disabled: true,
        href: "#",
    },
]);

onMounted(() => {
    useTypeDocumentsStore().getTypeDocumentsPage({ page: 0 })
})

</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <CrudTable/>
</template>
