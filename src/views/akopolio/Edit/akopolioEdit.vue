<template>
  <div class="container">
    <!-- 헤더 -->
    <MainHeader />
    <div class="back-button" @click="goBack">
      <img src="@/assets/images/back.svg" alt="Back" class="arrow-left-icon" />
    </div>

    <!-- 활동명과 활동일 -->
    <div class="activity-info">
      <div class="activity-name-container">
        <label for="activity-name"><h2>활동명</h2></label>
        <input type="text" id="activity-name" v-model="activityName" placeholder="활동명을 입력해주세요" />
      </div>

      <div class="activity-date-container">
        <label for="activity-date"><h2>활동일</h2></label>
        <input type="date" id="activity-date" v-model="activityDate" />
      </div>
    </div>

    <!-- 분야 설정 -->
    <div class="category-box">
      <div class="category">
        <label @click="toggleDropdown" class="category-label">
          <h2>분야 설정</h2>
          <span v-if="selectedTags.length">
            <span class="tag-badge" v-for="tag in selectedTags" :key="tag">
              #{{ tag }}
            </span>
          </span>
          <img 
            :src="require('@/assets/images/downarr.svg')" 
            alt="down arrow"
            class="dropdown-arrow"
          />
        </label>

        <div v-show="isDropdownOpen" class="tag-container">
          <div
              v-for="tag in tags"
              :key="tag"
              @click="toggleTag(tag)"
              :class="{ active: selectedTags.includes(tag) }"
              class="tag-item"
            >
              #{{ tag }}
            </div>
        </div>
      </div>
    </div>

    <!-- 경험 (STAR 모델) -->
    <div class="experience-container">
      <div class="experience-box star-box">
        <h2>경험</h2>
        <div class="star-section" v-for="section in Object.keys(star)" :key="section">
          <h3>{{ section.charAt(0).toUpperCase() + section.slice(1) }}</h3>
          <textarea v-model="star[section]" :placeholder="`${section}를 작성해주세요`" @input="autoResize($event)"></textarea>
        </div>
      </div>
    </div>

    <!-- 오늘의 PMI -->
    <div class="pmi-container">
      <div class="pmi-box">
        <h2>오늘의 PMI</h2>

        <div class="pmi-section" v-for="section in Object.keys(pmi)" :key="section">
          <h3>{{ section.charAt(0).toUpperCase() + section.slice(1) }}</h3>
          <textarea v-model="pmi[section]" :placeholder="`${section}를 작성해주세요`" @input="autoResize($event)"></textarea>
        </div>
      </div>
    </div>

    <div class="image-upload-container">
      <div class="image-upload-title">
        <h2>활동 관련 이미지</h2>
        <h3>최대 5장까지 가능해요!&nbsp;&nbsp;<span>{{ images.length }} / 5</span></h3>
      </div>

      <input type="file" multiple @change="handleFileChange" accept="image/*" />
      <div class="image-preview-container" v-if="images.length">
        <div class="image-card" v-for="(image, index) in images" :key="index">
          <div class="image-preview-card">
            <img :src="image.previewUrl" :alt="image.name" class="image-preview" />
            <div @click="removeImage(index)" class="delete-image-btn">X</div>
          </div>
        </div>
      </div>
    </div>
      <label for="file-upload" class="custom-file-upload">
        <img src="@/assets/images/imgup.svg" alt="Upload" class="upload-icon" />
      </label>
      <input type="file" id="file-upload" multiple @change="handleFileChange" accept="image/*" />
    
    <div class="button-container">
      <div @click="() => saveData(activityId)" class="save-button">
        저장하기
      </div>
    </div>
      <MainFooter />
   </div> 
</template>

<script src="./edit.js"></script>

<style scoped>
.container {
  min-height: 110vh;
  max-width: 395px;
  width: 100%; 
  margin: 4rem auto;
  padding: 20px;
  background-color: #fae8da;
  position: relative;
  justify-content: space-between; 
  font-family: 'NanumSquareRound', sans-serif;
}

.header {
  text-align: center;
}

.category-box,
.experience-container,
.pmi-container {
  margin-bottom: 20px;
}

