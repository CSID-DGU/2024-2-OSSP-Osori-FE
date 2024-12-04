<template>
  <div class="pagination">
    <div 
      class="page-item" 
      @click="changePage(currentPage - 1)" 
      :class="{ disabled: currentPage === 1 }">
      &lt;
    </div>

    <div 
      class="page-item" 
      v-for="page in visiblePages" 
      :key="page" 
      @click="changePage(page)" 
      :class="{ active: page === currentPage }">
      {{ page }}
    </div>

    <div 
      class="page-item" 
      @click="changePage(currentPage + 1)" 
      :class="{ disabled: currentPage === totalPages }">
      &gt;
    </div>
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
      const maxVisible = 5; 
      let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
      let endPage = Math.min(this.totalPages, startPage + maxVisible - 1);

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

.page-item {
  margin: 0 5px;
  padding: 5px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}

.page-item.active {
  font-weight: bold;
}

.page-item.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.page-item:not(.disabled):hover {
  background-color: none;
}

</style>
