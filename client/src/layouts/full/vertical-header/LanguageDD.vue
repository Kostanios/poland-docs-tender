<script setup lang="ts">
import flag1 from '@/assets/images/flag/icon-flag-en.svg';
import flag2 from '@/assets/images/flag/icon-flag-ro.svg';
import flag3 from '@/assets/images/flag/icon-flag-zh.svg';
import flag4 from '@/assets/images/flag/icon-flag-fr.svg';
</script>
<template>
    <!-- ---------------------------------------------- -->
    <!-- language DD -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false" location="bottom">
        <template v-slot:activator="{ props }">
            <v-btn icon variant="text" color="primary" v-bind="props">
                <v-avatar size="22">
                    <img v-if="$i18n.locale === 'en'" :src="flag1" :alt="$i18n.locale" width="24" height="24" class="obj-cover" />
                    <img v-if="$i18n.locale === 'fr'" :src="flag4" :alt="$i18n.locale" width="24" height="24" class="obj-cover" />
                    <img v-if="$i18n.locale === 'ro'" :src="flag2" :alt="$i18n.locale" width="24" height="24" class="obj-cover" />
                    <img v-if="$i18n.locale === 'zh'" :src="flag3" :alt="$i18n.locale" width="24" height="24" class="obj-cover" />
                </v-avatar>
            </v-btn>
        </template>
    </v-menu>
</template>
