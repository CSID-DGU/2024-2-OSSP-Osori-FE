<template>
    <div class="akopolio-edit">
      <MainHeader />
      <div class="edit-container">
        <h2>포트폴리오 수정하기</h2>
        <form @submit.prevent="savePortfolio">
          <div class="form-group">
            <label for="title">활동명</label>
            <input
              type="text"
              id="title"
              v-model="portfolio.title"
              required
            />
          </div>
  
          <div class="form-group">
            <label for="createdDate">활동일</label>
            <input
              type="date"
              id="createdDate"
              v-model="portfolio.createdDate"
              required
            />
          </div>
  
          <div class="form-group">
            <label for="tags">분야 설정</label>
            <input
              type="text"
              id="tags"
              v-model="newTag"
              placeholder="태그 입력 후 추가 버튼을 눌러주세요"
            />
            <button type="button" @click="addTag">추가</button>
            <div class="tags">
              <span v-for="(tag, index) in portfolio.tags" :key="index" class="tag-badge">
                {{ tag }}
                <button type="button" @click="removeTag(index)">x</button>
              </span>
            </div>
          </div>
  
          <div class="form-group">
            <label>경험 (STAR)</label>
            <div class="star-section">
              <label>Situation</label>
              <textarea v-model="portfolio.star.situation" />
            </div>
            <div class="star-section">
              <label>Task</label>
              <textarea v-model="portfolio.star.task" />
            </div>
            <div class="star-section">
              <label>Action</label>
              <textarea v-model="portfolio.star.action" />
            </div>
            <div class="star-section">
              <label>Result</label>
              <textarea v-model="portfolio.star.result" />
            </div>
          </div>
  
          <div class="form-group">
            <label>오늘의 PMI</label>
            <label>Plus</label>
            <textarea v-model="portfolio.pmi.plus" />
            <label>Minus</label>
            <textarea v-model="portfolio.pmi.minus" />
            <label>Interesting</label>
            <textarea v-model="portfolio.pmi.interesting" />
          </div>
  
          <button type="submit" class="save-button">저장하기</button>
        </form>
      </div>
      <MainFooter />
    </div>
  </template>
  
  <script>
  import MainHeader from '../../components/layout/Header.vue';
  import MainFooter from '../../components/layout/Footer.vue';
  import { mapGetters } from 'vuex';
  
  export default {
    components: {
      MainHeader,
      MainFooter,
    },
    data() {
      return {
        portfolio: {
          title: '',
          createdDate: '',
          tags: [],
          star: { situation: '', task: '', action: '', result: '' },
          pmi: { plus: '', minus: '', interesting: '' },
        },
        newTag: '',
      };
    },
    computed: {
      ...mapGetters(['getPortfolios']),
    },
    created() {
      const portfolioId = this.$route.params.id;
      const existingPortfolio = this.getPortfolios.find((item) => item.id === portfolioId);
      if (existingPortfolio) {
        this.portfolio = JSON.parse(JSON.stringify(existingPortfolio));
      }
    },
    methods: {
      addTag() {
        if (this.newTag && !this.portfolio.tags.includes(this.newTag)) {
          this.portfolio.tags.push(this.newTag);
          this.newTag = '';
        }
      },
      removeTag(index) {
        this.portfolio.tags.splice(index, 1);
      },
      savePortfolio() {
        this.$store
          .dispatch('updatePortfolio', this.portfolio)
          .then(() => {
            alert('포트폴리오가 저장되었습니다.');
            this.$router.push('/akopolio/main');
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .akopolio-edit {
    width: 375px;
    margin: 4rem auto;
    padding: 20px;
    background-color: #ffe8d1;
    min-height: calc(100vh - 120px);
    display: flex;
    flex-direction: column;
  }
  
  .edit-container {
    background-color: #fff3e6;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    font-size: 16px;
    color: #ff7f00;
    margin-bottom: 5px;
    display: block;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
  }
  
  .save-button {
    background-color: #f6b87a;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 10px;
  }
  
  .tag-badge {
    background-color: #f6b87a;
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 13px;
    display: flex;
    align-items: center;
  }
  
  .tag-badge button {
    margin-left: 5px;
    background: none;
    border: none;
    color: white;
    font-size: 12px;
    cursor: pointer;
  }
  </style>
  