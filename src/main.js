import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from "@/plugins/vuetify";
import {Toast, options} from "@/plugins/notification";


createApp(App).use(store).use(router).use(vuetify).use(Toast, options).mount('#app')
