<template>
  <div class="min-h-screen bg-[#FFF9F2] font-pretendard flex justify-center">
    <div class="w-[395px] min-w-[340px] bg-[#FAE8DA] min-h-screen relative overflow-y-auto">
      <div class="feed-page">
        <MainHeader />
        <SearchBar class="component-spacing1" style="margin-top: 100px" />
        <FollowStats class="component-spacing2" />
        <MyGoal class="component-spacing" />
        <FriendGoal class="component-spacing3" />
        
        <div class="Btn" v-if="!hasMineGoal">
          <router-link to="/feed/ako-stamp-write" class="plusMentBtn">
            <img src="@/assets/images/92.svg" alt="플러스버튼" />
          </router-link>
        </div>

        <MainFooter />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SearchBar from '@/components/common/feed/SearchBar.vue';
import FollowStats from '@/components/common/feed/FollowStats.vue';
import MyGoal from '@/components/common/feed/MyGoal.vue';
import FriendGoal from '@/components/common/feed/FriendGoal.vue';
import MainHeader from '@/components/layout/Header.vue';
import MainFooter from '@/components/layout/Footer.vue';
import './FeedPageStyle.css';

const goals = ref([]);
const hasMineGoal = computed(() => goals.value.some((goal) => goal.mine));

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
      goals.value = data.filter((goal) => goal.mine || !goal.mine);
    } else {
      console.error('목표 데이터를 불러오지 못했습니다.', response.status);
      alert('데이터를 불러오는 데 문제가 발생했습니다.');
    }
  } catch (error) {
    console.error('API 요청 오류:', error);
    alert('서버 요청 오류가 발생했습니다.');
  }
};

fetchGoals();
</script>


<style scoped>
.feed-page {
  max-width: 345px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
}
.component-spacing {
  margin-bottom: 3px;
  width: 100%;
}

.component-spacing1 {
  margin-bottom: 7px;
}
.component-spacing2 {
  margin-bottom: 18px;
}
.component-spacing3 {
  margin-bottom: 3px;
  width: 100%;
}
.Btn {
  position: absolute;
  bottom: 100px;
  right: 20px;
  width: 75px;
  border-radius: 95px;
background: #F4B28C;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  height: 75px;
  z-index: 10;
}
.plusMentBtn {

}

</style>
