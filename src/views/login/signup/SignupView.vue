<template>
  <div class="page-container">
    <!-- 모바일 영역 -->
    <div
      class="mobile-container"
      style="font-family: 'NanumSquareRound', sans-serif"
    >
      <!-- 상단바 -->
      <header class="header">
        <div class="header-content">
          <img src="@/assets/images/Akoming.svg" alt="로고" class="logo" />
        </div>
      </header>
      <button @click="$router.push('/auth/login')" class="back-button">
        <img
          src="@/assets/Icons/akoming/arrow-left.png"
          alt="뒤로가기"
          class="back-icon"
        />
      </button>
      <!-- 본문 내용 -->
      <main class="main-content">
        <h1 class="title" style="font-family: 'NanumSquareRound', sans-serif">
          회원가입
        </h1>
        <form @submit.prevent="onSubmit" class="form">
          <!-- 이메일 입력란 및 인증하기 버튼 -->
          <div class="form-group">
            <label for="email">이메일</label>
            <div class="form-inline">
              <input
                type="email"
                id="email"
                v-model="email"
                placeholder="이메일 입력"
                @input="validateEmail"
                :class="{ invalid: !isEmailValid && email !== '' }"
                required
              />
              <button
                type="button"
                @click="sendVerificationEmail"
                :disabled="!isEmailValid"
                class="verification-button"
              >
                인증하기
              </button>
            </div>
            <p v-if="!isEmailValid && email !== ''" class="error-message">
              반드시 @dgu.ac.kr 이메일을 사용해야 합니다.
            </p>
          </div>

          <!-- 인증번호 입력란 -->
          <div v-if="emailSent" class="form-group">
            <label for="authCode">인증번호</label>
            <input
              type="text"
              id="authCode"
              v-model="authCode"
              @input="checkAuthCodeLength"
              placeholder="인증번호 입력"
              maxlength="6"
              required
            />
          </div>

          <!-- 비밀번호 입력란 -->
          <div class="form-group">
            <label for="password">비밀번호</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="비밀번호 입력"
              @input="validatePassword"
              required
            />
            <p v-if="!isPasswordValid && password !== ''" class="error-message">
              최소 8자, 영문, 숫자, 특수문자 중 2종류 이상 조합이어야 합니다.
            </p>
          </div>

          <!-- 비밀번호 확인 입력란 -->
          <div class="form-group">
            <label for="confirmPassword">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              placeholder="비밀번호 확인"
              @input="updateSubmitStatus"
              required
            />
            <p
              v-if="password !== confirmPassword && confirmPassword !== ''"
              class="error-message"
            >
              비밀번호가 일치하지 않습니다.
            </p>
          </div>

          <!-- 닉네임 입력란 -->
          <div class="form-group">
            <label for="nickname">닉네임 (10자까지)</label>
            <input
              type="text"
              id="nickname"
              v-model="nickname"
              placeholder="닉네임 입력"
              maxlength="10"
              required
            />
          </div>

          <!-- 가입하기 버튼 -->
          <div class="form-actions">
            <button type="submit" :disabled="!canSubmit" class="submit-button">
              가입하기
            </button>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>

<script src="./SignupScript.js"></script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #fff9f2;
  font-family: 'NanumSquareRound', sans-serif;
  display: flex;
  justify-content: center;
}

.mobile-container {
  width: 395px;
  min-width: 340px;
  background-color: #fae8da;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
}

.header {
  background-color: #ffffff;
  padding: 0.5rem 1rem;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 395px;
  min-width: 340px;
  z-index: 10;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  height: 3rem;
}

.back-button {
  position: absolute;
  top: 70px;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 20;
  padding: 0;
  margin-top: 20px;
}

.back-icon {
  width: 24px;
  height: 24px;
}

.back-button:hover {
  opacity: 0.8;
}

.main-content {
  margin-top: 160px;
  flex-grow: 1;
  padding: 4rem 3rem 2rem;
  padding-top: 40px;
}

.title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

.form {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-inline {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a4a4a;
}

input {
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #ddd7d3;
  border: 1px solid #e5e5e5;
  border-radius: 9999px;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus {
  border-color: transparent;
  box-shadow: 0 0 0 2px #f6b87a;
}

input.invalid {
  border-color: #ff6b6b;
}

input#email {
  height: 2.5rem;
}

.verification-button {
  padding: 0.5rem 1rem;
  background-color: #f6b87a;
  color: #000000;
  font-size: 0.875rem;
  border-radius: 9999px;
  text-align: center;
  transition: background-color 0.3s ease;
  cursor: pointer;
  height: 2.5rem;
  padding: 0.5rem 0.75rem; /* 좌우 패딩을 약간 줄임 */
  letter-spacing: -0.05em; /* 자간 줄이기 */
  white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
  min-width: 80px; /* 버튼의 최소 너비 설정 */
}

.verification-button:hover {
  background-color: #e5a769;
}

.verification-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #ff6b6b;
}

.form-actions {
  display: flex;
  justify-content: center;
}

.submit-button {
  width: 100%;
  max-width: 10rem;
  padding: 0.5rem 1rem;
  height: 2.5rem;
  background-color: #f6b87a;
  color: #000000;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 9999px;
  text-align: center;
  transition: background-color 0.3s ease;
  cursor: pointer;
  margin-top: 10px;
}

.submit-button:hover {
  background-color: #e5a769;
}

.submit-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
