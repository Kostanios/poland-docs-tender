<script setup lang="ts">
import { ref } from 'vue';
import { Form } from 'vee-validate';
import Logo from '@/layouts/full/logo/Logo.vue';
/*Social icons*/
// import google from '@/assets/images/svgs/google-icon.svg';
// import facebook from '@/assets/images/svgs/facebook-icon.svg';
import { useAuthStore } from '@/stores/auth';

const valid = ref(true);
const password = ref('');
const email = ref('');
const passwordRules = ref([
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length <= 20) || 'Password must be less than 20 characters'
]);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);
const fname = ref('');
const fnameRules = ref([
    (v: string) => !!v || 'Name is required',
    (v: string) => (v && v.length <= 20) || 'Name must be less than 20 characters'
]);

function validate(values: any, { setErrors }: any) {
    const authStore = useAuthStore();
    return authStore.register(email.value, fname.value, password.value).catch((error) => setErrors({ apiError: error }));
}
</script>
<template>
<!--    <v-row class="d-flex mb-6">-->
<!--        <v-col cols="6" sm="6"  class="pr-2">-->
<!--            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>-->
<!--                <img :src="google" height="20" class="mr-2" alt="google" />-->
<!--                <span class="d-sm-flex d-none mr-1">Sign up with</span>Google-->
<!--            </v-btn>-->
<!--        </v-col>-->
<!--        <v-col cols="6" sm="6" class="pl-2">-->
<!--            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>-->
<!--                <img :src="facebook" width="25" height="30" class="mr-1" alt="facebook" />-->
<!--                <span class="d-sm-flex d-none mr-1">Sign up with</span>FB-->
<!--            </v-btn>-->
<!--        </v-col>-->
<!--    </v-row>-->
<!--    <div class="d-flex align-center text-center mb-6">-->
<!--        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">-->
<!--            <span class="bg-surface px-5 py-3 position-relative">or sign in with</span>-->
<!--        </div> -->
<!--    </div>-->
    <Form @submit="validate" v-slot="{ errors, isSubmitting }" class="mt-5">
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Имя</v-label>
        <VTextField v-model="fname" :rules="fnameRules" required ></VTextField>
        <v-label class="text-subtitle-1 font-weight-medium pb-2">e-mail</v-label>
        <VTextField v-model="email" :rules="emailRules" required ></VTextField>
        <v-label class="text-subtitle-1 font-weight-medium pb-2">пароль</v-label>
        <VTextField
            v-model="password"
            :rules="passwordRules"
            required
            variant="outlined"
            type="password"
            color="primary"
        ></VTextField>
        <v-btn :loading="isSubmitting" size="large" class="mt-2" color="primary" block type="submit" flat>Зарегистрироваться</v-btn>
        <div v-if="errors.apiError" class="mt-2">
            <v-alert color="error">{{ errors.apiError }}</v-alert>
        </div>
    </Form>
</template>
