import { defineStore } from "pinia";
import config from '@/config'
import { ref } from 'vue';


export const useCustomizerStore = defineStore({
  id: "customizer",
  state: () => ({
    Sidebar_drawer: config.Sidebar_drawer,
    Customizer_drawer: config.Customizer_drawer,
    mini_sidebar: config.mini_sidebar,
    setHorizontalLayout: config.setHorizontalLayout, // Horizontal layout
    setRTLLayout:config.setRTLLayout, // RTL layout
    actTheme: config.actTheme,
    inputBg: config.inputBg,
    boxed: config.boxed,
    setBorderCard: config.setBorderCard,
    notificationView: false,
    notificationText: '',
    notificationColor: 'info',
  }),

  getters: {},
  actions: {
    showNotification(message: string, color: 'info' | 'success' | 'error') {
      this.notificationColor = color;
        this.notificationText = message;
        this.notificationView = true;

        setTimeout(() => {
          this.notificationView = false;
        }, 3000);
    },
    SET_SIDEBAR_DRAWER() {
      this.Sidebar_drawer = !this.Sidebar_drawer;
    },
    SET_MINI_SIDEBAR(payload: any) {
      this.mini_sidebar = payload;
    },
    SET_CUSTOMIZER_DRAWER(payload: any) {
      this.Customizer_drawer = payload;
    },

    SET_LAYOUT(payload: any) {
      this.setHorizontalLayout = payload;
    },
    SET_THEME(payload: any) {
      this.actTheme = payload;
    },
    SET_CARD_BORDER(payload: any){
      this.setBorderCard = payload
    }
  },
});
