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
import { ref } from 'vue'
import axios from 'axios'

const selectedEmoji = ref('') // 이모지 선택 상태
const comment = ref('') // 댓글 내용
const goalId = '123' // 목표 ID (수정 필요: 부모 컴포넌트에서 전달)

// 이모지를 숫자로 매핑하는 객체
const emojiMap = {
  '😊': 0,
  '👍': 1,
  '❤️': 2,
  '😎': 3,
  '😍': 4
}

// 댓글 제출 함수
const submitComment = async () => {
  if (!comment.value.trim()) {
    alert('댓글을 입력하세요.')
    return
  }

  try {
    const token = localStorage.getItem('authToken') // 저장된 토큰 가져오기
    if (!token) {
      alert('로그인이 필요합니다.')
      return
    }

    // 이모지를 숫자로 변환
    const emojiNumber = emojiMap[selectedEmoji.value] ?? -1; // 선택된 이모지가 없으면 -1로 처리

    const payload = {
      emoji: emojiNumber, // 숫자로 된 이모지 값
      content: comment.value,
    }

    // 요청 전에 콘솔로 값 확인
    console.log("요청할 Payload:", payload);

    const response = await axios.post(
      `/api/goals/${goalId}/comments`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`, // 인증 헤더 추가
        },
      }
    )

    if (response.status === 201) {
      alert('댓글이 성공적으로 추가되었습니다!')
      selectedEmoji.value = ''
      comment.value = ''
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