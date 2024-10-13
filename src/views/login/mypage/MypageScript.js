export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        nickname: '',
        studentNumber: '',
        major: '',
        introduce: ''
      },
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    // 로그아웃 처리
    async handleLogout() {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_BE_API_URL}/api/users/logout`,
          {
            method: 'POST',
            credentials: 'include' // 세션을 포함하여 로그아웃 요청
          }
        )
        if (response.ok) {
          alert('로그아웃되었습니다.')
          this.$router.push('/auth/login') // 로그아웃 후 로그인 페이지로 리다이렉트
        } else {
          console.error('로그아웃 실패')
        }
      } catch (error) {
        console.error('로그아웃 오류:', error)
      }
    },
    editIntroduce() {
      alert('자기소개 수정 페이지로 이동합니다.')
    },
    async updateProfile() {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_BE_API_URL}/api/users/profile`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.user),
            credentials: 'include' // 세션 포함
          }
        )
        if (response.ok) {
          alert('프로필이 수정되었습니다.')
        } else {
          console.error('프로필 수정에 실패했습니다.')
        }
      } catch (error) {
        console.error('프로필 수정 오류:', error)
      }
    },
    async updatePassword() {
      if (this.password !== this.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.')
        return
      }
      try {
        const response = await fetch(
          `${process.env.VUE_APP_BE_API_URL}/api/users/password`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: this.password }),
            credentials: 'include' // 세션 포함
          }
        )
        if (response.ok) {
          alert('비밀번호가 수정되었습니다.')
          // 비밀번호 변경 후 입력란 초기화
          this.password = ''
          this.confirmPassword = ''
        } else {
          alert('비밀번호 수정에 실패했습니다.')
        }
      } catch (error) {
        console.error('비밀번호 수정 오류:', error)
      }
    },
    // 서버에서 유저 프로필 정보 불러오기
    async fetchUser() {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_BE_API_URL}/api/users/profile`,
          {
            method: 'GET',
            credentials: 'include' // 세션 유지
          }
        )
        if (response.ok) {
          const userData = await response.json()
          this.user = userData // 서버에서 받은 사용자 정보 설정
        } else {
          console.error('유저 정보 불러오기 실패')
        }
      } catch (error) {
        console.error('유저 정보 불러오기 오류:', error)
      }
    }
  },
  mounted() {
    this.fetchUser() // 컴포넌트가 마운트될 때 무조건 서버에서 유저 정보를 불러옴
  }
}
