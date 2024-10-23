<template>
    <div>
      <label for="startDate">시작 날짜:</label>
      <input type="date" v-model="startDate" id="startDate" />
      
      <label for="endDate">마지막 날짜:</label>
      <input type="date" v-model="endDate" id="endDate" />
      
      <button @click="applyDateFilter">적용</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SelectCalendar',
    data() {
      return {
        startDate: null,
        endDate: null,
      };
    },
    methods: {
      applyDateFilter() {
        this.$emit('dateSelected', { startDate: this.startDate, endDate: this.endDate });
      },
    },
  };
  </script>
  
  <style scoped>
  /* 스타일 추가 필요 시 여기에 작성 */
  </style>
  