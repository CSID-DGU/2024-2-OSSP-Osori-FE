<template>
  <div class="app">
    <!-- 로고 페이지 -->
    <div v-if="showLogo" class="logo-page">
      <img src="@/assets/logo.png" alt="로고" />
    </div>

    <!-- 로그인 페이지 -->
    <div v-else>
      <!-- 상단바 -->
      <header class="header">
        <h1>로그인 페이지</h1>
      </header>

      <!-- 본문 내용 -->
      <main class="main-content">
        <form @submit.prevent="onSubmit">
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
            <p v-if="!isEmailValid && email !== ''" class="error">
              반드시 @dgu.ac.kr 이메일을 사용해야 합니다.
            </p>
          </div>
          <div>
            <label for="password">비밀번호</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="비밀번호 입력"
              required
            />
          </div>
          <div class="button-group">
            <button type="submit">로그인</button>
            <button @click="goToSignup" type="button">회원가입</button>
          </div>
        </form>
      </main>

      <!-- 하단바 -->
      <footer class="footer">
        <p>© 2024 My App</p>
      </footer>
    </div>
  </div>
</template>

<script src="./LoginScript.js"></script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

.logo-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.logo-page img {
  width: 150px; /* 로고 크기 조정 */
}

.header {
  background-color: #4caf50;
  color: white;
  padding: 1rem;
  text-align: center;
}

.main-content {
  padding: 1rem;
}

input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 0.75rem 1.5rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.invalid {
  border: 2px solid red;
}

.error {
  color: red;
}

.footer {
  background-color: #f1f1f1;
  text-align: center;
  padding: 1rem;
}
</style>
