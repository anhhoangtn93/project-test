import { createApp } from 'vue'
import App from '@/App.vue'
import axios from 'axios'
import store from '@/store';
import { i18n } from '@/i18n';
import router from '@/router'
import vuetify from '@/plugins/vuetify'
// import validation from '@/plugins/validation'


import { Form as VeeForm, Field as VeeField } from "vee-validate";

axios.defaults.baseURL = process.env.VUE_APP_API_PREFIX
// set default bearer token
axios.interceptors.request.use(
    (config) => {
        const token = store.getters['auth/accessToken'];
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
console.log('i18n', i18n)
// create vue App
const app = createApp(App)
app
    .use(i18n)
    .use(store)
    .use(router)
    .use(vuetify)
    // .use(validation)
    .mount('#app')