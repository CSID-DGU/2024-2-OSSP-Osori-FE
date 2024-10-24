import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/styles/global.css'
import 'tailwindcss/tailwind.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/fonts/fonts.css'

import VCalendar from 'v-calendar' // v-calendar를 불러오기
axios.defaults.withCredentials = true

// v-calendar 기본 스타일 추가
import 'v-calendar/dist/style.css'
//axios.dafaults.baseURL = 'http://localhost:8082'
axios.defaults.withCredentials = true
createApp(App).use(store).use(VCalendar, {}).use(router).mount('#app')
