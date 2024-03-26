<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import DocumentGroupEditForm from '@/views/dashboards/document-groups/DocumentGroupEditForm.vue';
import { ref } from 'vue';

const breadcrumbs = ref([
    {
        text: "Главная",
        disabled: true,
    },
    {
        text: "Список Групп Документов",
        disabled: false,
        href: "/document-groups",
    },
    {
        text: "Редактирование Группы Документов",
        disabled: true,
    },
]);
</script>

<template>
    <BaseBreadcrumb :breadcrumbs="breadcrumbs"/>
    <UiParentCard title="Редактирование Группы Документов">
        <DocumentGroupEditForm/>
    </UiParentCard>
</template>
