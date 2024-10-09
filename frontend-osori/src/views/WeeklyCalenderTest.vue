<template>
  <div>
    <v-calendar
      view="weekly"
      :weekdays="[1, 2, 3, 4, 5, 6, 7]"
      :attributes="attrs"
      :min-date="startOfWeek"
      :max-date="endOfWeek"
    />
  </div>
</template>

<script>
import { startOfWeek, endOfWeek } from 'date-fns'

export default {
  data() {
    return {
      startOfWeek: startOfWeek(new Date(), { weekStartsOn: 1 }), // 주간 시작일 (월요일)
      endOfWeek: endOfWeek(new Date(), { weekStartsOn: 1 }), // 주간 종료일 (일요일)
      attrs: [] // 이벤트나 스타일 속성 추가 가능
    }
  }
}
</script>
