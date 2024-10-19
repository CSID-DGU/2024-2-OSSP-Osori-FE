<!-- src/layouts/AuthLayout.vue -->
<template>
  <div>
    <MainHeader />
    <router-view />
    <MainFooter />
  </div>
</template>

<script>
import MainHeader from '@/views/mainpage/Header.vue'
import MainFooter from '@/views/mainpage/Footer.vue'

export default {
  name: 'FeedLayout'
}
</script>
