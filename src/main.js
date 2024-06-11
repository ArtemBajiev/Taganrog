import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import 'primeflex/primeflex.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primevue/resources/primevue.min.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)
app.use(Toast)
app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')
