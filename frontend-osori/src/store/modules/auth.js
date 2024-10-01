import axios from 'axios'

const state = {
  user: null,
  isAuthenticated: false
}

const mutations = {
  login(state, user) {
    state.user = user
    state.isAuthenticated = true
  },
  logout(state) {
    state.user = null
    state.isAuthenticated = false
  }
}

const actions = {
  async login({ commit }, { email, password }) {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/users/login',
        {
          email,
          password
        }
      )
      const user = response.data.user
      commit('login', user)
      localStorage.setItem('user', JSON.stringify(user))
      return { success: true } // 로그인 성공 시
    } catch (error) {
      console.log(error.response)
      const errorMessage = error.response?.data?.message || '로그인 실패'
      return { success: false, message: errorMessage } // 에러 발생 시 에러 메시지 반환
    }
  },
  logout({ commit }) {
    commit('logout')
    localStorage.removeItem('user')
  },
  initializeStore({ commit }) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      commit('login', user)
    }
  }
}

const getters = {
  isAuthenticated: (state) => state.isAuthenticated,
  user: (state) => state.user
}

export default {
  state,
  mutations,
  actions,
  getters
}
