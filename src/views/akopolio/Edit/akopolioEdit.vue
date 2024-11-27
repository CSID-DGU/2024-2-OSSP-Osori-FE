<template>
  <div class="container">
    <!-- 헤더 -->
    <MainHeader />

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
              {{ tag }}
            </span>
          </span>
        </label>

        <div v-show="isDropdownOpen" class="tag-container">
          <button
            v-for="tag in tags"
            :key="tag"
            @click="toggleTag(tag)"
            :class="{ active: selectedTags.includes(tag) }"
          >
            {{ tag }}
          </button>
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
      <h2>활동 이미지 업로드</h2>
      <h3>최대 5장까지 가능해요!&nbsp;&nbsp;<span>{{ images.length }} / 5</span></h3>
      <label for="file-upload" class="custom-file-upload">
        <i class="fas fa-upload"></i> 파일 선택
      </label>
      <input type="file" id="file-upload" multiple @change="handleFileChange" accept="image/*" />

      <div class="image-preview-container" v-if="images.length">
        <div class="image-card" v-for="(image, index) in images" :key="index">
          <div class="image-preview-card">
            <img :src="image.previewUrl" :alt="`Uploaded Image ${index + 1}`" class="image-preview" />
            <button @click="removeImage(index)" class="delete-image-btn">X</button>
          </div>
        </div>
      </div>
    </div>

    <div class="button-container">
        <button @click="saveData" class="save-button">저장하기</button>
      </div>
      <MainFooter />
   </div> 
</template>

<script src="./edit.js"></script>

<style scoped>
@import '../../../assets/fonts/fonts.css';
.container {
  width: 395px;
  max-width: 500px;
  margin: 4rem auto;
  padding: 20px;  
  background-color: #fae8da;
  min-height: calc(100vh - 120px); /* 헤더와 푸터를 고려한 페이지 높이 조정 */
}

.header {
  text-align: center;
}

.image-upload-container,
.activity-info,
.category-box,
.experience-container,
.pmi-container {
  margin-bottom: 20px;
}

.activity-name-container {
  margin-bottom: 20px; 

}


input[type="text"],
input[type="date"],
textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  background-color: white;
  border-radius: 5px;
  resize: none;
  font-size: 13px;
}

.image-upload-container,
.star-box,
.pmi-box {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
}

.activity-info{
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  font-size: 12px;
}

button {
  display: inline-block;
  margin: 3px;
  padding: 8px;
  border-radius: 40px;
  background-color: white;
  transition: background-color 0.3s;
  border: 1px solid #eec092;
}

button.active {
  background-color: #f6b87a;
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
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 13px;
}

.button-container {
  display: flex;
  justify-content: center;       
}

.save-button {
  width: 160px;
  margin-top: 20px;
  padding-left: 16px;  
  padding-right: 16px; 
  padding-top: 8px;    
  padding-bottom: 8px; 
  background-color: #F6B87A;
  color: black;
  font-size: 0.875rem;  
  font-weight: 500;  
  border-radius: 9999px; 
  transition: background-color 0.3s ease;
  margin-bottom: 20px;
}

.save-button:hover {
  background-color: #e5a769;
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

}

h2 {
  font-size: 16px;
  color: #ff7f00;
  margin-bottom: 10px;
  padding: 0;
}

.category-box h2{
  margin: 0;
}

p {
  margin:0;
  font-size: 14px;
  word-break: break-word;
  padding: 0;
}

.experience-container p,
.pmi-container p {
  margin-bottom: 15px;
}


label {
  font-size: 15px;  
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
  object-fit: contain; /* 이미지가 컨테이너 내에서 비율을 유지하면서 크기 조정 */
}

/* 기본 input[type="file"] 숨기기 */
input[type="file"] {
  display: none;
}

/* 커스텀 버튼 스타일 */
.custom-file-upload {
  background-color: #faf5f0; 
  color: #f3ab62;
  padding: 10px 128px; 
  font-size: 13px;
  border-radius: 5px; 
  cursor: pointer; 
  margin-top: 10px;
  transition: background-color 0.3s ease; 
  margin-bottom: 10px;
}

.custom-file-upload:hover {
  background-color: #f5eadf; 
}


</style>

