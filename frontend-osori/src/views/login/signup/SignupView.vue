<template>
  <div class="signup-page">
    <!-- 상단바 -->
    <header class="header">
      <img src="@/assets/logo.png" alt="로고" class="logo" />
      <button class="back-button" @click="$router.push('/auth/realLogin')">
        뒤로가기
      </button>
    </header>

    <!-- 본문 내용 -->
    <main class="main-content">
      <form @submit.prevent="onSubmit">
        <!-- 실명 입력란 -->
        <div>
          <label for="name">실명</label>
          <input
            type="text"
            id="name"
            v-model="name"
            placeholder="실명 입력"
            required
          />
        </div>

        <!-- 이메일 입력란 및 인증하기 버튼 -->
        <div>
          <label for="email">이메일</label>
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
          >
            인증하기
          </button>
          <p v-if="!isEmailValid && email !== ''" class="error">
            반드시 @dgu.ac.kr 이메일을 사용해야 합니다.
          </p>
        </div>

        <!-- 인증번호 입력란 및 인증확인 버튼 -->
        <div v-if="emailSent">
          <label for="authCode">인증번호</label>
          <input
            type="text"
            id="authCode"
            v-model="authCode"
            placeholder="인증번호 입력"
            required
          />
          <button type="button" @click="verifyCode">인증확인</button>
          <p v-if="!isCodeValid && authCode !== ''" class="error">
            인증번호가 올바르지 않습니다.
          </p>
        </div>

        <!-- 비밀번호 입력란 -->
        <div>
          <label for="password">비밀번호</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="비밀번호 입력"
            @input="validatePassword"
            required
          />
          <p v-if="!isPasswordValid && password !== ''" class="error">
            최소 8자, 영문, 숫자, 특수문자 중 2종류 이상 조합이어야 합니다.
          </p>
        </div>

        <!-- 비밀번호 확인 입력란 -->
        <div>
          <label for="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="비밀번호 확인"
            @input="checkPasswordMatch"
            required
          />
          <p
            v-if="password !== confirmPassword && confirmPassword !== ''"
            class="error"
          >
            비밀번호가 일치하지 않습니다.
          </p>
        </div>

        <!-- 닉네임 입력란 -->
        <div>
          <label for="nickname">닉네임 10자까지!</label>
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
        <div>
          <button type="submit" :disabled="!canSubmit">가입하기</button>
        </div>
      </form>
    </main>
  </div>
</template>

<script src="./SignupScript.js"></script>
<style scoped src="./SignupStyle.css"></style>
