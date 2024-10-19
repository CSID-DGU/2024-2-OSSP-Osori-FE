<template>
  <!-- 하단바 -->
  <footer
    class="bg-white shadow-sm py-3 px-4 fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[395px] min-w-[340px] z-10"
  >
    <div class="flex items-center justify-around h-full">
      <button
        class="px-2 py-1 text-sm text-gray-500 transition-colors duration-300 rounded-full hover:bg-gray-100"
      >
        홈
      </button>
      <button
        class="text-[#F6B87A] hover:bg-[#F6B87A] hover:bg-opacity-10 px-2 py-1 rounded-full transition-colors duration-300 text-sm"
      >
        스탬프
      </button>
      <button
        class="px-2 py-1 text-sm text-gray-500 transition-colors duration-300 rounded-full hover:bg-gray-100"
      >
        임시
      </button>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter'
}
</script>
