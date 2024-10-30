// MypageScript.js

import { reactive, ref } from 'vue'

// user 객체를 reactive로 설정
export const user = reactive({
  name: '임시 실명',
  email: 'example@dgu.ac.kr',
  nickname: '임시 닉네임',
  studentNumber: '00000000',
  major: '임시 학과',
  introduce: '임시 자기소개를 입력해주세요.'
})

// 비밀번호 관련 필드를 ref로 설정
export const password = ref('')
export const confirmPassword = ref('')
export const currentPassword = ref('')
export const passwordVerified = ref(false)

// 로그아웃 함수
export async function handleLogout() {
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
      // Vue Router 사용 시 `$router.push`는 vue 인스턴스가 필요
      window.location.href = '/auth/login'
    } else {
      alert('로그아웃 실패.')
      console.error('로그아웃 실패:', response.status, response.statusText)
    }
  } catch (error) {
    alert('로그아웃 오류.')
    console.error('로그아웃 오류:', error)
  }
}

// 유저 프로필 정보 조회
export async function fetchUser() {
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
      Object.assign(user, userData) // user 객체 업데이트
    } else {
      console.error(
        '유저 정보 불러오기 실패:',
        response.status,
        response.statusText
      )
    }
  } catch (error) {
    console.error('유저 정보 불러오기 오류:', error)
    alert('유저 정보를 불러올 수 없어 임시 데이터를 표시합니다.')
  }
}

// 현재 비밀번호 확인
export async function verifyCurrentPassword() {
  try {
    const response = await fetch(
      `${process.env.VUE_APP_BE_API_URL}/api/users/verify-password`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: currentPassword.value }), // 현재 비밀번호
        credentials: 'include' // 세션 포함
      }
    )
    if (response.ok) {
      alert('비밀번호가 확인되었습니다.')
      passwordVerified.value = true // 비밀번호 확인 성공
    } else {
      alert('현재 비밀번호가 올바르지 않습니다.')
      passwordVerified.value = false // 비밀번호 확인 실패
    }
  } catch (error) {
    console.error('비밀번호 확인 오류:', error)
  }
}

// 비밀번호 변경
export async function updatePassword() {
  if (!passwordVerified.value) {
    alert('현재 비밀번호를 먼저 확인해주세요.')
    return
  }
  if (password.value !== confirmPassword.value) {
    alert('새 비밀번호가 일치하지 않습니다.')
    return
  }
  try {
    const response = await fetch(
      `${process.env.VUE_APP_BE_API_URL}/api/users/password`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.value }), // 새 비밀번호
        credentials: 'include' // 세션 포함
      }
    )
    if (response.ok) {
      alert('비밀번호가 수정되었습니다.')
      password.value = ''
      confirmPassword.value = ''
      currentPassword.value = ''
      passwordVerified.value = false // 비밀번호 확인 상태 초기화
    } else {
      console.error('비밀번호 수정 실패:', response.status, response.statusText)
    }
  } catch (error) {
    console.error('비밀번호 수정 오류:', error)
  }
}

// 유저 프로필 수정
export async function updateProfile(profileData) {
  const url = `${process.env.VUE_APP_BE_API_URL}/api/users/profile`
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profileData),
    credentials: 'include' // 세션 포함해야함
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error('프로필 수정 실패')
    }
    const data = await response.json()
    alert('프로필이 수정되었습니다.')
    Object.assign(user, profileData)
    return data
  } catch (error) {
    console.error('프로필 수정 오류:', error)
    throw error
  }
}
