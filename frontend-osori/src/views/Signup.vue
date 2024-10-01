<template>
  <div>
    <h2>회원가입</h2>

    <!-- 이메일 입력 -->
    <div>
      <label>이메일 주소</label>
      <input v-model="email" placeholder="이메일을 입력하세요" />
      <button @click="sendEmailVerification">이메일 인증 코드 보내기</button>
    </div>

    <!-- 인증 코드 입력 -->
    <div v-if="isEmailSent">
      <label>인증 코드</label>
      <input
        v-model="verificationCode"
        placeholder="이메일로 받은 인증 코드를 입력하세요"
      />
      <button @click="verifyCode">인증 코드 확인</button>
    </div>

    <!-- 회원가입 -->
    <div v-if="isVerified">
      <label>비밀번호</label>
      <input
        v-model="password"
        type="password"
        placeholder="비밀번호를 입력하세요"
      />
      <button @click="signup">회원가입</button>
    </div>

    <div v-if="message">{{ message }}</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      verificationCode: '',
      password: '',
      isEmailSent: false,
      isVerified: false,
      message: ''
    }
  },
  methods: {
    // 이메일 인증 코드 전송
    async sendEmailVerification() {
      try {
        const response = await axios.post(
          'http://localhost:8080/api/users/signup/send-email',
          { email: this.email }
        )
        this.isEmailSent = true
        this.message = response.data
      } catch (error) {
        this.message = '이메일 전송 실패: ' + error.response.data
      }
    },
    // 이메일 인증 코드 확인
    async verifyCode() {
      try {
        const response = await axios.post(
          'http://localhost:8080/api/users/signup/verify-code',
          {
            email: this.email,
            code: this.verificationCode
          }
        )
        this.isVerified = true
        this.message = response.data
      } catch (error) {
        this.message = '인증 실패: ' + error.response.data
      }
    },
    // 회원가입 요청
    async signup() {
      try {
        const response = await axios.post(
          'http://localhost:8080/api/users/signup',
          {
            email: this.email,
            password: this.password,
            authCode: this.verificationCode
          }
        )
        this.message = response.data
      } catch (error) {
        this.message = '회원가입 실패: ' + error.response.data
      }
    }
  }
}
</script>
