<template>
  <div>
    <h2>프로필</h2>
    <div v-if="profile">
      <p>이름: {{ profile.name }}</p>
      <p>이메일: {{ profile.email }}</p>
    </div>
    <div v-if="message">{{ message }}</div>
    <button @click="logout">로그아웃</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      profile: null,
      message: ''
    }
  },
  async created() {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/users/profile',
        { withCredentials: true }
      )
      this.profile = response.data
    } catch (error) {
      this.message = '프로필 조회 실패: ' + error.response.data
    }
  },
  methods: {
    async logout() {
      try {
        await axios.post(
          'http://localhost:8080/api/users/logout',
          {},
          { withCredentials: true }
        )
        this.$router.push('/login') // 로그아웃 후 로그인 페이지로 이동
      } catch (error) {
        this.message = '로그아웃 실패: ' + error.response.data
      }
    }
  }
}
</script>
