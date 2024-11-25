<template>
  <div class="akopolio-detail">
    <MainHeader />
    <div class="detail-header">
      <div class="header-content">
        <div class="action-buttons">
          <button class="edit-button" @click="editPortfolio">수정하기</button>
          <button class="delete-button" @click="handleDeletePortfolio">삭제하기</button>
        </div>
      </div>
    </div>

    <!-- 포트폴리오 정보 표시 -->
    <div class="activity-info">
      <div class="row">
        <h3>활동명</h3>
        <p>{{ portfolio ? portfolio.title : '' }}</p>
      </div>
      <div class="row">
        <h3>활동일</h3>
        <p>{{ portfolio ? portfolio.createdDate : '' }}</p>
      </div>
      <div class="row">
        <h3>분야 설정</h3>
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
      <div v-if="portfolio && portfolio.star">
        <div class="star-section">
          <h3>Situation</h3>
          <p>{{ portfolio.star.situation || '상황 정보가 없습니다.' }}</p>
        </div>
        <div class="star-section">
          <h3>Task</h3>
          <p>{{ portfolio.star.task || '내용이 없습니다.' }}</p>
        </div>
        <div class="star-section">
          <h3>Action</h3>
          <p>{{ portfolio.star.action || '내용이 없습니다.' }}</p>
        </div>
        <div class="star-section">
          <h3>Result</h3>
          <p>{{ portfolio.star.result || '내용이 없습니다.' }}</p>
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

    <div class="image-preview-container" v-if="images.length">
      <h2>활동 이미지</h2>
      <div class="image-card" v-for="(image, index) in images" :key="index">
        <div class="image-preview-card">
          <img :src="image.presignedUrl" :alt="'Image ' + (index + 1)" class="image-preview" />
        </div>
      </div>
    </div>

    <MainFooter />
  </div>
</template>

<script src="./detail.js"></script>

<style scoped>
.akopolio-detail {
  width: 375px;
  margin: 4rem auto;
  padding: 20px;
  background-color: #ffe8d1;
  min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
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
  gap: 10px;
  margin-left: auto;
}

.edit-button,
.delete-button {
  padding: 6px 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 11px;
}

.edit-button {
  background-color: #f6b87a;
  color: white;
}

.delete-button {
  background-color: #ff4d4d;
  color: white;
}

.experience-container,
.pmi-container,
.image-preview-container {
  background-color: #fff3e6;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.activity-info {
  background-color: #fff3e6;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag-badge {
  background-color: #f6b87a;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 13px;
}

h3 {
  font-size: 15px;
  color: #ff7f00;
  margin: 0;
  white-space: nowrap;
}

h2 {
  font-size: 15px;
  color: #ff7f00;
  margin-bottom: 10px;
}

p {
  margin: 5px 0;
  font-size: 14px;
  word-break: break-word;
}

.image-preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  margin-bottom: 20px;
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
