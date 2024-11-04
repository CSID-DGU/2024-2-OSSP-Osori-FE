<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="nickname"
      placeholder="친구 닉네임 검색"
      @input="searchFriend"
    />
    <img src="../../../assets/images/search.svg" class="search-icon">
  </div>
</template>

<script setup>
import { ref } from 'vue'

const nickname = ref('')

const searchFriend = () => {
  // 친구 검색 로직 추가
}
</script>

<style scoped>
.search-bar {
  height: 33px;
  border-radius: 10px;
  border: 1px solid #D9D9D9;
  background: #FFF;
  font-family: 'NaL';
  box-shadow: none;
  display: flex; /* 플렉스 박스를 사용하여 아이템을 가로로 정렬 */
  align-items: center;
  gap:3px;
}

.search-bar input {
  height: 32px;
  width: 90%;
  border-radius: 10px;
  background: #FFF;
  border: 1px solid #FFFFFF;
  font-family: 'NaL';
  box-shadow: none;
  padding-left: 8px;
}

.search-bar input::placeholder {
  color: #878282;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
  line-height: 32px;
}

.search-icon{
  cursor: pointer;
}

</style>
