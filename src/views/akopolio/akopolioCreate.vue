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
        <label for="activity-date"> <h2>활동일</h2> </label>
        <input type="date" id="activity-date" v-model="activityDate" />
      </div>
    </div>

    <!-- 분야 설정 -->
    <div class="category-box">
      <div class="category">
        <label @click="toggleDropdown" class="category-label" >
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

    <!-- 오늘의 PMI -->
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

    <!-- 저장 버튼 -->
    <button @click="saveData" class="save-button">저장하기</button>
    <MainFooter />
  </div>
</template>

<script>
import MainHeader from '../../components/layout/Header.vue'
import MainFooter from '../../components/layout/Footer.vue'

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
      selectedTags: ['기타'], // 기본으로 '기타' 선택
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
      tooltipVisible: false
    };
  },

  computed: {
    isFormComplete() {
      return (
        this.activityName &&
        this.activityDate &&
        this.selectedTags.length > 0 &&
        Object.values(this.star).every((field) => field) &&
        Object.values(this.pmi).every((field) => field)
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
    saveData() {
      if (!this.isFormComplete) {
        // 누락된 필드가 있을 경우 알림
        alert('모든 필드를 입력해주세요.');
        return;
      }

      const data = {
        activityName: this.activityName,
        activityDate: this.activityDate,
        selectedTags: this.selectedTags,
        star: this.star,
        pmi: this.pmi
      };
      console.log('저장된 데이터:', data);
      alert('활동이 저장되었습니다!');
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


</style>