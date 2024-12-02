<template>
  <div class="friend-goal">
    <div class="goal-content">
      <span class="friendName">{{ friendNickname }}</span> 
      <span class="friendContent">{{ friendGoalContent }}</span>
      <button class="btn" @click="toggleCommentSection"><img src='../../../assets/images/comment.svg'></button>
    </div>

    <CommentInput v-if="showCommentSection" />
    <CommentList v-if="showCommentSection" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CommentInput from './CommentInput.vue'
import CommentList from './CommentList.vue'

const friendNickname = ref('토니')
const friendGoalContent = ref('이따 상록원에서 밥먹을사람있나요? 같이 먹어요')
const showCommentSection = ref(false)

const toggleCommentSection = () => {
  showCommentSection.value = !showCommentSection.value
}
</script>

<style scoped>
.friend-goal {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  border-radius: 10px;
  background: #FFF;
  height: 100%;
}

.goal-content {
  display: flex;
  width: 100%;
}

.friendName {
  border-radius: 10px 0px 0px 10px;
  background: #FF7F00;
  color: #FFF;
  text-align: center;
  font-family: 'NaB';
  font-size: 11px;
  width: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  word-wrap: break-word;
}


.friendContent{
  margin-left: 10px;
  margin-right: 5px;
  padding: 5px 0px;
  color: #000;
  width:70%;
  font-family: 'NaL';
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}

.btn button:hover {
  background: none;
  outline: none;
}
</style>
