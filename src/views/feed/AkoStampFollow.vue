<template>
  <div class="min-h-screen bg-[#FFF9F2] font-pretendard flex justify-center">
    <div class="w-[395px] min-w-[340px] bg-[#FAE8DA] min-h-screen relative overflow-y-auto">
      <header class="bg-white shadow-sm py-3 px-4 fixed top-0 left-1/2 transform -translate-x-1/2 w-[395px] min-w-[340px] z-10">
        <div class="flex items-center justify-between">
          <img src="@/assets/images/Akoming.svg" alt="로고" class="h-8" />
        </div>
      </header>

      <main class="flex flex-col px-6 pt-20 pb-24">
        <img
          src="@/assets/images/back.svg"
          alt="이전"
          style="width: 24px; height: 24px; margin-top: 10px; margin-bottom: 20px; cursor: pointer;"
          @click="goBack"
        />

        <div class="bg-white rounded-2xl mb-4" style="height: 300px; display: flex; justify-content: center;">
          <div class="follower font-NaL" style="width:50%; display: flex; flex-direction: column; align-items: center; margin-top:10px;">
            <div @click="showFollowers = true; showFollowings = false" style="cursor: pointer;">
              팔로워 {{ followerCount }}
            </div>
            <div class="followerline" :style="{ width: '100%', height: '2px', background: showFollowers ? '#FF7F00' : '#B3B3B3', marginBottom: '15px' }"></div>
            <ul v-show="showFollowers && followers.length > 0" style="padding: 20; width: 240%; z-index: 200;">
              <li v-for="follower in followers" :key="follower.followingId" class="flex justify-between items-center mb-4">
                <span class='font-NaR'>{{ follower.nickname }}</span>
                <button @click="blockFollower(follower.followingId)" class="followerDelete-btn">삭제</button>
              </li>
            </ul>
          </div>

          <div class="following font-NaL" style="width:50%; display: flex; flex-direction: column; align-items: center; margin-top:10px;">
            <div @click="showFollowers = false; showFollowings = true" style="cursor: pointer;">
              팔로잉 {{ followingCount }}
            </div>
            <div class="followingline" :style="{ width: '100%', height: '2px', background: showFollowings ? '#FF7F00' : '#B3B3B3', marginBottom: '15px' }"></div>
            <ul v-show="showFollowings && followings.length > 0" style="padding-right: 110%; width: 260%;">
              <li v-for="following in followings" :key="following.followingId" class="flex justify-between items-center mb-4">
                <span class='font-NaR'>{{ following.nickname }}</span>
                <button @click="unfollow(following.followingId)" class="unfollow-button">팔로우 취소</button>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Footer from '@/components/layout/Footer.vue';

const followerCount = ref(0);
const followingCount = ref(0);
const followers = ref([]);
const followings = ref([]);
const showFollowers = ref(true);
const showFollowings = ref(false);


async function fetchFollowerCount() {
  try {
    const response = await fetch(`${process.env.VUE_APP_BE_API_URL}/api/followers`, {
      method: 'GET',
      credentials: 'include'
    });
    const data = await response.json();
    followers.value = data;
    followerCount.value = data.length > 0 ? data.length : 0; // 배열이 비어있으면 0
  } catch (error) {
    console.error('팔로워 목록 가져오기 실패:', error);
    followerCount.value = 0; // 에러 발생 시 0 설정
  }
}

async function fetchFollowingCount() {
  try {
    const response = await fetch(`${process.env.VUE_APP_BE_API_URL}/api/following`, {
      method: 'GET',
      credentials: 'include'
    });
    const data = await response.json();
    followings.value = data;
    followingCount.value = data.length > 0 ? data.length : 0;
  } catch (error) {
    console.error('팔로잉 목록 가져오기 실패:', error);
    followingCount.value = 0; 
  }
}

async function blockFollower(id) {
  try {
    await fetch(`${process.env.VUE_APP_BE_API_URL}/api/follows/block/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    followers.value = followers.value.filter(follower => follower.followingId !== id);
    followerCount.value = followers.value.length;
  } catch (error) {
    console.error('팔로워 차단 실패:', error);
  }
}

async function unfollow(id) {
  try {
    await fetch(`${process.env.VUE_APP_BE_API_URL}/api/follows/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    followings.value = followings.value.filter(following => following.followingId !== id);
    followingCount.value = followings.value.length;
  } catch (error) {
    console.error('언팔로우 실패:', error);
  }
}

onMounted(() => {
  fetchFollowerCount();
  fetchFollowingCount();
});

const goBack = () => {
  window.history.back();
};
</script>