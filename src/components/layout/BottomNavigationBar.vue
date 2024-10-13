<template>
  <div class="h-16 bg-white w-full flex justify-center items-center">
    <div class="flex justify-between items-center w-11/12 sm:w-4/5 max-w-md">
      <button
        v-for="(icon, index) in icons"
        :key="index"
        @click="toggleIcon(index)"
        class="focus:outline-none p-3 transition-colors duration-200 ease-in-out"
      >
        <component
          :is="icon"
          class="w-6 h-6 transition-colors duration-200 ease-in-out"
          :class="activeIndex === index ? 'text-[#F4B28C]' : 'text-gray-400'"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CalendarIcon from '@/assets/Icons/FooterIcons/CalendarIcon.vue'
import ListIcon from '@/assets/Icons/FooterIcons/ListIcon.vue'
import HomeIcon from '@/assets/Icons/FooterIcons/HomeIcon.vue'
import RefreshIcon from '@/assets/Icons/FooterIcons/RefreshIcon.vue'
import UserIcon from '@/assets/Icons/FooterIcons/UserIcon.vue'

const icons = [CalendarIcon, ListIcon, HomeIcon, RefreshIcon, UserIcon]
const activeIndex = ref(0)

const toggleIcon = (index) => {
  activeIndex.value = index
}
</script>

<style scoped>
button:focus {
  outline: none;
}

button svg {
  fill: currentColor;
  transition: fill 0.3s ease-in-out;
}
</style>
