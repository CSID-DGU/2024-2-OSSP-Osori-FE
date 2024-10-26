<template>
  <!-- 상단바 -->
  <header
    class="bg-white py-2 px-4 fixed top-0 left-1/2 transform -translate-x-1/2 w-[395px] min-w-[340px] z-10"
  >
    <div class="flex items-center justify-between">
      <img src="@/assets/images/Akoming.svg" alt="로고" class="h-12" />
      <!-- <button
        class="text-[#F6B87A] hover:bg-[#F6B87A] hover:bg-opacity-10 px-2 py-1 rounded-full transition-colors duration-300 text-sm"
      >
        마이페이지
      </button> -->
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent' // Header 컴포넌트를 다른 파일에서 사용하기 위해 export
}
</script>
