/* eslint-disable */
import { createRouter, createWebHashHistory } from 'vue-router'
import AuthLayout from '@/components/layout/AuthLayout.vue' // 중첩 라우팅의 부모 레이아웃
import PortfolioLayout from '@/components/layout/PortfolioLayout.vue' // 중첩 라우팅의 부모 레이아웃

// 자동 임포트 함수 (src/views 내의 모든 .vue 파일을 임포트)
function importAllViews() {
  const viewFiles = require.context('@/views', true, /\.vue$/)
  const views = {}

  // 각 파일을 순회하면서 임포트
  viewFiles.keys().forEach((filePath) => {
    const viewName = filePath
      .split('/')
      .pop() // 파일 이름만 추출
      .replace('.vue', '') // .vue 확장자 제거

    // 컴포넌트 이름과 해당 컴포넌트를 맵핑
    views[viewName] = viewFiles(filePath).default
  })

  return views
}

// 자동으로 임포트된 모든 Vue 컴포넌트 객체
const importedViews = importAllViews()

const routes = [
  {
    path: '/',
    name: 'home',
    component: importedViews['HomeView'] // 자동 임포트 적용
  },
  {
    path: '/about',
    name: 'about',
    component: importedViews['AboutView'] // 자동 임포트 적용
  },
  {
    path: '/auth',
    component: AuthLayout, // 부모 레이아웃
    children: [
      {
        path: 'signin',
        name: 'signin',
        component: importedViews['SignIn'] // 자동 임포트 적용
      },
      {
        path: 'signupform',
        name: 'signupform',
        component: importedViews['SignUpForm'] // 자동 임포트 적용
      },
      {
        path: 'verifyemail',
        name: 'verifyemail',
        component: importedViews['VerifyEmail'] // 자동 임포트 적용
      },
      {
        path: 'signupform2',
        name: 'SignUpForm2',
        component: importedViews['SignUpForm2'] // 자동 임포트 적용
      },
      {
        path: 'realsignup',
        name: 'realsignUp',
        component: importedViews['realsignup'] // 자동 임포트 적용
      },
      {
        path: 'reallogin',
        name: 'realLogin',
        component: importedViews['realLogin'] // 자동 임포트 적용
      }
    ]
  },
  {
    path: '/profile',
    name: 'profile',
    component: importedViews['Profile'], // 자동 임포트 적용
    meta: { requiresAuth: true } // 인증이 필요한 페이지
  },
  {
    path: '/portfolios',
    component: PortfolioLayout, // 공통 레이아웃 컴포넌트
    children: [
      {
        path: 'new',
        name: 'CreatePortfolio',
        component: importedViews['PortfolioCreate'] // 자동 임포트 적용
      },
      {
        path: 'tag',
        name: 'SearchByTag',
        component: importedViews['PortfolioByTag'] // 자동 임포트 적용
      },
      {
        path: 'test',
        name: 'Test',
        component: importedViews['PortfolioTest'] // 자동 임포트 적용
      }
    ]
  },
  {
    path: '/responsivetest',
    name: 'TaliwindResopon',
    component: importedViews['TaliwindResopon'] // 자동 임포트 적용
  },
  {
    path: '/weeklycalendertest',
    name: 'WeeklyCalenderTest',
    component: importedViews['WeeklyCalenderTest'] // 자동 임포트 적용
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: importedViews['NotFound'] // 자동 임포트 적용
  }
]

const router = createRouter({
  history: createWebHashHistory('/akoming/'), // Hash 모드를 사용
  routes
})

//라우터 가드 설정(세션 기반 쿠기, 나중에 수정 필요)

export default router
