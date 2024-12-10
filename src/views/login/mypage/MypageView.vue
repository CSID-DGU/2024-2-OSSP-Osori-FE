<template>
  <div class="page-container">
    <div class="mobile-container">
      <!-- 상단바 -->
      <MainHeader />

      <!-- 로그아웃 버튼 -->
      <div class="logout-button-container">
        <button @click="logout" class="logout-button">로그아웃</button>
      </div>

      <!-- 본문 내용 -->
      <main class="main-content">
        <section class="profile-section">
          <h1 class="profile-title">
            <span class="user-nickname">{{ user.nickname }}</span>
            님의 <br />마이페이지
          </h1>

          <!-- Updated goals section -->
          <div class="goals-container">
            <div class="goals-header">
              <h2 class="goals-title">나의 아코자국들</h2>
              <button @click="toggleExpand" class="expand-button">
                {{ isExpanded ? '접기' : '더보기' }}
              </button>
            </div>
            <ul v-if="goals.length > 0" class="goals-list">
              <li
                v-for="(goal, index) in displayedGoals"
                :key="index"
                class="goal-item"
              >
                <div class="goal-date">
                  {{ formatDate2(goal.createdAt) }}
                </div>
                <p class="goal-content">
                  {{ goal.content }}
                </p>
              </li>
            </ul>
            <p v-else class="no-goals-message">아직 목표 기록이 없습니다.</p>
          </div>
        </section>

        <section class="user-info-section">
          <h2 class="section-title"></h2>
          <div class="form-container">
            <!-- 이메일 -->
            <div class="form-group">
              <label class="form-label">이메일</label>
              <input
                type="email"
                v-model="user.email"
                readonly
                class="form-input"
              />
            </div>
            <!-- 닉네임 -->
            <div class="form-group">
              <label class="form-label">닉네임</label>
              <input
                type="text"
                v-model="user.nickname"
                placeholder="닉네임을 입력하세요"
                class="form-input"
              />
            </div>

            <!-- 현재 비밀번호 확인 -->
            <div class="form-group">
              <label class="form-label">현재 비밀번호 확인</label>
              <div class="input-button-group">
                <input
                  type="password"
                  v-model="currentPassword"
                  placeholder="현재 비밀번호를 입력하세요"
                  class="form-input"
                />
                <button @click="verifyCurrentPassword" class="verify-button">
                  확인하기
                </button>
              </div>
            </div>

            <!-- 새 비밀번호와 확인 -->
            <div class="form-group">
              <label class="form-label">새 비밀번호</label>
              <input
                type="password"
                v-model="password"
                placeholder="새 비밀번호를 입력하세요"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label class="form-label">새 비밀번호 확인</label>
              <div class="input-button-group">
                <input
                  type="password"
                  v-model="confirmPassword"
                  placeholder="새 비밀번호를 다시 입력하세요"
                  class="form-input"
                />
                <!-- 비밀번호 수정 버튼에 :disabled 속성 추가 -->
                <button
                  @click="updatePassword"
                  class="update-button"
                  :disabled="!password || !confirmPassword"
                >
                  수정하기
                </button>
              </div>
            </div>

            <!-- 학번과 학과 -->
            <div class="form-group">
              <label class="form-label">학번</label>
              <input
                type="text"
                v-model="user.studentNumber"
                placeholder="학번을 입력하세요"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label class="form-label">학과</label>
              <input
                type="text"
                v-model="user.major"
                placeholder="학과를 입력하세요"
                class="form-input"
              />
            </div>
            <div class="save-button-container">
              <button @click="saveProfile" class="save-button">저장하기</button>
            </div>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

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

const router = useRouter()
const goals = ref([])
const isExpanded = ref(false)
const maxVisibleGoals = 6

const logout = () => {
  handleLogout(router)
}

const fetchGoals = async () => {
  try {
    const response = await axios.get(
      `${process.env.VUE_APP_BE_API_URL}/api/goals`,
      { withCredentials: true }
    )
    goals.value = response.data
  } catch (error) {
    console.error('목표 기록을 가져오는 데 실패했습니다.', error)
    goals.value = [
      { content: '기본 목표 1', createdAt: '2024-10-01' },
      { content: '기본 목표 2', createdAt: '2024-10-15' },
      { content: '기본 목표 3', createdAt: '2024-11-05' },
      { content: '기본 목표 4', createdAt: '2024-11-20' },
      { content: '기본 목표 5', createdAt: '2024-12-05' },
      { content: '기본 목표 6', createdAt: '2024-12-20' },
      { content: '기본 목표 7', createdAt: '2025-01-05' }
    ]
  }
}

onMounted(() => {
  fetchGoals()
  fetchUser()
})

const displayedGoals = computed(() => {
  return isExpanded.value ? goals.value : goals.value.slice(0, maxVisibleGoals)
})

const formatDate2 = (date) => {
  const options = { month: '2-digit', day: '2-digit' }
  return new Date(date).toLocaleDateString('ko-KR', options).replace(/\//g, '.')
}

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const saveProfile = () => {
  const profileData = {
    name: user.name,
    email: user.email,
    nickname: user.nickname,
    studentNumber: user.studentNumber,
    major: user.major,
    introduce: user.introduce
  }
  updateProfile(profileData)
}
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #fff9f2;
  font-family: 'NanumSquareRound', sans-serif;
  display: flex;
  justify-content: center;
  color: #000000;
}

