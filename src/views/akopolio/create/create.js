import axios from 'axios';
import MainHeader from '../../../components/layout/Header.vue';
import MainFooter from '../../../components/layout/Footer.vue';

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
        '전공', '교양', '교내동아리', '교외동아리', '학회', '봉사활동', '인턴', '아르바이트',
        '대외활동', '서포터즈', '기자단', '강연/행사', '스터디', '부트캠프', '프로젝트',
        '연구', '학생회', '기타'
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
      uploadedImageUrls: [] // 업로드된 이미지의 URL 저장
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
      
      for (const image of this.images) {
        try {
          // 1. 프리사인드 URL 요청
          /*
          const { data } = await axios.post('/api/get-presigned-url', {
            fileName: image.name,
            fileType: image.type
          });
          */

          // 2. 프리사인드 URL을 이용해 이미지 업로드
          /*
          await axios.put(data.url, image, {
            headers: { 'Content-Type': image.type }
          });
          */

          // 3. 업로드된 이미지의 URL을 저장 (프리사인드 URL에서 파일 URL을 추출)
          /*
          const uploadedUrl = data.url.split('?')[0];
          uploadedUrls.push(uploadedUrl);
          */
          
          console.log('Image ready to upload:', image.name);
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('이미지 업로드 중 오류가 발생했습니다.');
        }
      }
      
      this.uploadedImageUrls = uploadedUrls;
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

      // 백엔드 연동을 위한 데이터 객체
      const newPortfolio = {
        title: this.activityName,
        createdDate: this.activityDate,
        tags: this.selectedTags,
        star: { ...this.star },
        pmi: { ...this.pmi },
        images: this.uploadedImageUrls // 업로드된 이미지 URL을 포함
      };

      try {
        // 이 부분에서 실제 백엔드로 데이터를 전송할 예정
        // await axios.post('/api/portfolios', newPortfolio);

        // 현재는 백엔드 연동 부분을 주석 처리해두었으므로, 임시 메시지만 표시
        console.log('저장할 데이터:', newPortfolio); // 콘솔에 데이터 확인
        alert('(테스트) 활동이 저장되었습니다!'); // 임시 알림 메시지

        // 실제 백엔드와 연동 시, 저장 후 리디렉션 설정
        // this.$router.push('/akopolio/main'); 

        this.resetForm(); // 데이터 저장 후 입력 폼 초기화
      } catch (error) {
        console.error('Error saving portfolio:', error);
        alert('저장 중 오류가 발생했습니다.');
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
  }
};