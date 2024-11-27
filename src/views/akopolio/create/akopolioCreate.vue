<template>
  <div class="container">
    <!-- Header -->
    <MainHeader />

    <!-- Activity Name and Date -->
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

    <!-- Category Selection -->
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

    <!-- STAR Experience -->
    <div class="experience-container">
      <div class="experience-box star-box">
        <h2>경험</h2>
        <div class="star-section">
          <h3>Situation</h3>
          <textarea v-model="star.situation" placeholder="상황/배경을 작성해주세요" @input="autoResize($event)"></textarea>
        </div>

        <div class="star-section">
          <h3>Task</h3>
          <textarea v-model="star.task" placeholder="문제/과제를 작성해주세요" @input="autoResize($event)"></textarea>
        </div>

        <div class="star-section">
          <h3>Action</h3>
          <textarea v-model="star.action" placeholder="행동/생각/노력을 작성해주세요" @input="autoResize($event)"></textarea>
        </div>

        <div class="star-section">
          <h3>Result</h3>
          <textarea v-model="star.result" placeholder="결과를 작성해주세요" @input="autoResize($event)"></textarea>
        </div>
      </div>
    </div>

    <!-- PMI Section -->
    <div class="pmi-container">
      <div class="pmi-box">
        <h2>오늘의 PMI</h2>

        <div class="pmi-section">
          <h3>Plus</h3>
          <textarea v-model="pmi.plus" placeholder="오늘의 경험의 좋은 점을 작성해주세요" @input="autoResize($event)"></textarea>
        </div>

        <div class="pmi-section">
          <h3>Minus</h3>
          <textarea v-model="pmi.minus" placeholder="오늘의 경험의 나쁜 점을 작성해주세요" @input="autoResize($event)"></textarea>
        </div>

        <div class="pmi-section">
          <h3>Interesting</h3>
          <textarea v-model="pmi.interesting" placeholder="오늘의 경험에서 흥미로운 점을 작성해주세요" @input="autoResize($event)"></textarea>
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


      <input type="file" multiple @change="handleFileChange" accept="image/*" />
      <div class="image-preview-container" v-if="images.length">
        <div class="image-card" v-for="(image, index) in images" :key="index">
          <div class="image-preview-card">
            <img :src="image.previewUrl" :alt="image.name" class="image-preview" />
            <button @click="removeImage(index)" class="delete-image-btn">X</button>
          </div>
        </div>
      </div>

  </div>

    <!-- Save Button -->
    <button @click="saveData" class="save-button">저장하기</button>
    <MainFooter />
  </div>
</template>

<script src="./create.js"></script>

<style scoped>
.container {
  width: 395px;
  max-width: 500px;
  margin: 4rem auto;
  padding: 20px;  
  background-color: #ffe8d1;
  min-height: calc(100vh - 120px); /* 헤더와 푸터를 고려한 페이지 높이 조정 */
}

.header {
  text-align: center;
}

.activity-info,
.category-box,
.experience-container,
.image-upload-container,
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
  background-color: #fff3e6;
  border-radius: 5px;
  resize: none;
  font-size: 13px;
}

.image-upload-container,
.star-box,
.pmi-box {
  background-color: #fff3e6;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.activity-info{
  background-color: #fff3e6;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
}

button.active {
  background-color: #F6B87A;
  color: white;
}

/* 분야 설정 박스 */
.category-box {
  background-color: #fff3e6;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.category-label {
  display: flex; 
  align-items: center; 
}

.tag-badge {
  display: inline-block;
  margin-left: 10px;
  background-color: #F6B87A;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 13px;
}

.save-button {
  width: 100%;
  padding: 15px;
  background-color: #F6B87A;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  ;
}

.save-button:hover {
  background-color: #f4c08c;
}

h3 {
  font-size: 15px; 
  color: #FF7F00;
  margin-top: 10px;
}

h2 {
  margin: 0;
  font-size: 15px;  
}

label {
  font-size: 15px;  
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

/* 커스텀 버튼 스타일 */
.custom-file-upload {
  background-color: white; /* 배경색 */
  color: #f3ab62; /* 글자색 */
  padding: 10px 128px; /* 버튼 크기 */
  font-size: 13px; /* 글자 크기 */
  border-radius: 5px; 
  cursor: pointer; 
  margin-bottom: 10px;
  transition: background-color 0.3s ease; /* 마우스 오버 시 부드럽게 색상 변화 */
}

.custom-file-upload:hover {
  background-color: #f6e3d2; /* 마우스를 올렸을 때 배경색 변경 */
}

</style>