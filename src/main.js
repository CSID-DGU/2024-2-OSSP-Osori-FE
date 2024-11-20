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
import './assets/styles/global.css'
import './assets/styles/main.css'

import VCalendar from 'v-calendar'
axios.defaults.withCredentials = true

// v-calendar 기본 스타일 추가
import 'v-calendar/dist/style.css'
// axios.defaults.baseURL = 'http://localhost:8082'; // API 서버 주소 설정
axios.defaults.withCredentials = true

createApp(App)
  .use(store) // Vuex 스토어 등록
  .use(VCalendar, {}) // VCalendar 등록
  .use(router) // Vue Router 등록
  .mount('#app') // 애플리케이션 마운트
