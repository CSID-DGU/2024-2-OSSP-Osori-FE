<template>
  <div
    class="min-h-screen bg-[#FFF9F2] font-nanum-square-round flex justify-center"
  >
    <!-- 모바일 영역 -->
    <div
      class="w-[395px] min-w-[340px] bg-[#FAE8DA] min-h-screen flex flex-col relative"
    >
      <!-- 상단바 -->
      <header
        class="bg-white py-2 px-4 fixed top-0 left-1/2 transform -translate-x-1/2 w-[395px] min-w-[340px] z-10"
      >
        <div class="flex items-center justify-between">
          <img src="@/assets/images/Akoming.svg" alt="로고" class="h-12" />
          <button
            @click="$router.push('/auth/login')"
            class="text-[#F6B87A] hover:bg-[#F6B87A] hover:bg-opacity-10 px-2 py-1 rounded-full transition-colors duration-300 text-sm font-nanum-square-round"
          >
            뒤로가기
          </button>
        </div>
      </header>

      <!-- 본문 내용 -->
      <main
        class="flex flex-col justify-center flex-grow px-12 pt-16 pb-8 font-nanum-square-round"
      >
        <h1 class="mb-2 text-2xl font-bold text-center font-nanum-square-round">
          회원가입
        </h1>
        <form @submit.prevent="onSubmit" class="my-8 space-y-4">
          <!-- 이메일 입력란 및 인증하기 버튼 -->
          <div class="space-y-1">
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 font-nanum-square-round"
              >이메일</label
            >
            <div class="flex space-x-2">
              <input
                type="email"
                id="email"
                style="height: 37.6px"
                v-model="email"
                placeholder="이메일 입력"
                @input="validateEmail"
                :class="{ 'border-red-500': !isEmailValid && email !== '' }"
                required
                class="flex-grow px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200 font-nanum-square-round"
              />
              <button
                type="button"
                style="height: 37.6px"
                @click="sendVerificationEmail"
                :disabled="!isEmailValid"
                class="px-3 py-2 bg-[#F6B87A] text-white text-sm rounded-full hover:bg-[#e5a769] transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed font-nanum-square-round"
              >
                인증하기
              </button>
            </div>
            <p
              v-if="!isEmailValid && email !== ''"
              class="mt-1 text-xs text-red-500 font-nanum-square-round"
            >
              반드시 @dgu.ac.kr 이메일을 사용해야 합니다.
            </p>
          </div>

          <!-- 인증번호 입력란 -->
          <div v-if="emailSent" class="space-y-1">
            <label
              for="authCode"
              class="block text-sm font-medium text-gray-700 font-nanum-square-round"
              >인증번호</label
            >
            <input
              type="text"
              id="authCode"
              v-model="authCode"
              @input="checkAuthCodeLength"
              placeholder="인증번호 입력"
              maxlength="6"
              required
              class="w-full px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200 font-nanum-square-round"
            />
          </div>

          <!-- 비밀번호 입력란 -->
          <div class="space-y-1">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 font-nanum-square-round"
              >비밀번호</label
            >
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="비밀번호 입력"
              @input="validatePassword"
              required
              class="w-full px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200 font-nanum-square-round"
            />
            <p
              v-if="!isPasswordValid && password !== ''"
              class="mt-1 text-xs text-red-500 font-nanum-square-round"
            >
              최소 8자, 영문, 숫자, 특수문자 중 2종류 이상 조합이어야 합니다.
            </p>
          </div>

          <!-- 비밀번호 확인 입력란 -->
          <div class="space-y-1">
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-700 font-nanum-square-round"
              >비밀번호 확인</label
            >
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              placeholder="비밀번호 확인"
              @input="updateSubmitStatus"
              required
              class="w-full px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200 font-nanum-square-round"
            />
            <p
              v-if="password !== confirmPassword && confirmPassword !== ''"
              class="mt-1 text-xs text-red-500 font-nanum-square-round"
            >
              비밀번호가 일치하지 않습니다.
            </p>
          </div>

          <!-- 닉네임 입력란 -->
          <div class="space-y-1">
            <label
              for="nickname"
              class="block text-sm font-medium text-gray-700 font-nanum-square-round"
              >닉네임 (10자까지)</label
            >
            <input
              type="text"
              id="nickname"
              v-model="nickname"
              placeholder="닉네임 입력"
              maxlength="10"
              required
              class="w-full px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200 font-nanum-square-round"
            />
          </div>

          <!-- 가입하기 버튼 -->
          <div class="flex justify-center pt-4">
            <button
              type="submit"
              :disabled="!canSubmit"
              class="w-full max-w-xs px-4 h-10 bg-[#F6B87A] text-white text-sm font-medium rounded-full hover:bg-[#e5a769] transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed font-nanum-square-round"
            >
              가입하기
            </button>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>

<script src="./SignupScript.js"></script>

<style>
@import url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff');

.font-nanum-square-round {
  font-family: 'NanumSquareRound', sans-serif;
}
</style>
