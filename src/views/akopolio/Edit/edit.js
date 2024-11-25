import MainHeader from '../../../components/layout/Header.vue';
import MainFooter from '../../../components/layout/Footer.vue';
import { ref, computed } from 'vue';

export default {
  components: {
    MainHeader,
    MainFooter
  },
  setup() {
    const activityName = ref('융합프로그래밍');
    const activityDate = ref('2024-11-01');
    const selectedTags = ref(['전공']);
    const tags = ref([
      '전공', '교양', '교내동아리', '교외동아리', '학회', '봉사활동', '인턴', '아르바이트',
      '대외활동', '서포터즈', '기자단', '강연/행사', '스터디', '부트캠프', '프로젝트',
      '연구', '학생회', '기타'
    ]);
    const star = ref({ situation: '활동을 시작한 이유는...', task: '참여한 활동은...', action: '제가 맡은 역할은...', result: '결과는 이렇게 되었습니다.' });
    const pmi = ref({ plus: '오늘의 좋은 점은...', minus: '아쉬웠던 점은...', interesting: '재미있었던 점은...' });
    const isDropdownOpen = ref(false);

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const toggleTag = (tag) => {
      const index = selectedTags.value.indexOf(tag);
      if (index > -1) {
        selectedTags.value.splice(index, 1);
      } else {
        selectedTags.value.push(tag);
      }
    };

    const autoResize = (event) => {
      const textarea = event.target;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const saveData = () => {
      if (!isFormComplete.value) {
        alert('모든 필드를 입력해주세요.');
        return;
      }

      // 저장 로직
      console.log('저장된 데이터:', {
        activityName: activityName.value,
        activityDate: activityDate.value,
        selectedTags: selectedTags.value,
        star: star.value,
        pmi: pmi.value
      });
    };

    const isFormComplete = computed(() => {
      return (
        activityName.value &&
        activityDate.value &&
        selectedTags.value.length > 0 &&
        Object.values(star.value).every((field) => field) &&
        Object.values(pmi.value).every((field) => field)
      );
    });

    return {
      activityName,
      activityDate,
      tags,
      selectedTags,
      isDropdownOpen,
      star,
      pmi,
      toggleDropdown,
      toggleTag,
      autoResize,
      saveData,
      isFormComplete
    };
  }
};
