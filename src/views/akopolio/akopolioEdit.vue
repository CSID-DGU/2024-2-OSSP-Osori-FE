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
      portfolioId: this.$route.params.id, // 현재 포트폴리오 ID
      activityName: '',
      activityDate: '',
      tags: [
        '전공', '교양', '교내동아리', '교외동아리', '학회', '봉사활동', '인턴', '아르바이트',
        '대외활동', '서포터즈', '기자단', '강연/행사', '스터디', '부트캠프', '프로젝트',
        '연구', '학생회', '기타'
      ],
      selectedTags: [],
      isDropdownOpen: false,
      star: { situation: '', task: '', action: '', result: '' },
      pmi: { plus: '', minus: '', interesting: '' },
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
        alert('모든 필드를 입력해주세요.');
        return;
      }

      const updatedPortfolio = {
        id: this.portfolioId,
        title: this.activityName,
        createdDate: this.activityDate,
        tags: this.selectedTags,
        star: { ...this.star },
        pmi: { ...this.pmi }
      };

      this.$store.dispatch('updatePortfolio', updatedPortfolio).then(() => {
        alert('활동이 수정되었습니다!');
        this.$router.push('/akopolio/main');
      });
    },
    loadPortfolioData() {
      const portfolio = this.$store.getters.getPortfolios.find(port => port.id === this.portfolioId);
      if (portfolio) {
        this.activityName = portfolio.title;
        this.activityDate = portfolio.createdDate;
        this.selectedTags = portfolio.tags;
        this.star = { ...portfolio.star };
        this.pmi = { ...portfolio.pmi };
      }
    }
  },
  mounted() {
    this.loadPortfolioData(); // 포트폴리오 데이터 로드
  }
};
</script>

<style scoped>
/* 스타일 정의는 기존과 동일하게 유지 */
</style>
