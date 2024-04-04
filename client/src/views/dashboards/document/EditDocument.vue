<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { ref } from 'vue';
import EditDocumentForm from '@/views/dashboards/document/EditDocumentForm.vue';

const breadcrumbs = ref([
    {
        text: "Главная",
        disabled: true,
    },
    {
        text: "Список Документов",
        disabled: false,
        href: "/document",
    },
    {
        text: "Редактирование Документа",
        disabled: true,
    },
]);
</script>

<template>
    <BaseBreadcrumb :breadcrumbs="breadcrumbs"/>
    <UiParentCard title="Редактирование Документа">
        <EditDocumentForm/>
    </UiParentCard>
</template>
