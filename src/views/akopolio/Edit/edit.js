import MainHeader from '../../../components/layout/Header.vue';
import MainFooter from '../../../components/layout/Footer.vue';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
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
    const route = useRoute();
    const portfolio = ref(null);
    const portfolioId = route.params.id;
    const activityName = ref('');
    const activityDate = ref('');
    const selectedTags = ref([]); // 초기값 배열로 설정
    const tags = ref([
      '전공', '교양', '교내동아리', '교외동아리', '학회', '봉사활동', '인턴', '아르바이트',
      '대외활동', '서포터즈', '기자단', '강연/행사', '스터디', '부트캠프', '프로젝트',
      '연구', '학생회', '기타',
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

    const fetchPortfolioById = async (id) => {
      try {
        const apiUrl = `${process.env.VUE_APP_BE_API_URL}/api/portfolios/${id}`;
        console.log('Fetching portfolio from URL:', apiUrl);

        const response = await fetch(apiUrl);
        console.log('Response status:', response.status);

        if (!response.ok) {
          console.error(`Response status: ${response.status}, ${response.statusText}`);
          throw new Error(`Failed to fetch portfolio: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Received portfolio data:', data);

        portfolio.value = {
          baseInfo: data.baseInfo || {},
          experience: data.experience || { situation: '', task: '', action: '', result: '' },
          pmi: data.pmi || { plus: '', minus: '', interesting: '' },
          photoUrls: data.photoUrls || [],
        };

        images.value = portfolio.value.photoUrls || [];
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

    const saveData = async (id) => {
      if (!isFormComplete.value) {
        alert('모든 필드를 입력해주세요.');
        return;
      }

      try {
        const response = await axios.put(
          `${process.env.VUE_APP_BE_API_URL}/api/portfolios/${id}`,
          {
            name: activityName.value,
            startDate: activityDate.value,
            tags: selectedTags.value,
            experience: {
              situation: star.value.situation,
              task: star.value.task,
              action: star.value.action,
              result: star.value.result,
            },
            pmi: {
              plus: pmi.value.plus,
              minus: pmi.value.minus,
              interesting: pmi.value.interesting,
            },
            photoUrls: images.value.map(image => image.name),
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          alert('데이터가 성공적으로 저장되었습니다.');
        } else {
          alert('저장에 실패했습니다. 다시 시도해주세요.');
        }

      } catch (error) {
        console.error('Error saving data:', error);
        alert('데이터 저장 중 오류가 발생했습니다.');
      }
    };

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
