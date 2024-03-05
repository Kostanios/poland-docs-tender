<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import CreateTypeDocumentForm from '@/views/dashboards/type-documents/CreateTypeDocumentForm.vue';
import { ref } from 'vue';

const breadcrumbs = ref([
    {
        text: "Главная",
        disabled: false,
        href: "#",
    },
    {
        text: "Список Типовых Документов",
        disabled: false,
        href: "/type-document",
    },
    {
        text: "Создание Типового Документа",
        disabled: true,
        href: "#",
    },
]);

</script>

<template>
    <BaseBreadcrumb :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <UiParentCard title="Создание Документа">
        <CreateTypeDocumentForm/>
    </UiParentCard>
</template>
