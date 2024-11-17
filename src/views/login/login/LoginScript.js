import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      isEmailValid: true,
      showLoading: true // 로딩 화면 표시 여부
    }
  },
  mounted() {
    // 2초 후 로고 페이지에서 로그인 페이지로 전환
    setTimeout(() => {
      this.showLoading = false
    }, 2000) // 2000ms = 2초
  },
  methods: {
    validateEmail() {
      // 이메일이 반드시 @dgu.ac.kr 로 끝나도록 체크
      this.isEmailValid = this.email.endsWith('@dgu.ac.kr')
    },
    async onSubmit() {
      if (!this.isEmailValid) {
        alert('유효하지 않은 이메일 도메인입니다.')
        return
      }

      // 기존 JSESSIONID 쿠키 삭제
      document.cookie =
        'JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

      try {
        // 로그인 API 호출
        const response = await axios.post(
          `${process.env.VUE_APP_BE_API_URL}/api/users/login`,
          {
            email: this.email,
            password: this.password
          },
          {
            withCredentials: true // 세션 쿠키를 포함하여 서버와 통신
          }
        )

        // 로그인 성공 처리
        if (response.status === 200) {
          const userData = response.data // 서버에서 받은 사용자 데이터

          alert('로그인 성공!')
          // 로그인 성공 후 MyPage로 리다이렉트
          this.$router.push('/mypage')
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
      this.$router.push('/auth/signup')
    }
  }
}
