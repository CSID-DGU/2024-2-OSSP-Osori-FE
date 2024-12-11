import MainHeader from '@/components/layout/Header.vue'

// SignupScript.js
export default {
  components: {
    MainHeader
  },
  data() {
    return {
      email: '',
      authCode: '', // 사용자가 입력한 인증번호
      password: '',
      confirmPassword: '',
      nickname: '',
      isEmailValid: true,
      isPasswordValid: true,
      emailSent: false,
      canSubmit: false, // 회원가입 버튼 활성화 상태
      MainHeader
    }
  },
  methods: {
    validateEmail() {
      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@(dgu\.ac\.kr|dongguk\.edu|dgu\.edu)$/
      this.isEmailValid = emailRegex.test(this.email)
      this.updateSubmitStatus()
    },

    validatePassword() {
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d|.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
      this.isPasswordValid = passwordRegex.test(this.password)
      this.updateSubmitStatus()
    },

    checkAuthCodeLength() {
      // 인증 코드 길이 체크
      this.authCodeValid = this.authCode.length === 6
      this.updateSubmitStatus()
    },

    updateSubmitStatus() {
      // 모든 필드가 유효한 경우에만 canSubmit 활성화
      this.canSubmit =
        this.email &&
        this.isEmailValid &&
        this.authCode.length === 6 &&
        this.password &&
        this.isPasswordValid &&
        this.password === this.confirmPassword &&
        this.nickname
    },

    sendVerificationEmail() {
      this.validateEmail()
      if (this.isEmailValid) {
        fetch(`${process.env.VUE_APP_BE_API_URL}/api/users/signup/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: this.email })
        })
          .then((response) => response.text())
          .then((data) => {
            if (data.includes('인증 코드가 이메일로 전송되었습니다.')) {
              this.emailSent = true
              alert(data)
            } else {
              alert('이메일 전송에 실패했습니다. 다시 시도해주세요.')
            }
          })
          .catch((error) => {
            console.error('Failed to send verification email:', error)
          })
      } else {
        alert('올바른 @dgu.ac.kr 이메일을 입력해주세요.')
      }
    },

    onSubmit() {
      this.validateEmail()
      this.validatePassword()

      if (this.isEmailValid && this.isPasswordValid && this.authCode) {
        console.log('Request Payload:', {
          email: this.email,
          authCode: this.authCode,
          password: this.password,
          nickname: this.nickname
        })

        fetch(`${process.env.VUE_APP_BE_API_URL}/api/users/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            authCode: this.authCode,
            password: this.password,
            nickname: this.nickname
          })
        })
          .then((response) => {
            if (!response.ok) {
              return response.text().then((errorText) => {
                console.error('Server Error Response:', errorText)
                throw new Error(errorText || '회원가입 요청에 실패했습니다.')
              })
            }
            return response.text()
          })
          .then((data) => {
            if (data === '회원가입이 완료되었습니다🎉') {
              alert(data)
              this.$router.push('/login')
            } else {
              alert(data)
            }
          })
          .catch((error) => {
            console.error('Failed to register:', error)
            alert(error.message || '회원가입 중 오류가 발생했습니다.')
          })
      } else {
        if (!this.isEmailValid) {
          alert('올바른 이메일 형식이 아닙니다.')
        }
        if (!this.isPasswordValid) {
          alert(
            '비밀번호는 최소 8자, 영문, 숫자, 특수문자 중 2종류 이상이어야 합니다.'
          )
        }
        if (!this.authCode) {
          alert('인증 코드를 입력해주세요.')
        }
      }
    }
  },

  watch: {
    email: 'validateEmail',
    password: 'validatePassword',
    confirmPassword: 'updateSubmitStatus',
    authCode: 'checkAuthCodeLength',
    nickname: 'updateSubmitStatus'
  }
}
