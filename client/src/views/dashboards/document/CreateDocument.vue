<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { ref } from 'vue';

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
        text: "Создание Документа",
        disabled: true,
    },
]);
</script>

<template>
    <BaseBreadcrumb :breadcrumbs="breadcrumbs"/>
    <UiParentCard title="Создание Документа">
    </UiParentCard>
</template>
