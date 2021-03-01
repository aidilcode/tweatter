import { createApp } from 'vue'

import App from './App.vue'
import router from "./router"

require('./assets/styles/tailwind.css');


createApp(App)
  .use(router)
  .mount('#app')
