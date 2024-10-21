// import { createStore } from 'vuex'

// export default createStore({
//   state: {
//     user: JSON.parse(localStorage.getItem('user')) || null, // 로컬 스토리지에서 유저 정보 불러오기
//     isAuthenticated: !!localStorage.getItem('user') // 유저 정보가 있으면 로그인 상태로 설정
//   },
//   mutations: {
//     SET_USER(state, user) {
//       state.user = user
//       state.isAuthenticated = true
//       localStorage.setItem('user', JSON.stringify(user)) // 로컬 스토리지에 유저 정보 저장
//     },
//     LOGOUT(state) {
//       state.user = null
//       state.isAuthenticated = false
//       localStorage.removeItem('user') // 로그아웃 시 로컬 스토리지에서 유저 정보 삭제
//     },
//     SYNC_USER(state) {
//       const userData = JSON.parse(localStorage.getItem('user')) // 로컬 스토리지에서 유저 정보 불러오기
//       if (userData) {
//         state.user = userData
//         state.isAuthenticated = true
//       } else {
//         state.user = null
//         state.isAuthenticated = false
//       }
//     }
//   },
//   actions: {
//     login({ commit }, user) {
//       commit('SET_USER', user) // 유저 정보 Vuex와 로컬 스토리지에 저장
//     },
//     logout({ commit }) {
//       commit('LOGOUT') // 로그아웃 처리
//     },
//     syncUser({ commit }) {
//       commit('SYNC_USER') // 로컬 스토리지와 Vuex 상태 동기화
//     }
//   }
// })
