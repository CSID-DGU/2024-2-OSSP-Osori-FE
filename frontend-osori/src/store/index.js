import { createStore } from 'vuex'
import auth from './modules/auth.js' // auth 모듈 import
import login from './modules/login.js'

const store = createStore({
  modules: {
    auth, // auth 모듈 등록
    login
  }
})

export default store
