import { defineStore } from 'pinia';
import { router } from '@/router';
import { clearJWT, setJWT } from '@/utils/axios';
import { loginUser, registerUser } from '@/services/authService';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null,
        isAdmin: false,
    }),
    actions: {
        async login(username: string, password: string) {
            const { data: { user, jwt }} = await loginUser({ identifier: username, password });

            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', jwt);
            setJWT(jwt);

            router.push(this.returnUrl || '/dashboard');
        },
        async register(email: string, username: string, password: string) {
            const { data: { user, jwt }} = await registerUser({ username, password, email });

            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', jwt);
            setJWT(jwt);

            router.push(this.returnUrl || '/dashboard');
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            clearJWT();
            router.push('/auth/login');
        }
    }
});
