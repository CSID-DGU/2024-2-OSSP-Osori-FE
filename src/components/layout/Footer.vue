<template>
  <footer
    class="bg-white shadow-sm py-2 px-4 fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[395px] min-w-[340px] z-10"
  >
    <nav class="flex items-center justify-between h-full">
      <router-link
        v-for="(item, index) in navItems"
        :key="index"
        :to="item.route"
        class="flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 hover:bg-gray-100"
        :class="{
          'text-[#F4B28C] hover:bg-[#F4B28C] hover:bg-opacity-10':
            $route.path === item.route
        }"
      >
        <img
          :src="item.icon"
          :alt="item.label"
          class="w-5 h-5 object-contain"
        />
      </router-link>
    </nav>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = ref([
  {
    label: '캘린더',
    icon: new URL(
      '@/assets/Icons/akoming/bottom/calendaricon.svg',
      import.meta.url
    ).href,
    route: '/calendar'
  },
  {
    label: '아코폴리오',
    icon: new URL(
      '@/assets/Icons/akoming/bottom/akofolioicon.svg',
      import.meta.url
    ).href,
    route: '/akofolio'
  },
  {
    label: '홈',
    icon: new URL('@/assets/Icons/akoming/bottom/homeicon.svg', import.meta.url)
      .href,
    route: '/main'
  },
  {
    label: '피드',
    icon: new URL('@/assets/Icons/akoming/bottom/feedicon.svg', import.meta.url)
      .href,
    route: '/feed/ako-stamp-board'
  },
  {
    label: '마이페이지',
    icon: new URL(
      '@/assets/Icons/akoming/bottom/mypageicon.svg',
      import.meta.url
    ).href,
    route: '/mypage'
  }
])

const activeColor = computed(() => '#F4B28C')
</script>

<style scoped>
.router-link-active img {
  filter: invert(77%) sepia(38%) saturate(436%) hue-rotate(328deg)
    brightness(101%) contrast(90%);
}
</style>
