<template>
  <div class="pagination">
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
      &lt;
    </button>

    <!-- 페이지 번호 표시 -->
    <button 
      v-for="page in visiblePages" 
      :key="page" 
      @click="changePage(page)"
      :class="{ 'active': page === currentPage }">
      {{ page }}
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
      const maxVisible = 5; // 최대 표시할 페이지 수
      let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
      let endPage = Math.min(this.totalPages, startPage + maxVisible - 1);

      // 끝 페이지가 부족할 때 시작 페이지 조정
      if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
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

button.active{
  font-weight: bold;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>