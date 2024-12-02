<template>
  <div class="my-goal">
    <div class="goal-content">
      <span class="name">{{ nickname }}</span>
      <span class="content">{{ goalContent }}</span>
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
import { ref, onMounted } from 'vue'
import CommentInput from './CommentInput.vue'
import CommentList from './CommentList.vue'

// 목표 관련 상태 변수
const nickname = ref('')
const goalContent = ref('')
const showCommentSection = ref(false)
const goalId = ref('') // 목표 ID

// 목표를 불러오는 함수
const fetchGoalData = async () => {
  try {
    // 세션의 userId를 이용하여 목표를 조회
    const response = await fetch(`${process.env.VUE_APP_BE_API_URL}/api/goals`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 쿠키 인증을 포함
    })

    if (response.ok) {
      const data = await response.json()
      // 첫 번째 목표를 가져왔다고 가정하고 데이터를 설정
      if (data.length > 0) {
        const goal = data[0] // 첫 번째 목표 가져오기 (여러 목표일 경우 필요에 따라 수정)
        nickname.value = goal.nickname
        goalContent.value = goal.content
        goalId.value = goal.id
      }
    } else {
      alert('목표를 가져오는 데 실패했습니다.')
    }
  } catch (error) {
    console.error('목표 불러오기 오류:', error)
    alert('목표를 불러오는 중 오류가 발생했습니다.')
  }
}

// 목표 수정 함수
const editGoal = async () => {
  const updatedContent = prompt('목표를 수정하세요', goalContent.value)
  if (updatedContent && updatedContent !== goalContent.value) {
    try {
      const response = await fetch(
        `${process.env.VUE_APP_BE_API_URL}/api/goals/${goalId.value}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // 쿠키 인증을 포함
          body: JSON.stringify({
            content: updatedContent,
          }),
        }
      )

      if (response.ok) {
        goalContent.value = updatedContent
        alert('목표가 수정되었습니다.')
      } else {
        alert('목표 수정 중 문제가 발생했습니다.')
      }
    } catch (error) {
      console.error('목표 수정 오류:', error)
      alert('목표 수정 중 오류가 발생했습니다.')
    }
  }
}

// 목표 삭제 함수
const deleteGoal = async () => {
  const confirmDelete = confirm('목표를 삭제하시겠습니까?')
  if (confirmDelete) {
    try {
      const response = await fetch(
        `${process.env.VUE_APP_BE_API_URL}/api/goals/${goalId.value}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // 쿠키 인증을 포함
        }
      )

      if (response.ok) {
        alert('목표가 삭제되었습니다.')
        goalContent.value = '' // 삭제 후 내용 비우기
        nickname.value = ''
        goalId.value = ''
      } else {
        alert('목표 삭제 중 문제가 발생했습니다.')
      }
    } catch (error) {
      console.error('목표 삭제 오류:', error)
      alert('목표 삭제 중 오류가 발생했습니다.')
    }
  }
}

// 목표 데이터 불러오기
onMounted(() => {
  fetchGoalData()
})

// 댓글 섹션 토글
const toggleCommentSection = () => {
  showCommentSection.value = !showCommentSection.value
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

.content {
  margin-left: 10px;
  margin-right: 5px;
  padding: 5px 0px;
  color: #000;
  width: 50%;
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
  background: none;
  outline: none;
}

.goal-icons button:hover {
  background: none;
}

.comment-section {
}

.line {
  width: 1px;
  height: 35px;
  background: #D9D9D9;
}
</style>
