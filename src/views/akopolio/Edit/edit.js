import MainHeader from '../../../components/layout/Header.vue';
import MainFooter from '../../../components/layout/Footer.vue';
import { ref, computed, onMounted } from 'vue'; // onMounted 추가
import { useRoute } from 'vue-router'; // useRoute 추가


export default {
  components: {
    MainHeader,
    MainFooter
  },
  setup() {
    const route = useRoute();
    const portfolioId = route.params.id; // URL에서 포트폴리오 ID 가져오기
    const activityName = ref('');
    const activityDate = ref('');
    const selectedTags = ref([]);
    const tags = ref([
      '전공', '교양', '교내동아리', '교외동아리', '학회', '봉사활동', '인턴', '아르바이트',
      '대외활동', '서포터즈', '기자단', '강연/행사', '스터디', '부트캠프', '프로젝트',
      '연구', '학생회', '기타',
    ]);
    const images = ref([]); // 기존 이미지 배열
    const newImages = ref([]); // 새로 추가된 이미지 파일
    const star = ref({
      situation: '',
      task: '',
      action: '',
      result: '',
    });
    const pmi = ref({
      plus: '',
      minus: '',
      interesting: '',
    });
    const isDropdownOpen = ref(false);

     // 드롭다운 토글
    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    // 태그 선택/해제
    const toggleTag = (tag) => {
      const index = selectedTags.value.indexOf(tag);
      if (index > -1) {
        selectedTags.value.splice(index, 1);
      } else {
        selectedTags.value.push(tag);
      }
    };

    // 텍스트 영역 자동 크기 조정
    const autoResize = (event) => {
      const textarea = event.target;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    // 포트폴리오 데이터 가져오기
    const fetchPortfolioById = async () => {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_BE_API_URL}/api/portfolios/${portfolioId}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch portfolio: ${response.statusText}`);
        }

        const data = await response.json();
        activityName.value = data.activityName || '';
        activityDate.value = data.activityDate || '';
        selectedTags.value = data.selectedTags || [];
        star.value = data.star || { situation: '', task: '', action: '', result: '' };
        pmi.value = data.pmi || { plus: '', minus: '', interesting: '' };
        images.value = data.images || []; 
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        alert('포트폴리오를 불러오는 중 오류가 발생했습니다.');
      }
    };

     // 이미지 삭제
     const deleteImage = async (imageUrl) => {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_BE_API_URL}/api/images`, // 예시: 백엔드에서 이미지 삭제 엔드포인트
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageUrl }),
          }
        );
    
        if (!response.ok) {
          throw new Error(`Failed to delete image: ${response.statusText}`);
        }
    
        images.value = images.value.filter((image) => image !== imageUrl);
        alert('이미지가 삭제되었습니다.');
      } catch (error) {
        console.error('Error deleting image:', error);
        alert('이미지 삭제 중 오류가 발생했습니다.');
      }
    };
    

    // 새 이미지 추가
    const addImage = async (file) => {
      try {
        // 프리사인드 URL 요청
        const response = await fetch(
          `${process.env.VUE_APP_BE_API_URL}/api/upload`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileName: file.name }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to get presigned URL: ${response.statusText}`);
        }

        const { uploadUrl, fileUrl } = await response.json();

        // 이미지 업로드
        await fetch(uploadUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': file.type,
          },
          body: file,
        });

        // 업로드된 이미지 URL 추가
        images.value.push(fileUrl);
        alert('이미지가 성공적으로 추가되었습니다.');
      } catch (error) {
        console.error('Error adding image:', error);
        alert('이미지 추가 중 오류가 발생했습니다.');
      }
    };


    const saveData = async () => {
      if (!isFormComplete.value) {
        alert('모든 필드를 입력해주세요.');
        return;
      }

      try {
        // 백엔드 API 호출
        const response = await fetch(
          `${process.env.VUE_APP_BE_API_URL}/api/portfolios/${portfolioId}`, // 백엔드 URL
          {
            method: 'PUT', // 수정이므로 PUT 메서드 사용
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              activityName: activityName.value,
              activityDate: activityDate.value,
              selectedTags: selectedTags.value,
              star: star.value,
              pmi: pmi.value,
              images: images.value,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to save data: ${response.statusText}`);
        }

        alert('데이터가 성공적으로 저장되었습니다.');
      } catch (error) {
        console.error('Error saving data:', error);
        alert('데이터 저장 중 오류가 발생했습니다.');
      }
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

      // 컴포넌트 마운트 시 데이터 가져오기
      onMounted(() => {
        fetchPortfolioById();
      });

    return {
      activityName,
      activityDate,
      tags,
      selectedTags,
      isDropdownOpen,
      star,
      pmi,
      images,
      newImages,
      toggleDropdown,
      toggleTag,
      autoResize,
      deleteImage,
      addImage,
      saveData,
      isFormComplete
    };
  }
};
