export default {
  data() {
    return {
      user: {
        name: '임시 실명',
        email: 'example@dgu.ac.kr',
        nickname: '임시 닉네임',
        studentNumber: '00000000',
        major: '임시 학과',
        introduce: '임시 자기소개를 입력해주세요.'
      },
      password: '', // 새 비밀번호
      confirmPassword: '', // 새 비밀번호 확인
      currentPassword: '', // 현재 비밀번호 입력 필드
      passwordVerified: false // 비밀번호 확인 여부
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
          console.error('로그아웃 실패:', response.status, response.statusText)
        }
      } catch (error) {
        console.error('로그아웃 오류:', error)
      }
    },

    // 유저 프로필 정보 조회
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
          this.user = {
            email: userData.email,
            name: userData.name,
            nickname: userData.nickname,
            studentNumber: userData.studentNumber,
            major: userData.major,
            introduce: userData.introduce
          }
        } else {
          console.error(
            '유저 정보 불러오기 실패:',
            response.status,
            response.statusText
          )
        }
      } catch (error) {
        console.error('유저 정보 불러오기 오류:', error)
        // 오류 발생 시 임시 데이터를 표시
        alert('유저 정보를 불러올 수 없어 임시 데이터를 표시합니다.')
      }
    },

    // 현재 비밀번호 확인
    async verifyCurrentPassword() {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_BE_API_URL}/api/users/verify-password`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: this.currentPassword }), // 현재 비밀번호
            credentials: 'include' // 세션 포함
          }
        )
        if (response.ok) {
          alert('비밀번호가 확인되었습니다.')
          this.passwordVerified = true // 비밀번호 확인 성공
        } else {
          alert('현재 비밀번호가 올바르지 않습니다.')
          this.passwordVerified = false // 비밀번호 확인 실패
        }
      } catch (error) {
        console.error('비밀번호 확인 오류:', error)
      }
    },

    // 비밀번호 변경
    async updatePassword() {
      if (!this.passwordVerified) {
        alert('현재 비밀번호를 먼저 확인해주세요.')
        return
      }

      if (this.password !== this.confirmPassword) {
        alert('새 비밀번호가 일치하지 않습니다.')
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
            body: JSON.stringify({ password: this.password }), // 새 비밀번호
            credentials: 'include' // 세션 포함
          }
        )
        if (response.ok) {
          alert('비밀번호가 수정되었습니다.')
          this.password = ''
          this.confirmPassword = ''
          this.currentPassword = ''
          this.passwordVerified = false // 비밀번호 확인 상태 초기화
        } else {
          console.error(
            '비밀번호 수정 실패:',
            response.status,
            response.statusText
          )
        }
      } catch (error) {
        console.error('비밀번호 수정 오류:', error)
      }
    }
  },
  mounted() {
    this.fetchUser() // 컴포넌트가 마운트될 때 서버에서 유저 정보를 불러옴
  }
}
