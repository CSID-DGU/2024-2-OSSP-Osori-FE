import { createStore } from 'vuex';
import auth from '../views/test/auth.js'; // auth 모듈 import
import login from './modules/login.js'; // 로그인 모듈 import

const store = createStore({
  state: {
    portfolios: [],  // 포트폴리오를 저장할 배열
  },
  mutations: {
    ADD_PORTFOLIO(state, portfolio) {
      state.portfolios.push(portfolio);  // 포트폴리오 추가
    },
  },
  actions: {
    addPortfolio({ commit }, portfolio) {
      commit('ADD_PORTFOLIO', portfolio);  // mutation 호출
    },
  },
  getters: {
    allPortfolios(state) {
      return state.portfolios;  // 모든 포트폴리오 반환
    },
  },
  modules: {
    login,  // 로그인 모듈
    auth,   // auth 모듈
  },
});

export default store;
