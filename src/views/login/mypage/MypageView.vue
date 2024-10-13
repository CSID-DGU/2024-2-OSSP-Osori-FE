<template>
  <div class="mypage-container">
    <h1>{{ user.nickname }}님의 마이페이지</h1>
    <button class="logout-button" @click="handleLogout">로그아웃</button>

    <section class="intro-section">
      <h2>자기소개</h2>
      <p class="introduce-text">{{ user.introduce }}</p>
      <button class="edit-button" @click="editIntroduce">수정하기</button>
    </section>

    <section class="profile-section">
      <h2>개인정보 수정</h2>
      <div class="form-group">
        <label> 실명: </label>
        <input type="text" v-model="user.name" />
      </div>
      <div class="form-group">
        <label> 이메일: </label>
        <input type="email" v-model="user.email" />
      </div>
      <div class="form-group">
        <label> 비밀번호: </label>
        <input type="password" v-model="password" />
      </div>
      <div class="form-group">
        <label> 비밀번호 확인: </label>
        <input type="password" v-model="confirmPassword" />
      </div>
      <button class="save-button" @click="updatePassword">비밀번호 수정</button>

      <div class="form-group">
        <label> 닉네임: </label>
        <input type="text" v-model="user.nickname" />
      </div>
      <div class="form-group">
        <label> 학번: </label>
        <input type="text" v-model="user.studentNumber" />
      </div>
      <div class="form-group">
        <label> 학과: </label>
        <input type="text" v-model="user.major" />
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
