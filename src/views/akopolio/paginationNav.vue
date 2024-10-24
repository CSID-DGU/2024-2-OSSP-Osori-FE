<template>
    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
        &lt;
      </button>
  
      <button 
        v-for="page in totalPages" 
        :key="page" 
        @click="changePage(page)"
        :class="{'active': page === currentPage}">
        <strong v-if="page === currentPage">{{ page }}</strong>
        <span v-else>{{ page }}</span>
      </button>
  
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
        &gt;
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: Number,
      totalPages: Number,
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
    padding: 5px 10px;
    border: 1px solid #ddd;
    background-color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button.active strong {
    font-weight: bold;
  }
  
  button:hover:not(.active) {
    background-color: #f0f0f0;
  }
  
  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  </style>
  