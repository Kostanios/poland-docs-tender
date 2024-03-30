<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import CreateDocumentNameForm from '@/views/dashboards/document-names/DocumentNameCreateForm.vue';
import { ref } from 'vue';

const breadcrumbs = ref([
    {
        text: "Главная",
        disabled: false,
        href: "#",
    },
    {
        text: "Список Наименований Документов",
        disabled: false,
        href: "/document-name",
    },
    {
        text: "Создание Наименования Документа",
        disabled: true,
    },
]);

</script>

<template>
    <BaseBreadcrumb :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <UiParentCard title="Создание Наименования Документа">
        <CreateDocumentNameForm/>
    </UiParentCard>
</template>
