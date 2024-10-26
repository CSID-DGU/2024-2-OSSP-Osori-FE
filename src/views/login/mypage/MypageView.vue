<template>
  <div class="min-h-screen bg-[#FFF9F2] font-nanum flex justify-center">
    <div
      class="w-[395px] min-w-[340px] bg-[#FAE8DA] min-h-screen relative overflow-y-auto"
    >
      <!-- 상단바 -->
      <MainHeader />

      <!-- 본문 내용 -->
      <main class="flex flex-col px-12 pt-16 pb-24 overflow-y-auto">
        <section class="mt-9">
          <h1 class="mb-4 text-xl font-bold">
            <span class="text-2xl">{{ user.nickname }}</span
            ><br />님의 마이페이지
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
            <!-- 실명 -->
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
            <!-- 이메일 -->
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
            <!-- 닉네임 -->
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

            <!-- 현재 비밀번호 확인 -->
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700"
                >현재 비밀번호 확인</label
              >
              <div class="flex space-x-2">
                <input
                  type="password"
                  v-model="currentPassword"
                  placeholder="현재 비밀번호를 입력하세요"
                  class="flex-grow px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200"
                />
                <button
                  @click="verifyCurrentPassword"
                  class="px-3 py-2 bg-[#F6B87A] text-white text-sm font-medium rounded-full hover:bg-[#e5a769] transition-colors duration-300"
                >
                  확인하기
                </button>
              </div>
            </div>

            <!-- 새 비밀번호와 확인 -->
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
              <div class="flex space-x-2">
                <input
                  type="password"
                  v-model="confirmPassword"
                  placeholder="새 비밀번호를 다시 입력하세요"
                  class="flex-grow px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200"
                />
                <button
                  @click="updatePassword"
                  class="px-3 py-2 bg-[#F6B87A] text-white text-sm font-medium rounded-full hover:bg-[#e5a769] transition-colors duration-300"
                >
                  수정하기
                </button>
              </div>
            </div>

            <!-- 학번과 학과 -->
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

<script setup>
import MainHeader from '@/components/layout/Header.vue'
import MainFooter from '@/components/layout/Footer.vue'
import {
  user,
  password,
  confirmPassword,
  currentPassword,
  passwordVerified,
  handleLogout,
  fetchUser,
  verifyCurrentPassword,
  updatePassword,
  updateProfile
} from './MypageScript.js'
</script>

<style scoped></style>
