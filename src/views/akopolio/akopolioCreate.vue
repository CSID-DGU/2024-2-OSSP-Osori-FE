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
        <h2>오늘의 PMI 
          <span 
            class="tooltip-icon" 
            @mouseover="tooltipVisible = true" 
            @mouseleave="tooltipVisible = false"
          >ℹ️</span>
          
          <div v-if="tooltipVisible" class="tooltip">
            어느 사항에 대하여 좋은 점, 나쁜 점, 흥미로운 점을 찾아내는 사고기법
          </div>
        </h2>

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

<script>
import axios from 'axios';
import MainHeader from '../../components/layout/Header.vue';
import MainFooter from '../../components/layout/Footer.vue';

export default {
  components: {
    MainHeader,
    MainFooter
  },
  data() {
    return {
      activityName: '',
      activityDate: '',
      tags: [
        '전공', '교양', '교내동아리', '교외동아리', '학회', '봉사활동', '인턴', '아르바이트',
        '대외활동', '서포터즈', '기자단', '강연/행사', '스터디', '부트캠프', '프로젝트',
        '연구', '학생회', '기타'
      ],
      selectedTags: ['기타'],
      isDropdownOpen: false,
      star: {
        situation: '',
        task: '',
        action: '',
        result: ''
      },
      pmi: {
        plus: '',
        minus: '',
        interesting: ''
      },
      tooltipVisible: false,
      images: [], // 선택된 이미지 파일 배열
      uploadedImageUrls: [] // 업로드된 이미지의 URL 저장
    };
  },
  computed: {
    isFormComplete() {
      return (
        this.activityName &&
        this.activityDate &&
        this.selectedTags.length > 0 &&
        Object.values(this.star).every(field => field) &&
        Object.values(this.pmi).every(field => field)
      );
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleTag(tag) {
      const index = this.selectedTags.indexOf(tag);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
    },
    autoResize(event) {
      const textarea = event.target;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    },
    handleFileChange(event) {
  const selectedFiles = Array.from(event.target.files);

  // 파일 수 제한
  if (this.images.length + selectedFiles.length > 5) {
    alert('최대 5개의 이미지만 업로드할 수 있습니다.');
    return;
  }

  // 새로 선택된 파일들에 대해 미리보기 URL 생성
  const newImages = selectedFiles.map(file => ({
    file,
    name: file.name,
    size: file.size,
    previewUrl: URL.createObjectURL(file) // 미리보기 URL 생성
  }));


  // 중복된 이미지가 아닌 경우만 추가
  const uniqueNewImages = newImages.filter(newImage => 
    !this.images.some(existingImage => existingImage.previewUrl === newImage.previewUrl)
  );

  if (uniqueNewImages.length === 0) {
    alert('이미 선택된 이미지입니다.');
    return;
  }

  // 새로운 이미지를 기존 배열에 추가
  this.images = [...this.images, ...uniqueNewImages];
},
      removeImage(index) {
        // 이미지 삭제 시 미리보기 URL 해제
        URL.revokeObjectURL(this.images[index].previewUrl);
        this.images.splice(index, 1);
      },
    async uploadImages() {
      const uploadedUrls = [];
      
      for (const image of this.images) {
        try {
          // 1. 프리사인드 URL 요청
          /*
          const { data } = await axios.post('/api/get-presigned-url', {
            fileName: image.name,
            fileType: image.type
          });
          */

          // 2. 프리사인드 URL을 이용해 이미지 업로드
          /*
          await axios.put(data.url, image, {
            headers: { 'Content-Type': image.type }
          });
          */

          // 3. 업로드된 이미지의 URL을 저장 (프리사인드 URL에서 파일 URL을 추출)
          /*
          const uploadedUrl = data.url.split('?')[0];
          uploadedUrls.push(uploadedUrl);
          */
          
          console.log('Image ready to upload:', image.name);
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('이미지 업로드 중 오류가 발생했습니다.');
        }
      }
      
      this.uploadedImageUrls = uploadedUrls;
    },
    async saveData() {
      if (!this.isFormComplete) {
        alert('모든 필드를 입력해주세요.');
        return;
      }
      // 이미지가 선택된 경우 업로드 진행
      if (this.images.length > 0) {
        await this.uploadImages();
      }

      // 백엔드 연동을 위한 데이터 객체
      const newPortfolio = {
        title: this.activityName,
        createdDate: this.activityDate,
        tags: this.selectedTags,
        star: { ...this.star },
        pmi: { ...this.pmi },
        images: this.uploadedImageUrls // 업로드된 이미지 URL을 포함
      };

      try {
        // 이 부분에서 실제 백엔드로 데이터를 전송할 예정
        // await axios.post('/api/portfolios', newPortfolio);

        // 현재는 백엔드 연동 부분을 주석 처리해두었으므로, 임시 메시지만 표시
        console.log('저장할 데이터:', newPortfolio); // 콘솔에 데이터 확인
        alert('(테스트) 활동이 저장되었습니다!'); // 임시 알림 메시지

        // 실제 백엔드와 연동 시, 저장 후 리디렉션 설정
        // this.$router.push('/akopolio/main'); 

        this.resetForm(); // 데이터 저장 후 입력 폼 초기화
      } catch (error) {
        console.error('Error saving portfolio:', error);
        alert('저장 중 오류가 발생했습니다.');
      }
    },
    resetForm() {
      this.activityName = '';
      this.activityDate = '';
      this.selectedTags = ['기타'];
      this.star = { situation: '', task: '', action: '', result: '' };
      this.pmi = { plus: '', minus: '', interesting: '' };
      this.images = [];
      this.uploadedImageUrls = [];
    }
  }
};
</script>

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

.tooltip {
  position: absolute;
  background-color: rgba(51, 51, 51, 0.9);
  color: white;
  padding: 8px;
  border-radius: 5px;
  z-index: 1000; 
  white-space: nowrap; 
}

.image-preview-container {
  display: flex;
  gap: 10px;
  margin-top: 15px;
  flex-wrap: wrap;
}

.image-preview-card {
  position: relative;
  width: 300px; /* 최대 너비 조정 */
  height: 300px; /* 최대 높이 조정 */
  border-color: transparent; 
  border-radius: 5px;
  overflow: hidden;
}

.image-preview {
  max-width: 300px; /* 원하는 최대 너비 */
  max-height: 300px; /* 원하는 최대 높이 */
  object-fit: contain; /* 이미지 비율 유지하며 잘리지 않게 표시 */
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
  transition: background-color 0.3s ease; /* 마우스 오버 시 부드럽게 색상 변화 */
}

.custom-file-upload:hover {
  background-color: #f6e3d2; /* 마우스를 올렸을 때 배경색 변경 */
}

</style>