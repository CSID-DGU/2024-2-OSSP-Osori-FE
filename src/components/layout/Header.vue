<template>
  <!-- 상단바 -->
  <header
    class="bg-white py-2 px-4 fixed top-0 left-1/2 transform -translate-x-1/2 w-[395px] min-w-[340px] z-10"
  >
    <div class="flex items-center justify-between">
      <img
        src="@/assets/images/Akoming.svg"
        alt="로고"
        class="h-12"
        :style="{ marginLeft: logoMargin + 'px' }"
      />
    </div>
  </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'HeaderComponent',
  setup() {
    const logoMargin = ref(0)

    const updateLogoMargin = () => {
      const headerWidth = 395
      const currentWidth = Math.max(document.documentElement.clientWidth, 340)
      logoMargin.value = Math.max(0, (headerWidth - currentWidth) / 2)
    }

    onMounted(() => {
      updateLogoMargin()
      window.addEventListener('resize', updateLogoMargin)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateLogoMargin)
    })

    return {
      logoMargin
    }
  }
}
</script>
