import { createApp } from 'vue'

import i18n from '@/i18n'

import App from './App.vue'
import { key, store } from './store'

const app = createApp(App)

app.use(store, key)
app.use(i18n)

app.mount('#app')
