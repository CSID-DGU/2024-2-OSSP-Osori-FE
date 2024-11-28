import MainHeader from '../../../components/layout/Header.vue';
import MainFooter from '../../../components/layout/Footer.vue';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  components: {
    MainHeader,
    MainFooter
  },
  setup() {
    const route = useRoute();
    const portfolioId = route.params.id;
    const activityName = ref('');
    const activityDate = ref('');
    const selectedTags = ref([]);
    const tags = ref([
      '전공', '교양', '교내동아리', '교외동아리', '학회', '봉사활동', '인턴', '아르바이트',
      '대외활동', '서포터즈', '기자단', '강연/행사', '스터디', '부트캠프', '프로젝트',
      '연구', '학생회', '기타',
    ]);
    const images = ref([
      { previewUrl: "https://via.placeholder.com/150" } // 예시 이미지
    ]);
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

    const handleFileChange = (event) => {
      const selectedFiles = Array.from(event.target.files);
      if (images.value.length + selectedFiles.length > 5) {
        alert('최대 5개의 이미지만 업로드할 수 있습니다.');
        return;
      }
    
      const newImagesPromises = selectedFiles.map((file) => {
        const previewUrl = URL.createObjectURL(file);
        const imageElement = new Image();
        imageElement.src = previewUrl;
    
        return new Promise((resolve) => {
          imageElement.onload = () => {
            const aspectRatio = imageElement.width / imageElement.height;
            let containerWidth, containerHeight;
    
            if (aspectRatio > 1) {
              containerWidth = '300px';
              containerHeight = `${300 / aspectRatio}px`;
            } else {
              containerWidth = `${300 * aspectRatio}px`;
              containerHeight = '300px';
            }
    
            resolve({
              file,
              name: file.name,
              size: file.size,
              previewUrl,
              containerWidth,
              containerHeight,
            });
          };
        });
      });
    
      Promise.all(newImagesPromises).then((newImages) => {
        const uniqueNewImages = newImages.filter(
          (newImage) =>
            !images.value.some(
              (existingImage) => existingImage.previewUrl === newImage.previewUrl
            )
        );
    
        if (uniqueNewImages.length === 0) {
          alert('이미 선택된 이미지입니다.');
          return;
        }
    
        images.value = [...images.value, ...uniqueNewImages];
      });
    };
    
    const removeImage = (index) => {
      URL.revokeObjectURL(images.value[index].previewUrl);
      images.value.splice(index, 1);
    };
    
    const uploadImages = async () => {
      const uploadedUrls = [];
      for (const image of images.value) {
        try {
          const { data } = await axios.post(
            `${process.env.VUE_APP_BE_API_URL}/api/get-presigned-url`,
            {
              fileName: image.name,
              fileType: image.file.type,
            }
          );
    
          await axios.put(data.url, image.file, {
            headers: { 'Content-Type': image.file.type },
          });
    
          const uploadedUrl = data.url.split('?')[0];
          uploadedUrls.push(uploadedUrl);
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('이미지 업로드 중 오류가 발생했습니다.');
        }
      }
    };
    

    // 저장 버튼 클릭 시 서버에 반영
    const saveData = async () => {
      if (!isFormComplete.value) {
        alert('모든 필드를 입력해주세요.');
        return;
      }

      try {
        // 수정된 포트폴리오 데이터와 이미지 URL을 서버에 전송
        const response = await fetch(
          `${process.env.VUE_APP_BE_API_URL}/api/portfolios/${portfolioId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              activityName: activityName.value,
              activityDate: activityDate.value,
              selectedTags: selectedTags.value,
              star: star.value,
              pmi: pmi.value,
              images: images.value.map(image => image.name), // 서버에 전달할 이미지 파일 이름만 전달
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
      toggleDropdown,
      toggleTag,
      autoResize,
      handleFileChange, 
      removeImage,      
      uploadImages,     
      saveData,
      isFormComplete
    };
  }
};
