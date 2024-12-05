<template>
  <div v-if="goals.length" class="friend-goals">
    <div v-for="goal in goals" :key="goal.goalId" class="friend-goal">
      <div class="goal-content">
        <span class="friendName">{{ goal.nickname }}</span>
        <span class="friendContent">{{ goal.content }}</span>
        <button class="btn" @click="toggleCommentSection(goal.goalId)">
          <img src="../../../assets/images/comment.svg" alt="댓글">
        </button>
      </div>

      <div v-if="showCommentSection === goal.goalId">
        <div class="comment-input">
          <select v-model="comments[goal.goalId].emoji">
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
            v-model="comments[goal.goalId].content"
            placeholder="댓글 입력"
          />
          <div class="'btn2'" @click="submitComment(goal.goalId)">
            <img src="../../../assets/images/add.svg" />
          </div>
        </div>

        <div class="comment-list">
          <div v-for="comment in goal.comments" :key="comment.commentId" class="comment">
            <div class="nick">{{ comment.nickname }}</div>
            <div class='emo'>{{ getEmoji(comment.emoji) }}</div>
            <div class="comment-content">{{ comment.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>표시할 목표가 없습니다.</p>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';

export default {
  setup() {
    const goals = ref([]);
    const showCommentSection = ref(null);
    const comments = reactive({}); 

    const emojiMap = {
      '😊': 0,
      '👍': 1,
      '❤️': 2,
      '😎': 3,
      '😍': 4,
    };

    const fetchGoals = async () => {
      try {
        const response = await fetch(`${process.env.VUE_APP_BE_API_URL}/api/feeds`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          goals.value = data.filter((goal) => !goal.mine);

          goals.value.forEach((goal) => {
            comments[goal.goalId] = { content: '', emoji: '' };
          });
        } else {
          console.error('목표 데이터를 불러오지 못했습니다.', response.status);
          alert('데이터를 불러오는 데 문제가 발생했습니다.');
        }
      } catch (error) {
        console.error('API 요청 오류:', error);
        alert('서버 요청 오류가 발생했습니다.');
      }
    };

    const toggleCommentSection = (goalId) => {
      showCommentSection.value = showCommentSection.value === goalId ? null : goalId;
    };

    const getEmoji = (emoji) => {
      return Object.keys(emojiMap).find((key) => emojiMap[key] === emoji) || '#️⃣';
    };

    const submitComment = async (goalId) => {
      const { content, emoji } = comments[goalId];
      const emojiValue = emojiMap[emoji] ?? -1;

      if (!content.trim()) {
        alert('댓글을 입력해주세요.');
        return;
      }

      try {
        const payload = { content, emoji: emojiValue };
        const response = await fetch(`${process.env.VUE_APP_BE_API_URL}/api/goals/${goalId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          comments[goalId].content = '';
          comments[goalId].emoji = '';
          fetchGoals();
        } else {
          console.error('댓글 추가 실패:', response.status);
          alert('댓글 추가에 실패했습니다.');
        }
      } catch (error) {
        console.error('댓글 제출 오류:', error);
        alert('서버 요청 오류가 발생했습니다.');
      }
    };

    onMounted(fetchGoals);

    return {
      goals,
      showCommentSection,
      comments,
      toggleCommentSection,
      getEmoji,
      submitComment,
    };
  },
};
</script>

<style scoped>
.friend-goal {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 3px;
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
.btn,
.btn2{
  display: flex;
  outline: none;
  border: none;
  background: none;
  cursor: pointer; 
  align-items: center;
}

.btn:focus,
.btn:active,
.btn2:focus,
.btn2:active {
  outline: none;
  border: none;
  cursor: pointer; 
}


.emo{
  display: flex;
  justify-content: center;
  align-items: center;
}
.friendContent {
  display: flex;
  align-items: center;
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
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 5px;
}

.comment {
  display: flex;
  margin-left: 5px;
  align-items: center;
}

.nick {
  font-family: 'NaB';
  font-size: 15px;
  color: #FF7F00;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  display: flex;
  min-width: 40px;
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
  justify-content: center;
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
