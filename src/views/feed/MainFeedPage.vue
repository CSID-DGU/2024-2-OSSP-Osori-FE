<template>
  <div class="min-h-screen bg-[#FFF9F2] font-pretendard flex justify-center">
    <div class="w-[395px] min-w-[340px] bg-[#FAE8DA] min-h-screen relative overflow-y-auto">
      <div class="feed-page">
        <MainHeader />
        <SearchBar class="component-spacing" style="margin-top: 100px" />
        <FollowStats class="component-spacing" />
        <MyGoal class="component-spacing" />
        <FriendGoal class="component-spacing" />
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
}
.component-spacing {
  margin-bottom: 20px; /* 컴포넌트 사이의 간격 조정 */
}
</style>
