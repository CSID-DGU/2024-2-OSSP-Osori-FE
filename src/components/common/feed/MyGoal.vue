<template>
  <div v-if="goalContent" class="my-goal">
    <div class="goal-content">
      <span class="name">{{ nickname }}</span>
      <span class="content">{{ goalContent }}</span>
      <div class="goal-icons">
        <button @click="toggleCommentSection">
          <img src="../../../assets/images/comment.svg" alt="comment" />
        </button>
        <div class="line"></div>
        <button @click="editGoal">
          <img src="../../../assets/images/write.svg" alt="edit" />
        </button>
        <div class="line"></div>
        <button @click="deleteGoal">
          <img src="../../../assets/images/delete.svg" alt="delete" />
        </button>
      </div>
    </div>

    <div v-if="showCommentSection" class="comment-section">
      <CommentInput />
      <CommentList />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CommentInput from "./CommentInput.vue";
import CommentList from "./CommentList.vue";

const nickname = ref("");
const goalContent = ref("");
const showCommentSection = ref(false);
const goalId = ref("");

const fetchGoalData = async () => {
  try {
    const userResponse = await fetch(
      `${process.env.VUE_APP_BE_API_URL}/api/users/profile`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (userResponse.ok) {
      const userData = await userResponse.json();
      nickname.value = userData.nickname;
    } else {
      handleFetchError(userResponse);
    }

    const goalResponse = await fetch(`${process.env.VUE_APP_BE_API_URL}/api/goals`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (goalResponse.ok) {
      const goalData = await goalResponse.json();
      if (goalData.length > 0) {
        const goal = goalData[0];
        goalContent.value = goal.content;
        goalId.value = goal.goalId;
      }
    } else {
      alert("목표를 가져오는 데 실패했습니다.");
    }
  } catch (error) {
    console.error("목표 및 사용자 정보 불러오기 오류:", error);
    alert("목표 및 사용자 정보 가져오기 오류가 발생했습니다.");
  }
};

const editGoal = async () => {
  const updatedContent = prompt("목표를 수정하세요", goalContent.value);
  if (updatedContent && updatedContent !== goalContent.value) {
    try {
      const response = await fetch(
        `${process.env.VUE_APP_BE_API_URL}/api/goals/${goalId.value}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ content: updatedContent }),
        }
      );

      if (response.ok) {
        goalContent.value = updatedContent;
        alert("목표가 수정되었습니다.");
      } else {
        alert("목표 수정 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("목표 수정 오류:", error);
      alert("목표 수정 중 오류가 발생했습니다.");
    }
  }
};

const deleteGoal = async () => {
  if (!goalId.value) {
    alert("삭제할 목표가 없습니다.");
    return;
  }

  const confirmDelete = confirm("목표를 삭제하시겠습니까?");
  if (confirmDelete) {
    try {
      const response = await fetch(
        `${process.env.VUE_APP_BE_API_URL}/api/goals/${goalId.value}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        alert("목표가 삭제되었습니다.");
        goalContent.value = "";
        goalId.value = "";
      } else {
        alert("목표 삭제 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("목표 삭제 오류:", error);
      alert("목표 삭제 중 오류가 발생했습니다.");
    }
  }
};

const toggleCommentSection = () => {
  showCommentSection.value = !showCommentSection.value;
};

const handleFetchError = (response) => {
  console.error("사용자 정보 불러오기 실패:", response.status, response.statusText);
  if (response.status === 401) {
    alert("인증에 실패했습니다. 다시 로그인해주세요.");
    window.location.href = "/login";
  } else {
    alert("사용자 정보 가져오기 실패. 다시 시도해주세요.");
  }
};

onMounted(() => {
  fetchGoalData();
});
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
