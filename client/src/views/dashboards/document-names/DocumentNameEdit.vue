<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { ref } from 'vue';
import EditDocumentNameForm from '@/views/dashboards/document-names/DocumentNameEditForm.vue';

const breadcrumbs = ref([
    {
        text: "Главная",
        disabled: true,
    },
    {
        text: "Список Наименований Документов",
        disabled: false,
        href: "/document-name",
    },
    {
        text: "Редактирование Наименования Документа",
        disabled: true,
    },
]);

</script>

<template>
    <BaseBreadcrumb :breadcrumbs="breadcrumbs"/>
    <UiParentCard title="Редактирование Наименования Документа">
        <EditDocumentNameForm/>
    </UiParentCard>
</template>
