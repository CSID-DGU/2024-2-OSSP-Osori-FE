import { createStore } from 'vuex';
import auth from '../views/test/auth.js'; // auth 모듈 import
import login from './modules/login.js'; // 로그인 모듈 import
import { v4 as uuidv4 } from 'uuid'; // UUID를 사용하여 고유 ID 생성

const store = createStore({
  state: {
    portfolios: [],  // 포트폴리오를 저장할 배열
  },
  mutations: {
    ADD_PORTFOLIO(state, portfolio) {
      state.portfolios.push({ ...portfolio, id: uuidv4() });  // 고유 ID 추가
    },
  },
  actions: {
    addPortfolio({ commit }, portfolio) {
      commit('ADD_PORTFOLIO', portfolio);  // mutation 호출
    },
  },
  getters: {
    getPortfolios(state) {
      return state.portfolios; // 포트폴리오 목록 반환
    },
  },
  modules: {
    login,  // 로그인 모듈
    auth,   // auth 모듈
  },
});

export default store;

