import axios from 'axios';
import MainHeader from '../../../components/layout/Header.vue';
import MainFooter from '../../../components/layout/Footer.vue';
import { ref, computed, onMounted } from 'vue'

export default {
  components: {
    MainHeader,
    MainFooter
  },
  data() {
    return {
      activityName: '',
      activityDate: '',
      tags: [
        '전공', '교양', '교내동아리', '교외동아리', '학회', '봉사활동',
        '인턴', '아르바이트', '대외활동', '서포터즈', '기자단', '기타',
        '강연/행사', '스터디', '부트캠프', '프로젝트', '연구',
        '학생회'
      ],
      selectedTags: ['기타'],
      isDropdownOpen: false,
      star: {
        situation: '',
        task: '',
        action: '',
        result: ''
      },
      pmi: {
        plus: '',
        minus: '',
        interesting: ''
      },
      tooltipVisible: false,
      images: [], // 선택된 이미지 파일 배열
      uploadedImageUrls: [], // 업로드된 이미지의 URL 저장
      portfolios: [],
      uploadError: false,
    };
  },
  computed: {
    isFormComplete() {
      return (
        this.activityName &&
        this.activityDate &&
        this.selectedTags.length > 0 &&
        Object.values(this.star).every(field => field) &&
        Object.values(this.pmi).every(field => field)
      );
    }
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_BE_API_URL}/api/users/profile`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
  
        console.log('서버 응답 상태:', response.status, response.statusText);
  
        if (response.ok) {
          const data = await response.json();
          this.nickname = data.nickname; // nickname을 data 안으로 변경
          console.log('사용자 정보:', data);
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
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleTag(tag) {
      const index = this.selectedTags.indexOf(tag);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
    },
    autoResize(event) {
      const textarea = event.target;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    },
    handleFileChange(event) {
      const selectedFiles = Array.from(event.target.files);

      if (this.images.length + selectedFiles.length > 5) {
        alert('최대 5개의 이미지만 업로드할 수 있습니다.');
        return;
      }

      const newImagesPromises = selectedFiles.map(file => {
        const previewUrl = URL.createObjectURL(file);
        const imageElement = new Image();
        imageElement.src = previewUrl;

        return new Promise(resolve => {
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
              containerHeight
            });
          };
        });
      });

      Promise.all(newImagesPromises).then(newImages => {
        const uniqueNewImages = newImages.filter(newImage =>
          !this.images.some(existingImage => existingImage.previewUrl === newImage.previewUrl)
        );

        if (uniqueNewImages.length === 0) {
          alert('이미 선택된 이미지입니다.');
          return;
        }

        this.images = [...this.images, ...uniqueNewImages];
      });
    },
    removeImage(index) {
      // 이미지 삭제 시 미리보기 URL 해제
      URL.revokeObjectURL(this.images[index].previewUrl);
      this.images.splice(index, 1);
    },

    async uploadImages() {
      const uploadedUrls = [];
    
      this.uploadError = false;

      console.log("Starting image upload...");

      for (const image of this.images) {
        try {
          const apiUrl = `${process.env.VUE_APP_BE_API_URL}/file/IMAGE/presigned-url`;
          console.log('Requesting presigned URL from:', apiUrl);

          // 프리사인드 URL 요청
          const response = await axios.post(apiUrl, {
            imageName: image.file.name,  // 파일 이름
          });
    
          // 백엔드가 반환한 프리사인드 URL
          const presignedUrl = response.data; // 데이터가 문자열 URL이라고 가정
    
          console.log("Received presigned URL:", presignedUrl);
    
          // S3에 파일 업로드
          await axios.put(presignedUrl, image.file, {
            headers: {
              "Content-Type": image.file.type, // 파일 MIME 타입 설정
            },
          });

          console.log("Image uploaded successfully!");
    
          // 업로드된 이미지 URL 저장 (프리사인드 URL의 base URL만 추출)
          const uploadedUrl = presignedUrl.split("?")[0]; // URL에서 쿼리 파라미터 제거
          uploadedUrls.push(uploadedUrl);
          console.log("Uploaded image URL:", uploadedUrl);
    
        } catch (error) {
          console.error("Error uploading image:", error);
          this.uploadError = true;
          alert("이미지 업로드 중 오류가 발생했습니다.");
          return;
        }
      }
    
      this.uploadedImageUrls = uploadedUrls;
      console.log("Uploaded image URLs:", this.uploadedImageUrls);
    },    
    
    
    async saveData() {
      if (!this.isFormComplete) {
        alert('모든 필드를 입력해주세요.');
        return;
      }

      // 이미지가 선택된 경우 업로드 진행
      if (this.images.length > 0) {
        await this.uploadImages();
      }

      // 이미지 업로드 중 오류가 발생한 경우 saveData 종료
      if (this.uploadError) {
        return;  // 오류 발생 시 저장을 진행하지 않음
      }
            
      // 백엔드 연동을 위한 데이터 객체
      const newPortfolio = {
        name: this.activityName,               // 활동명
        startDate: this.activityDate,          // 활동 시작일
        tags: this.selectedTags,               // 선택된 태그들
        experience: {                          // STAR 메서드 적용
          situation: this.star.situation,
          task: this.star.task,
          action: this.star.action,
          result: this.star.result,
        },
        pmi: {                                 // PMI 메서드 적용
          plus: this.pmi.plus,
          minus: this.pmi.minus,
          interesting: this.pmi.interesting,
        },
        photoUrls: this.uploadedImageUrls      // 업로드된 이미지 URL 배열
      };

      try {
        // 포트폴리오 저장 요청
        const response = await axios.post(
          `${process.env.VUE_APP_BE_API_URL}/api/portfolios`,
          newPortfolio
        );

        // 서버 응답 내용 출력
        console.log('POST Response:', response.data); // 응답 확인
        alert('활동이 성공적으로 저장되었습니다!');

        // 포트폴리오 목록을 다시 불러옴
        await this.fetchPortfolios();  // 포트폴리오 목록을 다시 가져와서 업데이트

        // 저장 후 페이지 이동 (예: 메인 페이지)
        this.$router.push('/akopolio/main');
      } catch (error) {
        console.error('Error saving portfolio:', error);  // 에러 로그 출력
        alert('저장 중 오류가 발생했습니다.');
      }
    },
    // 새로운 fetchPortfolios 메서드 추가
    async fetchPortfolios() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BE_API_URL}/api/portfolios`,
          { credentials: 'include' }
        );
        this.portfolios = response.data;
      } catch (error) {
        console.error('포트폴리오 목록 불러오기 오류:', error);
        alert('포트폴리오 목록을 불러오는 중 오류가 발생했습니다.');
      }
    },
    resetForm() {
      this.activityName = '';
      this.activityDate = '';
      this.selectedTags = ['기타'];
      this.star = { situation: '', task: '', action: '', result: '' };
      this.pmi = { plus: '', minus: '', interesting: '' };
      this.images = [];
      this.uploadedImageUrls = [];
    }
  },

  mounted() {
    this.fetchUserData();  
  }
};
