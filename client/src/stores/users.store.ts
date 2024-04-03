import { defineStore } from 'pinia';
import type { UserEntity } from '@/types/dto/user';
import { getTypeUsersPage } from '@/services/userService';

interface DocumentStore {
    users: UserEntity[],
    loading: boolean
}

export const useUserStore = defineStore({
    id: 'user',
    state: (): DocumentStore => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        users: [],
        loading: false
    }),
    actions: {
        async getUsers (params: { populate?: 'document_lists' }) {
            try {
                this.loading = true;

                const res = await getTypeUsersPage(params);

                this.users = res.data

                this.loading = false;

                return res.data;
            } catch (e) {
                console.error(e);
                this.loading = false;
                return this.users;
            }
        },
    }
});
