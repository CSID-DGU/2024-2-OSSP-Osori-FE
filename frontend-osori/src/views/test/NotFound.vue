<!-- src/views/NotFound.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
      <router-link
        to="/auth/signin"
        class="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300 ease-in-out"
      >
        홈으로 돌아가기
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');

body {
  font-family: 'Noto Sans KR', sans-serif;
}
</style>
