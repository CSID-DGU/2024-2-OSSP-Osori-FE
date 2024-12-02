<template>
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
</template>

<script setup>
import { ref, onMounted } from 'vue'

const selectedEmoji = ref('')
const comment = ref('')
const goalId = '123'

const emojiMap = {
  '😊': 0,
  '👍': 1,
  '❤️': 2,
  '😎': 3,
  '😍': 4
}

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
      `${process.env.VUE_APP_BE_API_URL}/api/goals/${goalId}/comments`,
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
</script>

<style scoped>
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
