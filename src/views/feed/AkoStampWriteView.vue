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
          @click="goBack"
          style="width: 24px; height: 24px; margin-top: 10px; margin-bottom: 20px; cursor: pointer;"
        />

        <div class="bg-white rounded-2xl" style="height: 600px">
          <div class="mb-6 text-center p-4 flex items-center justify-between">
            <p
              class="mb-2 text-[#FF7F00] text-left mt-4 text-lg text-gray-600 padding font-NaR"
              style="font-size: 30px; color: #ff7f00; font-style: normal; font-weight: 400; line-height: normal;"
            >
              <span class="text-[25px]"> {{ currentDate[0] }} </span><br />
              {{ currentDate[1] }}<br />
              {{ currentDate[2] }}
            </p>

            <p class="text-2xl text-right text-gray-800 font-NaL">
              <span class="text-[#00000] font-bold font-NaL">{{ nickname }}</span>
              님,<br />
              오늘도 성장해요!
            </p>
          </div>

          <div class="mb-6">
            <div class="mb-6 flex justify-center">
              <textarea
                v-model="userText"
                placeholder="오늘의 문구를 적어주세요"
                maxlength="50"
                rows="4"
                class="px-4 text-center mt-14 bg-white font-NaL border-none text-sm focus:outline-none transition duration-200 resize-none"
                style="width: 260px; padding: 0 10px; background: linear-gradient(to bottom, transparent 19px, rgba(169, 169, 169, 0.5) 19px, rgba(169, 169, 169, 0.5) 20px, transparent 20px); background-size: 100% 20px;"
              ></textarea>
            </div>

            <p class="text-[#B3B3B3] mt-1 font-NaL text-sm text-right px-5 pb-12">
              {{ userText.length }}/50
            </p>
          </div>

          <div class="flex justify-center">
            <button
              @click="registerGoal"
              class="font-NaR mt-12 px-2 py-3 mb-4 bg-[#F6B87A] text-white text-sm rounded-full hover:bg-[#FF7F00] transition-colors duration-300"
              style="width: 200px; font-size: 17px"
            >
              등록하기
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Footer from '@/components/layout/Footer.vue'

const currentDate = computed(() => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return [year, month, day]
})

const nickname = ref('')
const userText = ref('')

const fetchUserData = async () => {
  try {
    const response = await fetch(
      `${process.env.VUE_APP_BE_API_URL}/api/users/profile`,
      {
        method: 'GET',
        credentials: 'include', 
      }
    )

    if (response.ok) {
      const data = await response.json()
      nickname.value = data.nickname

    } else {
      console.error('사용자 정보 불러오기 실패:', response.status, response.statusText)
      if (response.status === 401) {
        alert('인증에 실패했습니다. 다시 로그인해주세요.')
        window.location.href = '/login'
      } else {
        alert('사용자 정보 가져오기 실패. 다시 시도해주세요.')
      }
    }
  } catch (error) {
    console.error('사용자 정보 가져오기 오류:', error)
    alert('사용자 정보 가져오기 오류가 발생했습니다.')
  }
}

const registerGoal = async () => {
  if (userText.value.trim() !== '') {
    try {
      const response = await fetch(
        `${process.env.VUE_APP_BE_API_URL}/api/goals`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: userText.value }),
          credentials: 'include',
        }
      )

      if (response.ok) {
        const data = await response.json()
        alert(`목표가 등록되었습니다: ${data.content}`)
        window.history.back();
        userText.value = ''
      } else {
        alert('목표 등록에 실패했습니다.')
      }
    } catch (error) {
      console.error('목표 등록 오류:', error)
      alert('목표 등록 오류가 발생했습니다. 다시 시도해주세요.')
    }
  } else {
    alert('문구를 입력해주세요.')
  }
}

const goBack = () => {
  window.history.back()
}

onMounted(() => {
  fetchUserData()
})
</script>
