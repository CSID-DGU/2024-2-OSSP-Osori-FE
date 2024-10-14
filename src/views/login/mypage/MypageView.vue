<template>
  <div class="mypage-container">
    <h1>{{ user.nickname }}님의 마이페이지</h1>
    <button class="logout-button" @click="handleLogout">로그아웃</button>

    <section class="intro-section">
      <h2>자기소개</h2>
      <p class="introduce-text">
        {{ user.introduce || '자기소개를 입력하세요.' }}
      </p>
      <button class="edit-button" @click="editIntroduce">수정하기</button>
    </section>

    <section class="profile-section">
      <h2>개인정보</h2>

      <!-- 실명과 이메일은 읽기 전용으로 표시 -->
      <div class="form-group">
        <label>실명: </label>
        <input type="text" v-model="user.name" readonly />
      </div>

      <div class="form-group">
        <label>이메일: </label>
        <input type="email" v-model="user.email" readonly />
      </div>
      <!-- 닉네임 수정 -->
      <div class="form-group">
        <label>닉네임: </label>
        <input
          type="text"
          v-model="user.nickname"
          placeholder="닉네임을 입력하세요"
        />
      </div>

      <!-- 현재 비밀번호 확인 -->
      <div class="form-group">
        <label>현재 비밀번호 확인: </label>
        <input
          type="password"
          v-model="currentPassword"
          placeholder="현재 비밀번호를 입력하세요"
        />
      </div>
      <button class="save-button" @click="verifyCurrentPassword">
        비밀번호 확인하기
      </button>

      <!-- 새 비밀번호 입력 -->
      <div class="form-group">
        <label>새 비밀번호: </label>
        <input
          type="password"
          v-model="password"
          placeholder="새 비밀번호를 입력하세요"
        />
      </div>
      <div class="form-group">
        <label>새 비밀번호 확인: </label>
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="새 비밀번호를 다시 입력하세요"
        />
      </div>
      <button class="save-button" @click="updatePassword">비밀번호 수정</button>

      <!-- 학번 및 학과 수정 -->
      <div class="form-group">
        <label>학번: </label>
        <input
          type="text"
          v-model="user.studentNumber"
          placeholder="학번을 입력하세요"
        />
      </div>
      <div class="form-group">
        <label>학과: </label>
        <input
          type="text"
          v-model="user.major"
          placeholder="학과를 입력하세요"
        />
      </div>
      <button class="save-button" @click="updateProfile">수정하기</button>
    </section>
  </div>
</template>

<script src="./MypageScript.js"></script>

<style scoped>
.mypage-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
}

.logout-button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 10px auto;
  width: 150px;
  text-align: center;
}

.logout-button:hover {
  background-color: #ff7875;
}

.intro-section,
.profile-section {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

h2 {
  color: #666;
  margin-bottom: 15px;
  font-size: 20px;
}

.introduce-text {
  font-style: italic;
  color: #555;
  margin-bottom: 10px;
}

.edit-button {
  background-color: #40a9ff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #69c0ff;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.save-button {
  background-color: #52c41a;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.save-button:hover {
  background-color: #73d13d;
}
</style>
