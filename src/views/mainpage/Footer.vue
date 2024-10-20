<template>
  <footer
    class="bg-white shadow-sm py-3 px-4 fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[395px] min-w-[340px] z-10"
  >
    <nav class="flex items-center justify-between h-full">
      <router-link
        v-for="(item, index) in navItems"
        :key="index"
        :to="item.route"
        class="flex flex-col items-center px-2 py-1 text-sm text-gray-500 transition-colors duration-300 rounded-full hover:bg-gray-100"
        :class="{
          'text-[#F6B87A] hover:bg-[#F6B87A] hover:bg-opacity-10':
            $route.path === item.route
        }"
      >
        <img :src="item.icon" :alt="item.label" class="w-6 h-6 mb-1" />
      </router-link>
    </nav>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = ref([
  {
    label: '캘린더',
    icon: require('@/assets/Icons/akoming/bottom/calendaricon.svg'),
    route: 'calendar'
  },
  {
    label: '아코폴리오',
    icon: require('@/assets/Icons/akoming/bottom/akofolioicon.svg'),
    route: 'akofolio'
  },

  {
    label: '홈',
    icon: require('@/assets/Icons/akoming/bottom/homeicon.svg'),
    route: 'main'
  },
  {
    label: '피드',
    icon: require('@/assets/Icons/akoming/bottom/feedicon.svg'),
    route: 'feed'
  },

  {
    label: '마이페이지',
    icon: require('@/assets/Icons/akoming/bottom/mypageicon.svg'),
    route: 'mypage'
  }
])
</script>
