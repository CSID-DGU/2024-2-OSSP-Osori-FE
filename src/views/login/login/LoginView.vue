<template>
  <div class="min-h-screen bg-[#FFF9F2] font-pretendard flex justify-center">
    <div class="w-[395px] min-w-[340px] bg-[#FAE8DA] min-h-screen relative">
      <!-- 상단바 -->
      <header
        class="bg-white shadow-sm py-3 px-4 fixed top-0 left-1/2 transform -translate-x-1/2 w-[395px] min-w-[340px] z-10"
      >
        <div class="flex items-center justify-between">
          <img src="@/assets/images/Akoming.svg" alt="로고" class="h-8" />
          <button
            @click="$router.push('/auth/signup')"
            class="text-[#F6B87A] hover:bg-[#F6B87A] hover:bg-opacity-10 px-2 py-1 rounded-full transition-colors duration-300 text-sm"
          >
            회원가입
          </button>
        </div>
      </header>

      <!-- 본문 내용 -->
      <main class="flex flex-col justify-center min-h-screen px-12 pt-16 pb-8">
        <h1 class="mb-2 text-2xl font-bold text-center">로그인</h1>
        <form @submit.prevent="onSubmit" class="my-8 space-y-4">
          <!-- 이메일 입력란 -->
          <div class="space-y-1">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >이메일</label
            >
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="이메일 입력"
              @input="validateEmail"
              :class="{ 'border-red-500': !isEmailValid && email !== '' }"
              required
              class="w-full px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200"
            />
            <p
              v-if="!isEmailValid && email !== ''"
              class="mt-1 text-xs text-red-500"
            >
              반드시 @dgu.ac.kr 이메일을 사용해야 합니다.
            </p>
          </div>

          <!-- 비밀번호 입력란 -->
          <div class="space-y-1">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >비밀번호</label
            >
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="비밀번호 입력"
              required
              class="w-full px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200"
            />
          </div>

          <!-- 로그인 버튼 :disabled="!canSubmit" -->
          <div class="flex justify-center pt-4">
            <button
              type="submit"
              class="w-full max-w-xs px-4 h-10 bg-[#F6B87A] text-white text-sm font-medium rounded-full hover:bg-[#e5a769] transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              로그인
            </button>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>

<script src="./LoginScript.js"></script>

<style>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

@media (min-width: 396px) {
  body {
    background-color: #fff9f2;
  }
}
</style>
