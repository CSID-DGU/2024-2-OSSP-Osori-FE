// store/index.js (Vuex 스토어 설정)
import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null, // 로그인한 사용자 정보
    isAuthenticated: false // 로그인 여부
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.isAuthenticated = true
    },
    LOGOUT(state) {
      state.user = null
      state.isAuthenticated = false
    }
  },
  actions: {
    login({ commit }, user) {
      commit('SET_USER', user)
    },
    logout({ commit }) {
      commit('LOGOUT')
    }
  }
})

// // 예시로, 헤더 컴포넌트에서 로그인 상태를 확인하는 방법
// <script>
// import { mapState } from 'vuex'

// export default {
//   computed: {
//     ...mapState(['user', 'isAuthenticated'])
//   }
// }
// </script>