input[type="text"],
input[type="date"] {
  all: initial;
  width: 70%;
  font-family: 'NanumSquareRound', sans-serif;
  padding: 10px;
  background-color: white;
  border: transparent;
  resize: none;
  font-size: 13px;
}

textarea {
  width: 100%;
  padding: 10px;
  background-color: white;
  border: transparent;
  resize: none;
  font-size: 13px;
}

textarea:focus {
  outline: none; 
}

.star-box,
.pmi-box {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
}

.activity-name-container, 
.activity-date-container {
  background-color: white;
  padding: 20px;
  padding-top: 10px;
  padding-bottom: 8px;
  border-radius: 8px;
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between; 
  align-items: center; 
}

.tag-container {
  display: flex;
  flex-wrap: wrap; 
  margin-top: 10px;
  font-size: 11px;
  font-weight: 100;
}

.tag-item {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 40px;
  background-color: white;
  transition: background-color 0.3s;
  border: 1px solid #eec092;
  cursor: pointer;
  margin: 2px;
  font-size: 10px;
  font-weight: lighter;
  font-family: sans-serif;
}

.tag-item.active {
  background-color: #f6b87a;
}

.tag-item:hover {
  background-color: #f6b87a; 
  cursor: pointer;
}

/* 분야 설정 박스 */
.category-box {
  background-color: white;
  padding: 15px;
  border-radius: 10px;
}

.category-label {
  display: flex; 
  align-items: center; 
}

.tag-badge {
  display: inline-block;
  margin-left: 10px;
  background-color: #f6b87a;
  color: black;
  padding: 4px 8px;
  border-radius: 20px;
  margin-top: 2px;
  font-size: 10px;
  font-weight: lighter;
  font-family: sans-serif;
}

.dropdown-arrow {
  width: 16px; 
  height: auto;
  margin-left: auto; 
  margin-right: 13px;
}

.button-container {
  display: flex;
  justify-content: center;       
}

.save-button {
  width: 160px;
  margin-top: 50px;
  padding-left: 16px;  
  padding-right: 16px; 
  padding-top: 8px;    
  padding-bottom: 8px; 
  background-color: #F6B87A;
  color: black;
  font-size: 0.875rem;  
  font-weight: 500;  
  border-radius: 9999px; 
  text-align: center;
  transition: background-color 0.3s ease;
  margin-bottom: 20px;
}

.save-button:hover {
  background-color: #e5a769;
  cursor: pointer;
}

h3 {
  font-size: 15px; 
  color: #FF7F00;
  margin-top: 10px;
  font-family: 'NanumSquareRound', sans-serif;
}

h2 {
  margin: 0;
  color: #FF7F00;
  font-size: 17px;  
  font-family: 'NanumSquareRound', sans-serif;
}

label {
  font-size: 15px;  
  font-family: 'NanumSquareRound', sans-serif;
}

.image-preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 8px;
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
  object-fit: contain; /* 이미지가 컨테이너 내에서 비율을 유지하면서 크기 조정 */
}

.delete-image-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  color: black;
  border: none;
  background: none; /* 배경색 제거 */
  font-size: 16px; /* X 아이콘이 더 잘 보이도록 크기 조정 */
  cursor: pointer;
  transition: color 0.3s; /* 색상 전환 애니메이션 추가 */
}


.delete-image-btn:hover {
  color: white; 
}

/* 기본 input[type="file"] 숨기기 */
input[type="file"] {
  display: none;
}

.image-upload-title{
  background-color: white;
  padding-left: 20px;
  padding-top: 12px;
  padding-bottom: 5px;
  border-radius: 10px;
  margin-bottom: 8px;
  margin-top: 40px;
}

.custom-file-upload {
  background-color: white;
  padding: 60px;
  border-radius: 10px;
  width: 100%;
  display: flex;           
  justify-content: center; 
  align-items: center;  
  cursor: pointer;
}

.upload-icon {
  width: 40px;       
  height: auto;         
}

.arrow-left-icon {
  cursor: pointer;
  margin-bottom: 20px;
}


</style>