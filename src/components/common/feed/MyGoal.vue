<template>
  <div class="my-goal">
    <div class="goal-content">
      <span class="name">{{ nickname }}</span> 
      <span class="content"> {{ goalContent }}</span>
      <div class="goal-icons">
        <button @click="toggleCommentSection"><img src='../../../assets/images/comment.svg'></button>
        <div class='line'></div>
        <button @click="editGoal"><img src='../../../assets/images/write.svg'></button>
        <div class='line'></div>
        <button @click="deleteGoal"><img src='../../../assets/images/delete.svg'></button>
      </div>
    </div>

    <div v-if="showCommentSection" class="comment-section">
      <CommentInput />
      <CommentList />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CommentInput from './CommentInput.vue'
import CommentList from './CommentList.vue'

const nickname = ref('민달팽럴')
const goalContent = ref('포기하지 않고 긍정적으로 오늘의 할일을 마무리하자냥냥걸')
const showCommentSection = ref(false)

const toggleCommentSection = () => {
  showCommentSection.value = !showCommentSection.value
}

const editGoal = () => {
  /* 목표 수정 */
}
const deleteGoal = () => {
  /* 목표 삭제 */
}
</script>

<style scoped>
.my-goal {
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
.name {
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


.content{
  margin-left: 10px;
  margin-right: 5px;
  padding: 5px 0px;
  color: #000;
  width:50%;
  font-family: 'NaL';
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}

.goal-icons {
  display: flex;
  gap: 10px;
  align-items: center;
}

.goal-icons button:hover {
  background: none;
}


.comment-section {
  margin-top: 8px;
}

.line{
  width: 1px;
  height: 35px;
  background: #D9D9D9;
}

</style>
