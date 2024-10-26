<template>
  <div
    class="min-h-screen flex items-center justify-center bg-[#FFF9F2] font-nanum-square-round"
  >
    <div
      class="w-[395px] min-w-[340px] bg-[#FAE8DA] min-h-screen flex items-center justify-center"
    >
      <MainHeader />
      <div class="text-center px-6">
        <h1 class="text-6xl font-bold text-gray-800 mb-4 font-uhbeesehyun">
          404
        </h1>
        <p class="text-lg text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
        <router-link
          to="/main"
          class="px-6 py-3 bg-[#F4B28C] text-white rounded-full no-underline"
        >
          홈으로 돌아가기
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/layout/Header.vue'

export default {
  name: 'NotFound'
}
</script>

<style>
@font-face {
  font-family: 'UhBeeSe_hyun';
  src: url('https://gcore.jsdelivr.net/gh/projectnoonnu/noonfonts_five@.2.0/UhBeeSe_hyun.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'NanumSquareRound';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: 'NanumSquareRound', sans-serif;
}

.font-uhbeesehyun {
  font-family: 'UhBeeSe_hyun', sans-serif;
}

.font-nanum-square-round {
  font-family: 'NanumSquareRound', sans-serif;
}

.no-underline {
  text-decoration: none;
}
</style>
