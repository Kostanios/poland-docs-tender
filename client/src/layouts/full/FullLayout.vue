<script setup lang="ts">
import { RouterView } from 'vue-router';
import VerticalHeaderVue from './vertical-header/VerticalHeader.vue';
import Customizer from './customizer/Customizer.vue';
import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';
import { useCustomizerStore } from '../../stores/customizer';
import { storeToRefs } from 'pinia';
import { useNotificationStore } from '@/stores/notofication.store';
const customizer = useCustomizerStore();
const notifications = useNotificationStore()

const { notificationView, notificationColor, notificationText } = storeToRefs(notifications);

</script>

<template>
    <v-locale-provider>
        <v-app
            :theme="customizer.actTheme"
            :class="[
                customizer.actTheme,
                customizer.mini_sidebar ? 'mini-sidebar' : '',
                customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
                customizer.setBorderCard ? 'cardBordered' : '',
                customizer.inputBg ? 'inputWithbg' : ''
            ]"
        >
            <!---Customizer location right side--->
            <v-navigation-drawer app temporary elevation="10" location="right" v-model="customizer.Customizer_drawer" width="320">
                <Customizer />
            </v-navigation-drawer>
            <VerticalHeaderVue v-if="!customizer.setHorizontalLayout" />
            <VerticalSidebarVue v-if="!customizer.setHorizontalLayout" />
            <v-main>
                <v-container fluid class="page-wrapper pb-sm-15 pb-10">
                    <div :class="customizer.boxed ? 'maxWidth' : ''">
                        <RouterView />
                    </div>

                    <!-- Уведомление (Snackbar) -->
                    <v-snackbar v-model="notificationView" :color="notificationColor">
                        <v-alert :type="notificationColor">{{ notificationText }}</v-alert>
                    </v-snackbar>
                </v-container>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>
