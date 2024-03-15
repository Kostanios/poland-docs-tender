import { defineStore } from 'pinia';

interface DocumentNameStore {
    notificationView: boolean,
    notificationText: string,
    notificationColor: "info" | "success" | "error" | "warning",
}

export const useNotificationStore = defineStore({
    id: 'notifications',
    state: (): DocumentNameStore => ({
        notificationView: false,
        notificationText: '',
        notificationColor: 'info',
    }),
    actions: {
        showNotification(message: string, color: "info" | "success" | "error" | "warning") {
            this.notificationColor = color;
            this.notificationText = message;
            this.notificationView = true;

            setTimeout(() => {
                this.notificationView = false;
            }, 3000);
        }
    }
});
