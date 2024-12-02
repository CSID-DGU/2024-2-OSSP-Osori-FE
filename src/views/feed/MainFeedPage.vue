<template>
  <div class="min-h-screen bg-[#FFF9F2] font-pretendard flex justify-center">
    <div class="w-[395px] min-w-[340px] bg-[#FAE8DA] min-h-screen relative overflow-y-auto">
      <div class="feed-page">
        <MainHeader />
        <SearchBar class="component-spacing" style="margin-top: 100px" />
        <FollowStats class="component-spacing" />
        <MyGoal class="component-spacing" />
        <FriendGoal class="component-spacing" />
        <div class='Btn'>
          <router-link to="/feed/ako-stamp-write" class="plusMentBtn">
            아코자국 작성하기
            <img src="@/assets/images/plusBtn.svg" alt="플러스버튼" />
          </router-link>
        </div>
        <MainFooter />
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchBar from '@/components/common/feed/SearchBar.vue'
import FollowStats from '@/components/common/feed/FollowStats.vue'
import MyGoal from '@/components/common/feed/MyGoal.vue'
import FriendGoal from '@/components/common/feed/FriendGoal.vue'
import CommentInput from '@/components/common/feed/CommentInput.vue'
import CommentList from '@/components/common/feed/CommentList.vue'
import './FeedPageStyle.css'
import MainHeader from '@/components/layout/Header.vue'
import MainFooter from '@/components/layout/Footer.vue'
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
  margin-bottom: 20px;
}
.Btn {
  position: fixed;
  bottom: 60px; 
  width: 100%;
  max-width: 395px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  z-index: 10;
}
.plusMentBtn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 87px;
  border-radius: 50px 50px 0px 0px;
  background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  color: #FF7F00;
  text-align: center;
  font-family: 'NaR';
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  text-decoration: none;
}

</style>
