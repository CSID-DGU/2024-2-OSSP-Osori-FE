<template>
  <div class="akopolio-detail">
    <MainHeader />
    <div class="detail-header">
      <div class="header-content">
        <div class="action-buttons">
          <div class="edit-button" @click="editPortfolio">수정하기</div>
          <div class="delete-button" @click="handleDeletePortfolio">
            삭제하기
            <img src="@/assets/images/trash.svg" alt="Delete File" class="delete-file-icon" />
          </div>
        </div>
      </div>
    </div>

    <!-- 포트폴리오 정보 표시 -->
    <div class="activity-info">
      <div class="row activity-box">
        <h2>활동명</h2>
        <p>{{ portfolio ? portfolio.name : '' }}</p>
      </div>
    <div class="row activity-box activity-date">
      <h2>활동일</h2>
      <p>{{ portfolio ? portfolio.startDate : '' }}</p>
    </div>
      <div class="row activity-box">
        <h2>분야 설정</h2>
        <div class="tags">
          <span v-for="(tag, index) in (portfolio ? portfolio.tags : [])" :key="index" class="tag-badge">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <!-- STAR 모델 정보 표시 -->
    <div class="experience-container">
      <h2>경험 (STAR)</h2>
      <div v-if="portfolio && portfolio.experience">
        <div class="star-section">
          <h3>Situation</h3>
          <p>{{ portfolio.experience.situation || '상황 정보가 없습니다.' }}</p>
        </div>
        <div class="star-section">
          <h3>Task</h3>
          <p>{{ portfolio.experience.task || '내용이 없습니다.' }}</p>
        </div>
        <div class="star-section">
          <h3>Action</h3>
          <p>{{ portfolio.experience.action || '내용이 없습니다.' }}</p>
        </div>
        <div class="star-section">
          <h3>Result</h3>
          <p>{{ portfolio.experience.result || '내용이 없습니다.' }}</p>
        </div>
      </div>
      <div v-else>
        <p>STAR 내용이 없습니다.</p>
      </div>
    </div>

    <!-- PMI 정보 표시 -->
    <div class="pmi-container">
      <h2>오늘의 PMI</h2>
      <h3>Plus</h3>
      <p>{{ portfolio && portfolio.pmi ? portfolio.pmi.plus : '내용이 없습니다.' }}</p>
      <h3>Minus</h3>
      <p>{{ portfolio && portfolio.pmi ? portfolio.pmi.minus : '내용이 없습니다.' }}</p>
      <h3>Interesting</h3>
      <p>{{ portfolio && portfolio.pmi ? portfolio.pmi.interesting : '내용이 없습니다.' }}</p>
    </div>

    <div class="image-upload-container">
      <h2>활동 이미지</h2>
      <div class="image-preview-container" v-if="images && images.length > 0">
        <div class="image-card" v-for="(image, index) in images" :key="index">
          <div class="image-preview-card">
            <img :src="image" :alt="`Uploaded Image ${index + 1}`" class="image-preview" />
          </div>
        </div>
      </div>
    </div>

    <MainFooter />
  </div>
</template>

<script src="./detail.js"></script>

<style scoped>
.akopolio-detail {
  width: 395px;
  margin: 4rem auto;
  padding: 20px;
  background-color: #fae8da;
  min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  font-family: 'NanumSquareRound', sans-serif;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.action-buttons {
  display: flex;
  gap: 5px;
  margin-left: auto;
}

.edit-button,
.delete-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 10px;
  gap: 4px;
  background-color: white; 
}

.edit-button {
  color: black;
}

.delete-button {
  color: red;
}

.edit-button:hover,
.delete-button:hover {
  background-color: #f2eeee;
}

.image-upload-container,
.experience-container,
.pmi-container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.activity-info {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center; 
  align-items: center; 
}

.activity-box {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column; 
  gap: 10px;
  width: 100%; 
}

.row {
  display: flex;
  justify-content: flex-start; 
  align-items: center;
  gap: 10px;
  width: 100%; 
}


.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 0;
}

.tag-badge {
  display: inline-block;
  background-color: #f6b87a;
  color: black;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 13px;
  font-family: 'NanumSquareRound', sans-serif;
}

.experience-container h3,
.pmi-container h3 {
  font-size: 15px;
  color: #ff7f00;
  margin-bottom: 10px;
  margin-top: 10px;
  white-space: nowrap;
  padding: 0;
}

h3{
  font-size: 15px;
  color: #ff7f00;
  margin: 0;
  white-space: nowrap;
  padding: 0;
  font-family: 'NanumSquareRound', sans-serif;
}

h2 {
  font-size: 16px;
  color: #ff7f00;
  margin-bottom: 10px;
  padding: 0;
  font-family: 'NanumSquareRound', sans-serif;
}

p {
  margin:0;
  font-size: 14px;
  word-break: break-word;
  padding: 0;
  font-family: 'NanumSquareRound', sans-serif;
}

.experience-container p,
.pmi-container p {
  margin-bottom: 15px;
}

.image-preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
}

.image-preview-card {
  width: 100%;
  max-width: 312px;
  position: relative;
  overflow: hidden;
}

.image-preview {
  width: 100%;
  height: 100%;
  object-fit: contain; 
}
</style>