.mobile-container {
  width: 395px;
  min-width: 340px;
  background-color: #fae8da;
  min-height: 100vh;
  position: relative;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.logout-button-container {
  position: absolute;
  top: 100px;
  right: 45px;
}

.logout-button {
  padding: 6px 12px;
  background-color: #ffc68d;
  color: #000000;
  font-size: 12px;
  border-radius: 9999px;
  transition: background-color 0.3s;
  height: 28px;
  line-height: 16px;
}

.logout-button:hover {
  background-color: #e5b27f;
}

.main-content {
  display: flex;
  flex-direction: column;
  padding: 64px 48px 96px;
  overflow-y: auto;
}

.profile-section {
  margin-top: 36px;
}

.profile-title {
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: medium;
  font-family: 'NanumSquareRound', sans-serif;
}

.user-nickname {
  font-size: 28px; /* Increased from 24px */
  font-family: 'NanumSquareRound', sans-serif;
  font-weight: medium; /* Added to make it stand out more */
}

/* Updated goals section styles */
.goals-container {
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  position: relative;
  margin-top: 30px;
}

.goals-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.goals-title,
.expand-button {
  position: absolute;
  top: -15px;
  background-color: white;
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: medium;
}

.goals-title {
  left: 20px;
}

.expand-button {
  right: 20px;
  cursor: pointer;
}

.goals-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.goal-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

/* .goal-date {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background-color: #ff7f00;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 5px;
  font-weight: 100;
  margin-right: 12px;
} */

.goal-content {
  flex-grow: 1;
  font-size: 14px;
  margin: 0;
}

.no-goals-message {
  font-size: 14px;
  text-align: center;
  color: #666;
}

.user-info-section {
  margin-top: 8px;
}

.section-title {
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: medium;
  font-family: 'NanumSquareRound', sans-serif;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: medium;
  color: #4a4a4a;
  font-family: 'NanumSquareRound', sans-serif;
  font-family: 'NaR';
  font-size: 14px;
  color: #000000;
  font-style: normal;
  font-weight: 300;
}

.form-input {
  width: 100%;
  padding: 8px 12px;
  background-color: #ddd7d3;
  border: 1px solid #e5e5e5;
  border-radius: 9999px;
  font-size: 14px;
  transition: all 0.2s;
  height: 35px;
  font-family: 'NaR';
  font-size: 14px;
  color: #000000;
  font-style: normal;
  font-weight: 300;
}

.form-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #f6b87a;
  border-color: transparent;
}

.input-button-group {
  display: flex;
  gap: 8px;
  align-items: center;
  height: 35px;
}

.input-button-group .form-input {
  flex-grow: 1;
  height: 37.6px;
  font-family: 'NaB';
  font-size: 14px;
  color: #000000;
  font-style: normal;
}

.verify-button,
.update-button {
  padding: 8px 12px;
  background-color: #f6b87a;
  color: #000000;
  font-size: 14px;
  font-weight: medium;
  border-radius: 9999px;
  transition: background-color 0.3s;
  height: 37.6px;
  white-space: nowrap;
  min-width: 80px;
  letter-spacing: -0.05em;
  font-family: 'NaB';
  font-size: 14px;
  color: #000000;
  font-style: normal;
}

.verify-button:hover,
.update-button:hover {
  background-color: #e5a769;
}

.save-button-container {
  text-align: center;
  margin-top: 20px;
}

.save-button {
  width: 160px;
  padding: 8px 16px;
  background-color: #f6b87a;
  color: #000000;
  font-size: 14px;
  font-weight: medium;
  border-radius: 9999px;
  transition: background-color 0.3s;
  font-family: 'NaB';
  font-size: 14px;
  color: #000000;
  font-style: normal;
  font-weight: 300;
}

.save-button:hover {
  background-color: #e5a769;
}
.goals-container {
  background-color: white;
  border-radius: 12px; /* 덜 둥글게 */
  padding: 16px;
  margin: 24px -12px; /* 가로로 넓히기 */
  position: relative;
}

.goal-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.goals-title,
.expand-button {
  position: absolute;
  top: -12px;
  background-color: #ffffff;
  color: #000000;
  padding: 5px 11px;
  font-size: 12px;
  border-radius: 8px;
  white-space: nowrap; /* 줄바꿈 방지 */
  font-family: 'NaB';
  font-size: 14px;
  color: #000000;
  font-style: normal;
  font-weight: 300;
}

.goals-title {
  left: 20px; /* 왼쪽 여백 증가 */
}

.expand-button {
  right: 20px; /* 오른쪽 여백 증가 */
}

.goal-content {
  font-size: 12px;
  line-height: 1.2;
  font-family: 'NaL';
  font-size: 14px;
  color: #000000;
  font-style: normal;
  font-weight: 300;
}

.goals-list {
  margin-top: 10px;
}
.goal-date {
  width: 34px;
  height: 30px;
  margin-right: 12px; /* 좌우 간격 늘리기 */
  font-size: 10px;
  background-color: #ff7f00;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  white-space: nowrap; /* 줄바꿈 방지 */
  font-family: 'NaL';

  font-weight: 300;
}
</style>
