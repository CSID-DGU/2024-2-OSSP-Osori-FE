import { createStore } from 'vuex'
import auth from '../views/test/auth.js' // auth 모듈 import
import login from './modules/login.js'

const store = createStore({
  modules: {
    //login
  }
})

export default store
