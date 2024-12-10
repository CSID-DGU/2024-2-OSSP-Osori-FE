import MainHeader from '../../../components/layout/Header.vue';
import MainFooter from '../../../components/layout/Footer.vue';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import axios from 'axios';

const nickname = ref('');

const fetchUserData = async () => {
  try {
    const response = await fetch(
      `${process.env.VUE_APP_BE_API_URL}/api/users/profile`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    if (response.ok) {
      const data = await response.json();
      nickname.value = data.nickname;
    } else {
      console.error('사용자 정보 불러오기 실패:', response.status, response.statusText);
      if (response.status === 401) {
        alert('인증에 실패했습니다. 다시 로그인해주세요.');
        window.location.href = '/login';
      } else {
        alert('사용자 정보 가져오기 실패. 다시 시도해주세요.');
      }
    }
  } catch (error) {
    console.error('사용자 정보 가져오기 오류:', error);
    alert('사용자 정보 가져오기 오류가 발생했습니다.');
  }
};

export default {
  components: {
    MainHeader,
    MainFooter,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const portfolio = ref(null);
    const portfolioId = route.params.id;
    const activityName = ref('');
    const activityDate = ref('');
    const selectedTags = ref([]); // 초기값 배열로 설정
    const tags = ref([
      '전공', '교양', '교내동아리', '교외동아리', '학회', '봉사활동',
      '인턴', '아르바이트', '대외활동', '서포터즈', '기자단', '기타',
      '강연/행사', '스터디', '부트캠프', '프로젝트', '연구',
      '학생회'
    ]);
    const images = ref([]); // 초기값 배열로 설정
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

    // 포트폴리오 데이터 가져오기
    const fetchPortfolioById = async (portfolioId) => {
      try {
        const apiUrl = `${process.env.VUE_APP_BE_API_URL}/api/portfolios/${portfolioId}`;
        console.log('Fetching portfolio from URL:', apiUrl); // API URL 출력

        const response = await fetch(apiUrl, {
          method: 'GET',
          credentials: 'include',
        });
        console.log('Response status:', response.status); // 상태 코드 확인

        if (!response.ok) {
          console.error(`Response status: ${response.status}, ${response.statusText}`);
          throw new Error(`Failed to fetch portfolio: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Received portfolio data:', data);

        // 포트폴리오 데이터 할당
        portfolio.value = {
          baseInfo: data.baseInfo || {},
          experience: data.experience || { situation: '', task: '', action: '', result: '' },
          pmi: data.pmi || { plus: '', minus: '', interesting: '' },
          photoUrls: data.photoUrls || [],
        };

        // 각 변수에 포트폴리오 데이터 할당
        activityName.value = portfolio.value.baseInfo.name || ''; // 활동명
        activityDate.value = portfolio.value.baseInfo.startDate || ''; // 활동일 (startDate로 변경)
        star.value = portfolio.value.experience || { situation: '', task: '', action: '', result: '' }; // STAR 모델
        pmi.value = portfolio.value.pmi || { plus: '', minus: '', interesting: '' }; // PMI 모델
        images.value = portfolio.value.photoUrls.map((imageUrl) => {
          return {
            previewUrl: imageUrl, // 서버에서 제공하는 URL을 미리보기 URL로 사용
            name: imageUrl.split('/').pop(), // 파일 이름을 추출
            size: 0, // 기존 이미지는 파일 크기 필요 없음
            containerWidth: '300px', // 기본 크기 설정
            containerHeight: '300px', // 기본 크기 설정
          };
        });
        selectedTags.value = portfolio.value.baseInfo.tags || [];
        
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        alert('포트폴리오를 가져오는 중 오류가 발생했습니다.');
        portfolio.value = null;
        images.value = [];
      }
    };

    const handleFileChange = (event) => {
      const selectedFiles = Array.from(event.target.files);
      if (Array.isArray(images.value) && images.value.length + selectedFiles.length > 5) {
        alert('최대 5개의 이미지만 업로드할 수 있습니다.');
        return;
      }

      const newImagesPromises = selectedFiles.map((file) => {
        const previewUrl = URL.createObjectURL(file);  // 새로 추가된 이미지는 미리보기 URL 생성
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
      if (images.value[index].previewUrl) {
        URL.revokeObjectURL(images.value[index].previewUrl);  // 생성한 URL을 해제
      }
      images.value.splice(index, 1);
    };

    const uploadImages = async () => {
      const uploadedUrls = [];

      try {
        console.log("Starting image upload...");

        for (const image of images.value) {
          const apiUrl = `${process.env.VUE_APP_BE_API_URL}/file/IMAGE/presigned-url`;
          console.log('Requesting presigned URL from:', apiUrl);

          const response = await axios.post(apiUrl, {
            imageName: image.file.name,
          });

          const presignedUrl = response.data;
          console.log("Received presigned URL:", presignedUrl);

          await axios.put(presignedUrl, image.file, {
            headers: {
              "Content-Type": image.file.type,
            },
          });

          console.log("Image uploaded successfully!");

          const uploadedUrl = presignedUrl.split("?")[0];
          uploadedUrls.push(uploadedUrl);
          console.log("Uploaded image URL:", uploadedUrl);
        }

        console.log("Uploaded image URLs:", uploadedUrls);

      } catch (error) {
        console.error("Error uploading image:", error);
        alert("이미지 업로드 중 오류가 발생했습니다.");
      }
    };

    const saveData = async () => {
      const id = portfolioId // route에서 가져온 portfolioId를 사용

      // id가 올바른지 확인
      if (!id || (typeof id !== 'string' && typeof id !== 'number')) {
        console.error('Invalid id:', id)
        alert('잘못된 ID 값입니다. 다시 시도해주세요.')
        return
      }

      if (!isFormComplete.value) {
        alert('모든 필드를 입력해주세요.')
        return
      }

      // 이미지 URL 정리
      const photoUrls =
        images.value.length > 0
          ? images.value
              .map((image) => image.previewUrl?.trim()) // previewUrl이 존재하는지 확인 후 트림
              .filter((url) => url) // 빈 값 제거
          : []

      // 태그 정리
      const tagsArray = Array.isArray(selectedTags.value)
        ? [...selectedTags.value] // Proxy 객체를 일반 배열로 변환
        : []

      // 요청 바디 생성
      const requestBody = {
        name: activityName.value,
        startDate: activityDate.value,
        tags: tagsArray,
        experience: {
          situation: star.value.situation,
          task: star.value.task,
          action: star.value.action,
          result: star.value.result
        },
        pmi: {
          plus: pmi.value.plus,
          minus: pmi.value.minus,
          interesting: pmi.value.interesting
        },
        photoUrls: photoUrls
      }

      console.log('요청 데이터:', requestBody)

      try {
        // URL 확인
        const apiUrl = `${process.env.VUE_APP_BE_API_URL}/api/portfolios/${id}`
        console.log('API URL:', apiUrl)

        const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody),
          credentials: 'include' // 인증 쿠키 포함
        })

        // 응답 확인
        if (!response.ok) {
          const errorData = await response.json() // 에러 상세 데이터 파싱
          console.error('서버 에러 응답:', errorData)
          alert('저장에 실패했습니다. 다시 시도해주세요.')
          return
        }

        const responseData = await response.json()
        console.log('서버 응답:', responseData)
        alert('포트폴리오가 성공적으로 저장되었습니다.')
        router.push('/akopolio/main'); 
      } catch (error) {
        console.error('데이터 저장 중 오류 발생:', error)
        alert(
          '데이터 저장 중 오류가 발생했습니다. 자세한 내용은 콘솔에서 확인하세요.'
        )
      }
    }

    const isFormComplete = computed(() => {
      return (
        activityName.value &&
        activityDate.value &&
        Array.isArray(selectedTags.value) && selectedTags.value.length > 0 &&
        Object.values(star.value).every((field) => field) &&
        Object.values(pmi.value).every((field) => field)
      );
    });

    onMounted(async () => {
      images.value = []; 
      selectedTags.value = [];
      await fetchUserData();
      await fetchPortfolioById(portfolioId);

    });

    return {
      portfolio,
      activityName,
      activityDate,
      selectedTags,
      tags,
      images,
      star,
      pmi,
      isDropdownOpen,
      toggleDropdown,
      toggleTag,
      autoResize,
      handleFileChange,
      removeImage,
      uploadImages,
      saveData,
      isFormComplete,
    };
  },
};
