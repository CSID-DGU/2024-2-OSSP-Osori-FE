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
      const prefix = 'images';
      const uploadedUrls = [];
      
      for (const image of this.images) {
        try {
          // 1. 프리사인드 URL 요청
          
          const { data } = await axios.post(
            `${process.env.VUE_APP_BE_API_URL}/file/${prefix}/presigned-url`,
            {
              fileName: image.name,
              fileType: image.type,
            }
          );          

          // 2. 프리사인드 URL을 이용해 이미지 업로드
          
          await axios.put(data.url, image.file, {
            headers: { 'Content-Type': image.file.type },
          });
          

          // 3. 업로드된 이미지의 URL을 저장 (프리사인드 URL에서 파일 URL을 추출)
          
          const uploadedUrl = data.url.split('?')[0];
          uploadedUrls.push(uploadedUrl);
  
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
        await axios.post(
          `${process.env.VUE_APP_BE_API_URL}/api/portfolios`, 
          newPortfolio
        );

        alert('활동이 성공적으로 저장되었습니다!');

        // 저장 후 페이지 이동 (예: 메인 페이지)
        this.$router.push('/akopolio/main');
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