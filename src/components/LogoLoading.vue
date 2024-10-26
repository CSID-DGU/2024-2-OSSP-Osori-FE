<!-- src/components/LogoLoading.vue -->
<template>
  <transition name="fade" @after-leave="afterLeave">
    <div v-if="show" class="loading-screen">
      <img
        src="@/assets/Icons/akoming/Akoming-logo.svg"
        alt="로고"
        class="loading-logo"
      />
    </div>
  </transition>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  props: {
    duration: {
      type: Number,
      default: 1000 // 1초 동안 로고 표시
    }
  },
  setup(props, { emit }) {
    const show = ref(true)

    onMounted(() => {
      setTimeout(() => {
        show.value = false
      }, props.duration)
    })

    const afterLeave = () => {
      emit('fade-complete')
    }

    return { show, afterLeave }
  }
}
</script>

<style scoped>
.loading-screen {
  position: absolute; /* 로그인 페이지 위에 겹치도록 설정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff9f2; /* 로그인 페이지 배경과 일치 */
  z-index: 50; /* 로그인 페이지 위로 배치 */
}

.loading-logo {
  width: 100px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
