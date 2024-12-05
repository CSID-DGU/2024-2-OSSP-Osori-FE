import { createStore } from 'vuex'
import login from './modules/login.js' // 로그인 모듈 import
import { v4 as uuidv4 } from 'uuid' // UUID를 사용하여 고유 ID 생성

// 로컬 스토리지에서 포트폴리오 가져오기
const getStoredPortfolios = () => {
  const storedPortfolios = localStorage.getItem('portfolios')
  return storedPortfolios ? JSON.parse(storedPortfolios) : []
}

const store = createStore({
  state: {
    portfolios: getStoredPortfolios() // 로컬 스토리지에서 포트폴리오 초기화
  },
  mutations: {
    ADD_PORTFOLIO(state, portfolio) {
      const newPortfolio = { ...portfolio, id: uuidv4() } // 고유 ID 추가
      state.portfolios.push(newPortfolio) // 포트폴리오 추가
      localStorage.setItem('portfolios', JSON.stringify(state.portfolios)) // 로컬 스토리지에 저장
    },
    DELETE_PORTFOLIO(state, portfolioId) {
      state.portfolios = state.portfolios.filter(
        (portfolio) => portfolio.id !== portfolioId
      )
      localStorage.setItem('portfolios', JSON.stringify(state.portfolios)) // 로컬 스토리지에 삭제 후 저장
    },
    // 수정 기능을 위한 UPDATE_PORTFOLIO 뮤테이션 추가
    UPDATE_PORTFOLIO(state, updatedPortfolio) {
      const index = state.portfolios.findIndex(
        (portfolio) => portfolio.id === updatedPortfolio.id
      )
      if (index !== -1) {
        state.portfolios.splice(index, 1, updatedPortfolio) // 기존 항목을 업데이트된 항목으로 교체
        localStorage.setItem('portfolios', JSON.stringify(state.portfolios)) // 로컬 스토리지에 업데이트 후 저장
      }
    }
  },
  actions: {
    addPortfolio({ commit }, portfolio) {
      commit('ADD_PORTFOLIO', portfolio) // mutation 호출
    },
    deletePortfolio({ commit }, portfolioId) {
      commit('DELETE_PORTFOLIO', portfolioId)
    },
    // 수정 기능을 위한 updatePortfolio 액션 추가
    updatePortfolio({ commit }, updatedPortfolio) {
      commit('UPDATE_PORTFOLIO', updatedPortfolio) // UPDATE_PORTFOLIO 뮤테이션 호출
    }
  },
  getters: {
    getPortfolios(state) {
      return state.portfolios // 포트폴리오 목록 반환
    }
  },
  modules: {
    login // 로그인 모듈
    // auth 모듈
  }
})

export default store
