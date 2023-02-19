import { createApp } from 'vue';
import App from './app.vue';
import './registerServiceWorker';
import { translation, UpdateLocale } from './i18n';

createApp(App).use(translation).mount('#app');
UpdateLocale();
