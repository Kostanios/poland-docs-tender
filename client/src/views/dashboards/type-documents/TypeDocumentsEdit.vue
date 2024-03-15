<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import EditTypeDocumentForm from '@/views/dashboards/type-documents/EditTypeDocumentForm.vue';
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
        text: "Редактирование Типового Документа",
        disabled: true,
        href: "#",
    },
]);

</script>

<template>
    <BaseBreadcrumb :breadcrumbs="breadcrumbs"/>
    <UiParentCard title="Редактирование Типового Документа">
        <EditTypeDocumentForm/>
    </UiParentCard>
</template>
