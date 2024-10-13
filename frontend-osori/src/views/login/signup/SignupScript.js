export default {
  data() {
    return {
      name: '',
      email: '',
      authCode: '', // 서버에서 받은 인증 코드를 저장
      inputCode: '', // 사용자가 입력한 인증번호
      password: '',
      confirmPassword: '',
      nickname: '',
      isEmailValid: true,
      isPasswordValid: true,
      isCodeValid: true,
      emailSent: false,
      canSubmit: false
    }
  },
  methods: {
    validateEmail() {
      // @dgu.ac.kr만 허용하는 정규식
      const emailRegex = /^[a-zA-Z0-9._%+-]+@dgu\.ac\.kr$/
      this.isEmailValid = emailRegex.test(this.email)
    },

    validatePassword() {
      // 최소 8자, 영문, 숫자, 특수문자 중 2종류 이상 조합해야 함
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d|.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
      this.isPasswordValid = passwordRegex.test(this.password)
    },

    sendVerificationEmail() {
      this.validateEmail() // 이메일 유효성 확인
      if (this.isEmailValid) {
        // 이메일 인증 요청
        fetch('http://localhost:8082/api/users/signup/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: this.email })
        })
          .then((response) => response.text()) // 평문 응답 처리
          .then((data) => {
            if (data.includes('인증 코드가 이메일로 전송되었습니다.')) {
              this.emailSent = true // 인증 코드 전송 완료 상태 업데이트
              alert(data) // "인증 코드가 이메일로 전송되었습니다." 메시지 출력
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

    verifyCode() {
      // 서버로 이메일과 인증 코드를 전송하여 인증 확인
      fetch('http://localhost:8082/api/users/signup/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          code: this.authCode // 사용자가 입력한 인증 코드
        })
      })
        .then((response) => response.text()) // 응답을 평문으로 받음
        .then((data) => {
          if (data === '이메일 인증이 완료되었습니다.') {
            this.isCodeValid = true
            alert(data) // "이메일 인증이 완료되었습니다." 메시지 출력
          } else {
            this.isCodeValid = false
            alert('인증번호가 올바르지 않습니다.') // 실패 메시지 출력
          }
        })
        .catch((error) => {
          console.error('Failed to verify code:', error)
          alert('인증 확인 중 오류가 발생했습니다.')
        })
    },

    onSubmit() {
      this.validatePassword() // 비밀번호 유효성 확인
      if (this.isPasswordValid && this.canSubmit && this.isCodeValid) {
        // 회원가입 요청
        fetch('http://localhost:8082/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            authCode: this.authCode, // 인증 코드를 포함하여 요청
            password: this.password,
            name: this.name,
            nickname: this.nickname
          })
        })
          .then((response) => response.text()) // 평문 응답 처리
          .then((data) => {
            if (data === '회원가입이 완료되었습니다🎉') {
              alert(data) // "회원가입이 완료되었습니다." 메시지 출력
              this.$router.push('/login') // 회원가입 후 로그인 페이지로 이동
            } else {
              alert('회원가입에 실패했습니다. 다시 시도해주세요.')
            }
          })
          .catch((error) => {
            console.error('Failed to register:', error)
            alert('회원가입 중 오류가 발생했습니다.')
          })
      } else {
        if (!this.isPasswordValid) {
          alert(
            '비밀번호는 최소 8자, 영문, 숫자, 특수문자 중 2종류 이상이어야 합니다.'
          )
        }
        if (!this.isCodeValid) {
          alert('인증 번호를 확인해주세요.')
        }
      }
    }
  }
}
