<template>
  <div class="min-h-screen bg-[#FFF9F2] font-pretendard flex justify-center">
    <div
      class="w-[395px] min-w-[340px] bg-[#FAE8DA] min-h-screen relative overflow-y-auto"
    >
      <header
        class="bg-white shadow-sm py-3 px-4 fixed top-0 left-1/2 transform -translate-x-1/2 w-[395px] min-w-[340px] z-10"
      >
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
            <div style="width: 150%; margin-left: 90%; z-index:20;">
              <ul v-show="showFollowers" style="padding: 20; width: 100%;">
                <li v-for="follower in followers" :key="follower.followingId" class="flex justify-between items-center mb-4">
                  <span class='font-NaR'>{{ follower.nickname }}</span>
                  <button @click="blockFollower(follower.followingId)" class="followerDelete-btn">삭제</button>
                </li>
              </ul>
            </div>
          </div>

          <div class="following font-NaL" style="width:50%; display: flex; flex-direction: column; align-items: center; margin-top:10px;">
            <div @click="showFollowers = false; showFollowings = true" style="cursor: pointer;">
              팔로잉 {{ followingCount }}
            </div>
            <div class="followingline" :style="{ width: '100%', height: '2px', background: showFollowings ? '#FF7F00' : '#B3B3B3', marginBottom: '15px' }"></div>
            <div style="width: 100%;"></div>
            <ul v-show="showFollowings" style="padding-right: 110%; width: 260%;">
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
import { useRouter } from 'vue-router';
import Footer from '@/components/layout/Footer.vue';

const followerCount = ref(0);
const followingCount = ref(0);
const followers = ref([]);
const followings = ref([]);
const showFollowers = ref(true);
const showFollowings = ref(false); 

function fetchFollowerCount() {
  followers.value = [
    { followingId: 1, nickname: '미니', email: 'follower1@example.com' },
    { followingId: 2, nickname: '토니', email: 'follower2@example.com' },
    { followingId: 3, nickname: '서혀니', email: 'follower3@example.com' },
  ];
  followerCount.value = followers.value.length;
}

function fetchFollowingCount() {
  followings.value = [
    { followingId: 4, nickname: '동국이', email: 'following1@example.com' },
    { followingId: 5, nickname: '미니', email: 'following2@example.com' },
    { followingId: 6, nickname: '동동이', email: 'following3@example.com' },
  ];
  followingCount.value = followings.value.length;
}

function blockFollower(id) {
  const index = followers.value.findIndex(follower => follower.followingId === id);
  if (index !== -1) {
    followers.value.splice(index, 1);
    followerCount.value--;
  }
}

function unfollow(id) {
  followings.value = followings.value.filter(following => following.followingId !== id);
  followingCount.value--;
}

const router = useRouter();
const goBack = () => {
  router.back(); 
};

onMounted(() => {
  fetchFollowerCount();
  fetchFollowingCount();
});
</script>

<style scoped>
.unfollow-button {
  font-size: 12.5px;
  width: 70px;
  height: 28px;
  margin-left: 8px;
  font-family: 'NaR';
  border-radius: 20px;
  color: white;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  background: #FF7F00;
  cursor: pointer; 
  transition: background-color 0.3s;
}

.unfollow-button:hover,
.followerDelete-btn:hover {
  background-color: #E0E0E0; 
}

.followerDelete-btn {
  font-size: 15px;
  width: 70px;
  height: 28px;
  margin-left: 8px;
  font-family: 'NaR';
  border-radius: 20px;
  color: white;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  background: #FF7F00;
  cursor: pointer;
  transition: background-color 0.3s;
}
</style>