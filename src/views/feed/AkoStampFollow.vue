<template>
  <div class="min-h-screen bg-[#FFF9F2] font-pretendard flex justify-center">
    <div class="w-[395px] min-w-[340px] min-h-screen relative overflow-y-auto">
      <div class="back">
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
            <div @click="showFollowers = true; showFollowings = false" style="cursor: pointer; z-index: 200;">
              팔로워 {{ followerCount }}
            </div>
            <div class="followerline" :style="{ width: '100%', height: '2px', background: showFollowers ? '#FF7F00' : '#B3B3B3', marginBottom: '15px' }"></div>
            <ul v-show="showFollowers && followers.length > 0" style="margin-left: 170px; padding: 20; width: 150%; z-index: 200;">
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
            <ul v-show="showFollowings && followings.length > 0" style="padding-right: 100%; width: 250%;">
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
    const response = await fetch(`${process.env.VUE_APP_BE_API_URL}/api/follows/followers`, {
      method: 'GET',
      credentials: 'include'
    });
    const data = await response.json();

    // API 응답 데이터 로그 출력
    console.log("팔로워 응답 데이터:", data);
    
    if (data && Array.isArray(data.follows) && data.follows.length > 0) {
      followers.value = data.follows.map(follower => ({
        followingId: follower.followingId,
        nickname: follower.nickname, // nickname이 제대로 들어오는지 확인
        email: follower.email,
      })) || [];
    } else {
      followers.value = []; // 데이터가 없으면 빈 배열
    }
    followerCount.value = data.count || 0; // 팔로워 수
  } catch (error) {
    console.error('팔로워 목록 가져오기 실패:', error);
    followerCount.value = 0;
  }
}

// 팔로잉 데이터 받아오기
async function fetchFollowingCount() {
  try {
    const response = await fetch(`${process.env.VUE_APP_BE_API_URL}/api/follows/following`, {
      method: 'GET',
      credentials: 'include'
    });
    const data = await response.json();

    // API 응답 데이터 로그 출력
    console.log("팔로잉 응답 데이터:", data);
    
    if (data && Array.isArray(data.follows) && data.follows.length > 0) {
      followings.value = data.follows.map(following => ({
        followingId: following.followingId,
        nickname: following.nickname, // nickname이 제대로 들어오는지 확인
        email: following.email,
      })) || [];
    } else {
      followings.value = []; // 데이터가 없으면 빈 배열
    }
    followingCount.value = data.count || 0; // 팔로잉 수
  } catch (error) {
    console.error('팔로잉 목록 가져오기 실패:', error);
    followingCount.value = 0;
  }
}


async function blockFollower(id) {
  try {
    const response = await fetch(`${process.env.VUE_APP_BE_API_URL}/api/follows/block`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify({
        followerId: id,
      }),
    });

    if (response.ok) {
      followers.value = followers.value.filter(follower => follower.followingId !== id);
      followerCount.value = followers.value.length;
    } else {
      console.error('팔로워 차단 요청 실패:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('팔로워 차단 실패:', error);
  }
}


async function unfollow(id) {
  try {

    await fetch(`${process.env.VUE_APP_BE_API_URL}/api/follows`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        followingId: id
      }),
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

<style scoped>
.back{
  background-color:#FAE8DA;
  height: 100%;
}
</style>
