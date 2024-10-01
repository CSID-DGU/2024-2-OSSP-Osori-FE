/* eslint-disable */
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Signup from '@/views/Signup.vue' // Signup -> SignupForm으로 변경
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  { path: '/signup', component: Signup },
  { path: '/login', component: Login },
  { path: '/profile', component: Profile }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
