<!-- src/layouts/AuthLayout.vue -->
<template>
  <div>
    <MainHeader />
    <router-view />
    <MainFooter />
  </div>
</template>

<script>
import MainHeader from '@/components/layout/Header.vue'
import MainFooter from '@/components/layout/Footer.vue'

export default {
  name: 'FeedLayout'
}
</script>
