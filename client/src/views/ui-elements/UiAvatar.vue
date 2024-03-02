<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import UiChildCard from '@/components/shared/UiChildCard.vue';

// icons
import { UserIcon, SearchIcon, FolderIcon, ContrastIcon } from 'vue-tabler-icons';


// theme breadcrumb
const page = ref({ title: 'Avatar' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '#'
    },
    {
        text: 'Avatar',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12">
            <UiParentCard title="Avatar">
                <v-row>
                    <!-- Basic Avatar -->
                    <v-col cols="12" lg="4">
                        <UiChildCard title="Basic Avatar">
<!--                           <BasicAvatar/>-->
                        </UiChildCard>
                    </v-col>
                </v-row>
            </UiParentCard>
        </v-col>
    </v-row>
</template>
