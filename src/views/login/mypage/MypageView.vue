<template>
  <div class="min-h-screen bg-[#FFF9F2] font-pretendard flex justify-center">
    <div
      class="w-[395px] min-w-[340px] bg-[#FAE8DA] min-h-screen relative overflow-y-auto"
    >
      <!-- 상단바 -->
      <header
        class="bg-white shadow-sm py-3 px-4 fixed top-0 left-1/2 transform -translate-x-1/2 w-[395px] min-w-[340px] z-10"
      >
        <div class="flex items-center justify-between">
          <img src="@/assets/images/Akoming.svg" alt="로고" class="h-8" />
          <button
            @click="handleLogout"
            class="text-[#F6B87A] hover:bg-[#F6B87A] hover:bg-opacity-10 px-2 py-1 rounded-full transition-colors duration-300 text-sm"
          >
            로그아웃
          </button>
        </div>
      </header>

      <!-- 본문 내용 -->
      <main class="flex flex-col px-12 pt-16 pb-24">
        <section class="mt-9">
          <h1 class="mb-4 text-xl font-bold">
            <span class="text-2xl">{{ user.nickname }}</span
            >님의 마이페이지
          </h1>

          <h2 class="mb-2 text-lg font-semibold">자기소개</h2>
          <p class="p-3 mb-2 text-sm bg-white rounded-lg">
            {{ user.introduce || '자기소개를 입력하세요.' }}
          </p>
          <button
            @click="editIntroduce"
            class="w-full px-4 py-2 bg-[#F6B87A] text-white text-sm font-medium rounded-full hover:bg-[#e5a769] transition-colors duration-300"
          >
            수정하기
          </button>
        </section>

        <section class="mt-8">
          <h2 class="mb-2 text-lg font-semibold">개인정보</h2>
          <div class="space-y-4">
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700"
                >실명</label
              >
              <input
                type="text"
                v-model="user.name"
                readonly
                class="w-full px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200"
              />
            </div>

            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700"
                >이메일</label
              >
              <input
                type="email"
                v-model="user.email"
                readonly
                class="w-full px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200"
              />
            </div>

            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700"
                >닉네임</label
              >
              <input
                type="text"
                v-model="user.nickname"
                placeholder="닉네임을 입력하세요"
                class="w-full px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200"
              />
            </div>

            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700"
                >현재 비밀번호 확인</label
              >
              <input
                type="password"
                v-model="currentPassword"
                placeholder="현재 비밀번호를 입력하세요"
                class="w-full px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200"
              />
            </div>
            <button
              @click="verifyCurrentPassword"
              class="w-full px-4 py-2 bg-[#F6B87A] text-white text-sm font-medium rounded-full hover:bg-[#e5a769] transition-colors duration-300"
            >
              확인하기
            </button>

            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700"
                >새 비밀번호</label
              >
              <input
                type="password"
                v-model="password"
                placeholder="새 비밀번호를 입력하세요"
                class="w-full px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200"
              />
            </div>

            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700"
                >새 비밀번호 확인</label
              >
              <input
                type="password"
                v-model="confirmPassword"
                placeholder="새 비밀번호를 다시 입력하세요"
                class="w-full px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200"
              />
            </div>
            <button
              @click="updatePassword"
              class="w-full px-4 py-2 bg-[#F6B87A] text-white text-sm font-medium rounded-full hover:bg-[#e5a769] transition-colors duration-300"
            >
              수정하기
            </button>

            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700"
                >학번</label
              >
              <input
                type="text"
                v-model="user.studentNumber"
                placeholder="학번을 입력하세요"
                class="w-full px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200"
              />
            </div>

            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700"
                >학과</label
              >
              <input
                type="text"
                v-model="user.major"
                placeholder="학과를 입력하세요"
                class="w-full px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200"
              />
            </div>
            <button
              @click="updateProfile"
              class="w-full px-4 py-2 bg-[#F6B87A] text-white text-sm font-medium rounded-full hover:bg-[#e5a769] transition-colors duration-300"
            >
              수정하기
            </button>
          </div>
        </section>
      </main>
      <!-- 하단바 -->
      <MainFooter />
    </div>
  </div>
</template>

<script src="./MypageScript.js">
import MainFooter from '@/components/layout/Footer.vue'
import './MypageScript.js';

export default {
  components: {
    MainFooter
  }
}
</script>

<style scoped></style>
