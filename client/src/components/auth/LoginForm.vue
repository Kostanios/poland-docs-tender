<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Form } from 'vee-validate';

// /*Social icons*/
// import google from '@/assets/images/svgs/google-icon.svg';
// import facebook from '@/assets/images/svgs/facebook-icon.svg';

const checkbox = ref(false);
const valid = ref(false);
// const show1 = ref(false);
const password = ref('');
const username = ref('');
const passwordRules = ref([
    (v: string) => !!v || 'Пароль обязательный',
    (v: string) => (v && v.length <= 30) || 'Пароль должен быть меньше чем 30 символов'
]);

function validate(values: any, { setErrors }: any) {
    const authStore = useAuthStore();
    return authStore.login(username.value, password.value).catch((error) => setErrors({ apiError: error }));
}
</script>

<template>
<!--    <v-row class="d-flex mb-3">-->
<!--        <v-col cols="6" sm="6" class="pr-2">-->
<!--            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>-->
<!--                <img :src="google" height="16" class="mr-2" alt="google" />-->
<!--                <span class="d-sm-flex d-none mr-1">Sign in with</span>Google-->
<!--            </v-btn>-->
<!--        </v-col>-->
<!--        <v-col cols="6" sm="6" class="pl-2">-->
<!--            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>-->
<!--                <img :src="facebook" width="25" height="25" class="mr-1" alt="facebook" />-->
<!--                <span class="d-sm-flex d-none mr-1">Sign in with</span>FB-->
<!--            </v-btn>-->
<!--        </v-col>-->
<!--    </v-row>-->
<!--    <div class="d-flex align-center text-center mb-6">-->
<!--        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">-->
<!--            <span class="bg-surface px-5 py-3 position-relative">or sign in with</span>-->
<!--        </div>  -->
<!--    </div>-->
    <Form @submit="validate" v-slot="{ errors, isSubmitting }" class="mt-5">
        <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Имя или e-mail</v-label>
        <VTextField
            v-model="username"
            class="mb-8"
            required
            hide-details="auto"
        ></VTextField>
        <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">пароль</v-label>
        <VTextField
            v-model="password"
            :rules="passwordRules"
            required
            hide-details="auto"
            type="password"
            class="pwdInput"
        ></VTextField>
        <div class="d-flex flex-wrap align-center my-3 ml-n2">
            <v-checkbox v-model="checkbox" required hide-details color="primary">
                <template v-slot:label class="">Запомнить устройтво</template>
            </v-checkbox>
        </div>
        <v-btn size="large" :loading="isSubmitting" color="primary" :disabled="valid" block type="submit" flat>Войти</v-btn>
        <div v-if="errors.apiError" class="mt-2">
            <v-alert color="error">{{ errors.apiError }}</v-alert>
        </div>
    </Form>
</template>
