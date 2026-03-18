import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { modalsPlugin } from '#modals'
import { themePlugin } from '#theme'
import App from './App.vue'
import router from './router'

import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

const app = createApp(App)

app.use(themePlugin)
app.use(modalsPlugin)
app.use(createPinia())
app.use(router)

app.mount('#app')
