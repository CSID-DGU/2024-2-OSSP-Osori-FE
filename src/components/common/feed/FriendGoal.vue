<template>
  <div v-if="friendNickname && friendGoalContent" class="friend-goal">
    <div class="goal-content">
      <span class="friendName">{{ friendNickname }}</span>
      <span class="friendContent">{{ friendGoalContent }}</span>
      <button class="btn" @click="toggleCommentSection">
        <img src="../../../assets/images/comment.svg" alt="댓글">
      </button>
    </div>

    <!-- 댓글 입력 섹션 -->
    <div v-if="showCommentSection">
      <div class="comment-input">
        <select v-model="selectedEmoji">
          <option value="" disabled selected hidden>#️⃣</option>
          <option value="😊">😊</option>
          <option value="👍">👍</option>
          <option value="❤️">❤️</option>
          <option value="😎">😎</option>
          <option value="😍">😍</option>
        </select>
        <input
          class="realinput"
          type="text"
          v-model="comment"
          placeholder="댓글 입력"
        />
        <button @click="submitComment">
          <img src="../../../assets/images/add.svg" />
        </button>
      </div>

      <div class="comment-list">
        <div v-for="comment in comments" :key="comment.id" class="comment">
          <div class="nick">{{ comment.nickname }}</div>
          <div>{{ getEmoji(comment.emoji) }}</div> <!-- 이모지 변환 -->
          <div class="comment-content">{{ comment.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 데이터 정의
const friendNickname = ref('')
const friendGoalContent = ref('')
const comments = ref([])
const showCommentSection = ref(false)
const selectedEmoji = ref('')
const comment = ref('')
const goalId = ref(null)  // goalId는 API에서 받아옴

// 이모지 맵
const emojiMap = {
  '😊': 0,
  '👍': 1,
  '❤️': 2,
  '😎': 3,
  '😍': 4
}

// emojiMap을 반대로 변환하여 숫자 값을 이모지로 변환하는 함수
const getEmoji = (emojiIndex) => {
  const reversedMap = Object.keys(emojiMap).reduce((acc, key) => {
    acc[emojiMap[key]] = key
    return acc
  }, {})
  return reversedMap[emojiIndex] || ''  // 없으면 빈 문자열 반환
}

// 목표 데이터를 불러오는 함수
const fetchGoals = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_BE_API_URL}/api/feeds`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (response.ok) {
      const data = await response.json()
      console.log('API 응답 데이터:', data)
      if (data.length > 0) {
        const firstGoal = data[0]
        friendNickname.value = firstGoal.nickname
        friendGoalContent.value = firstGoal.content
        comments.value = firstGoal.comments
        goalId.value = firstGoal.goalId
      }
    } else {
      console.error('목표 데이터를 불러오지 못했습니다.', response.status)
      alert('데이터를 불러오는 데 문제가 발생했습니다.')
    }
  } catch (error) {
    console.error('API 요청 오류:', error)
    alert('서버 요청 오류가 발생했습니다.')
  }
}

// 댓글을 작성하는 함수
const submitComment = async () => {
  if (!comment.value.trim()) {
    alert('댓글을 입력하세요.')
    return
  }

  try {
    const emojiNumber = emojiMap[selectedEmoji.value] ?? -1

    const payload = {
      emoji: emojiNumber,
      content: comment.value,
    }

    console.log("요청할 Payload:", payload)

    const response = await fetch(
      `${process.env.VUE_APP_BE_API_URL}/api/goals/${goalId.value}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      }
    )

    if (response.ok) {
      const data = await response.json()
      console.log("API 응답 데이터:", data) 
      window.location.reload() 
      alert('댓글이 성공적으로 추가되었습니다!')
      selectedEmoji.value = ''
      comment.value = ''
    } else {
      alert('댓글 추가 중 문제가 발생했습니다. 다시 시도해주세요.')
    }
  } catch (error) {
    console.error('댓글 전송 중 오류:', error)
    alert('댓글 추가 중 문제가 발생했습니다. 다시 시도해주세요.')
  }
}

const toggleCommentSection = () => {
  showCommentSection.value = !showCommentSection.value
}

onMounted(() => {
  fetchGoals()
})
</script>

<style scoped>
.friend-goal {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  border-radius: 10px;
  background: #fff;
  height: 100%;
}

.goal-content {
  display: flex;
  width: 100%;
}

.friendName {
  border-radius: 10px 0 0 10px;
  background: #ff7f00;
  color: #fff;
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

.friendContent {
  margin-left: 10px;
  margin-right: 5px;
  padding: 5px 0;
  color: #000;
  width: 70%;
  font-family: 'NaL';
  font-size: 15px;
  font-weight: 300;
  line-height: normal;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 5px;
}

.comment {
  display: flex;
  gap: 10px;
  margin-left: 5px;
}

.nick {
  font-family: 'NaB';
  font-size: 15px;
  color: #FF7F00;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  display: flex;
  align-items: center;
}

.comment-content {
  font-family: 'NaL';
  font-size: 14px;
  color: #000000;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  display: flex;
  align-items: center;
}

.comment-input {
  display: flex;
  width: 98%;
}

.comment-input select:focus {
  outline: none;
  border: none;
  box-shadow: none;
}

.realinput::placeholder {
  color: #b3b3b3;
  font-family: 'NaL';
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}

.realinput {
  outline: none;
  border: none;
  background-color: transparent;
  border-radius: 0;
  font-family: 'NaL';
  font-size: 16px;
  margin-left: 4px;
}

.realinput:focus {
  outline: none;
  border: none;
  box-shadow: none;
}
</style>
