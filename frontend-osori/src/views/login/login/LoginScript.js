import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      isEmailValid: true,
      showLogo: true // 로고를 보여줄지 여부
    }
  },
  mounted() {
    // 2초 후 로고 페이지에서 로그인 페이지로 전환
    setTimeout(() => {
      this.showLogo = false
    }, 2000) // 2000ms = 2초
  },
  methods: {
    ...mapActions(['login']), // Vuex의 login action 매핑

    validateEmail() {
      // 이메일이 반드시 @dgu.ac.kr 로 끝나도록 체크
      const emailDomain = '@dgu.ac.kr'
      if (this.email.endsWith(emailDomain)) {
        this.isEmailValid = true
      } else {
        this.isEmailValid = false
      }
    },
    async onSubmit() {
      if (!this.isEmailValid) {
        alert('유효하지 않은 이메일 도메인입니다.')
        return
      }

      try {
        // 로그인 API 호출
        const response = await axios.post(
          'http://localhost:8082/api/users/login',
          {
            email: this.email,
            password: this.password
          }
        )

        // 로그인 성공 처리
        if (response.status === 200) {
          const userData = response.data // 서버에서 받은 사용자 데이터

          // Vuex에 로그인된 사용자 정보 저장
          this.login(userData)

          alert('로그인 성공!')
          // 로그인 성공 후 페이지 이동 등의 추가 로직
        }
      } catch (error) {
        // 로그인 실패 처리
        if (error.response && error.response.status === 401) {
          alert('이메일 또는 비밀번호가 잘못되었습니다.')
        } else {
          alert('로그인 중 오류가 발생했습니다.')
        }
      }
    },
    goToSignup() {
      // 회원가입 페이지로 이동
      this.$router.push('/signup')
    }
  }
}
