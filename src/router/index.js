/* eslint-disable */
import { createRouter, createWebHashHistory } from 'vue-router'
import AuthLayout from '@/components/layout/AuthLayout.vue' // 중첩 라우팅의 부모 레이아웃
import PortfolioLayout from '@/components/layout/PortfolioLayout.vue' // 중첩 라우팅의 부모 레이아웃
import store from '@/store'
import FeedLayout from '@/components/layout/FeedLayout.vue'
import akopolioCreate from '@/views/akopolio/akopolioCreate.vue'
import akopolioMain from '@/views/akopolio/akopolioMain.vue'

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
    component: importedViews['HomeView'], // 자동 임포트 적용
    redirect: '/auth/login' // 기본 경로에서 /auth/login으로 리다이렉트
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
        path: 'signup',
        name: 'SignupView',
        component: importedViews['SignupView'] // 자동 임포트 적용
      },
      {
        path: 'login',
        name: 'LoginView',
        component: importedViews['LoginView'] // 자동 임포트 적용
      }
    ]
  },
  {
    path: '/portfolios',
    component: PortfolioLayout, // 공통 레이아웃 컴포넌트
    children: []
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: importedViews['NotFound'] // 자동 임포트 적용
  },
  {
    path: '/mypage',
    name: 'MypageView',
    component: importedViews['MypageView'] // 자동 임포트 적용
  },
  {
    path: '/main',
    name: 'MainpageView',
    component: importedViews['MainpageView'] // 자동 임포트 적용
  },
  {
    path: '/calendar',
    name: 'CalendarMainView',
    component: importedViews['CalendarMainView'] // 자동 임포트 적용
  },
  {
    path: '/feed',
    component: FeedLayout, // 부모 레이아웃
    children: [
      {
        path: 'ako-stamp-write',
        name: 'AkoStampWriteView',
        component: importedViews['AkoStampWriteView'] // 자동 임포트 적용
      }
    ]
  },
  {
    path: '/akopolio',
    name: 'akopolioMain',
    component: akopolioMain,
  },
  {
    path: '/akopolio/create',
    name: 'akopolioCreate',
    component: akopolioCreate,
  }
]

const router = createRouter({
  history: createWebHashHistory('/akoming/'), // Hash 모드를 사용
  routes
})

//라우터 가드 설정(세션 기반 쿠기, 나중에 수정 필요)
// meta: { requiresAuth: true } // 인증이 필요한 페이지
export default router
