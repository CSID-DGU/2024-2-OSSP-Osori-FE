<template>
  <footer
    class="bg-white shadow-sm py-2.5 fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[395px] min-w-[340px] z-10"
  >
    <nav class="flex items-center justify-center h-full max-w-md mx-auto">
      <router-link
        v-for="(item, index) in navItems"
        :key="index"
        :to="item.route"
        class="flex items-center justify-center w-16 h-11 active:transform-none"
        :class="{
          'text-[#F4B28C]': $route.path === item.route
        }"
      >
        <img
          :src="item.icon"
          :alt="item.label"
          class="w-6 h-6 object-contain"
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
