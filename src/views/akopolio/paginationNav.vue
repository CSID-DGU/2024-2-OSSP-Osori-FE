<template>
  <div class="pagination">
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
      &lt;
    </button>

    <!-- 1부터 5까지의 페이지 버튼 표시 -->
    <button 
      v-for="page in visiblePages" 
      :key="page" 
      @click="changePage(page)"
      :class="{ 'active': page === currentPage }">
      <span :class="{ 'selected': page === currentPage }">{{ page }}</span>
    </button>

    <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
      &gt;
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: { type: Number, required: true },
    totalPages: { type: Number, required: true },
  },
  computed: {
    visiblePages() {
      const pages = [];
      const startPage = Math.max(1, this.currentPage - 2); // 현재 페이지의 두 페이지 앞부터
      const endPage = Math.min(this.totalPages, startPage + 4); // 시작 페이지에서 5개까지

      // 현재 페이지가 1인 경우
      if (this.currentPage === 1) {
        for (let i = 1; i <= Math.min(5, this.totalPages); i++) {
          pages.push(i);
        }
      } else {
        for (let i = startPage; i <= endPage; i++) {
          if (i <= this.totalPages) {
            pages.push(i);
          }
        }
      }
      
      return pages;
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('change-page', page);
      }
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

button {
  margin: 0 5px;
  padding: 5px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 16px;
}

button.active .selected {
  font-weight: bold;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>