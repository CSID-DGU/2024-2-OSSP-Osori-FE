## 2024-2-OSSP-Osori-FE
🍊 오픈소스소프트웨어프로젝트 1반 오소리 프론트엔드 레포지토리 !


[![swagger-ui](https://img.shields.io/badge/swagger-ui-green?style=for-the-badge&logo=github)](http://ec2-43-202-20-87.ap-northeast-2.compute.amazonaws.com:8080/swagger-ui/index.html#/)
<br><br>

# 🐘 아코밍 (Akoming)



## 🧑‍🤝‍🧑 팀 구성원

| <img src="https://github.com/user-attachments/assets/4da10aed-14f2-461a-acd6-182c8e4b60ad" width="140" /> | <img src="https://github.com/user-attachments/assets/684e8c19-58a4-47ce-ab4c-5ae0d68a1f2628ddd73adf" width="140" /> | <img src="https://github.com/user-attachments/assets/a80b532e-c2f9-4136-9ebf-f5706ebd29b5" width="140" /> | <img src="https://github.com/user-attachments/assets/0bbeb677-c1ef-4075-944f-e2dac4ecc4fc" width="140" /> |
| :-----------------: | :-----------------: | :-----------------: | :----------------: |
| **이소은**       | **정예빈**       | **정지원**       | **최 민**       |
| 팀장, 백엔드, 배포    | 팀원, 프론트엔드    | 팀원, 프론트엔드    | 팀원, 프론트엔드, 배포, <br/>디자인  |
| 경영정보학과  | 산업시스템공학과      | 건축공학전공    | 경영정보학과     |
| 융합SW연계전공    | 융합SW연계전공    | 융합SW연계전공 | 데이터사이언스연계전공 |
| [@saokiritoni](https://github.com/saokiritoni) | [@yebin-jeong](https://github.com/yebin-jeong) | [@study2895](https://github.com/study2895) | [@Minn-Choi](https://github.com/Minn-Choi) |

---

### 👨‍🏫 지도교수
**📘 융합SW교육원 박효순 교수님**

<br>

## 🔗 Backend Repository

⬇️ 프로젝트의 백엔드 레포지토리는 아래에서 확인하실 수 있습니다 ⬇️

[![Backend Repository](https://img.shields.io/badge/Backend-Repository-orange?style=for-the-badge&logo=github)](https://github.com/CSID-DGU/2024-2-OSSProj-Osori-BE-01)


<br>

## 📝 프로젝트 개요

아코밍(Akoming)은 동국대학교 학생들을 위한 통합 포트폴리오 관리 서비스이다. 현재 대학생들의 다양한 활동을 체계적으로 관리할 수 있는 적절한 서비스가 부족한 상황에서, 저학년부터 고학년까지의 활동을 체계적으로 관리하고 이를 취업 준비에 활용할 수 있도록 돕는 것이 목표다. <br>'아코(Ako)'와 'Coming'의 합성어인 프로젝트명은 '성장하는 아코가 온다'는 의미를 담고 있으며, 지속적으로 성장하는 코끼리를 모티브로 하고 있다. <br><br>이 서비스를 통해 학생들은 교과/비교과 활동, 대외활동, 공모전, 각종 대회, 봉사활동 등 취업 관련 활동을 체계적으로 기록할 수 있으며, 다른 학우들과 목표를 공유하고 서로 격려하며 즐거운 대학 생활을 영위할 수 있다.

<br>

## 🎯 개발 목표

• 본 프로젝트는 웹 기반의 동국대학교 학생 포트폴리오 아카이빙 서비스로, 동국대학교 재학생 및 졸업생들이 사용할 수 있도록 특화된 기능을 제공한다.<br>
• 동국대학교 학생들이 학업 및 비교과 활동을 효율적으로 기록하고 관리할수 있도록 지원한다. 대외활동, 공모전, 봉사활동 등 다양한 경험을 카테고리화하여 정리하여 졸업 후 취업 준비에 활용할 수 있게 한다.<br>
• 사용자가 하루의 목표를 설정하고 이를 달성하도록 유도하여 자기 관리 능력을 강화한다. 또한 친구들과의 목표 공유 및 격려를 통해 대학 생활의 동기를
높인다.<br>
• 나아가 학사 일정을 간편하게 확인하고 관리하여 학생들이 시간 관리를 효율적으로 할 수 있도록 돕는다.

<br>

## 🏗 설계 및 구현

- ### 📂 프로젝트 구조

```
📦 프로젝트 루트
 ┣ 📂src              
 ┃ ┣ 📂assets         
 ┃ ┃ ┣ 📂data        
 ┃ ┃ ┣ 📂fonts       
 ┃ ┃ ┣ 📂Icons        
 ┃ ┃ ┃ ┗ 📂akoming   
 ┃ ┃ ┣ 📂images       
 ┃ ┃ ┗ 📂styles       
 ┃ ┣ 📂components     # 공용 컴포넌트 
 ┃ ┃ ┣ 📂common       
 ┃ ┃ ┗ 📂layout       
 ┃ ┣ 📂router         # Vue Router
 ┃ ┣ 📂store          # Vuex 
 ┃ ┣ 📂views          
 ┃ ┃ ┣ 📂akopolio     # 아코폴리오 관련 페이지
 ┃ ┃ ┣ 📂calendar     # 학사 일정 캘린더 관련 페이지
 ┃ ┃ ┣ 📂feed         # 피드 관련 페이지
 ┃ ┃ ┣ 📂login        # 로그인, 회원가입, 마이페이지 관련 페이지
 ┃ ┃ ┣ 📂mainpage     # 메인 페이지 관련 파일
 ┃ ┃ ┗ 📜NotFound.vue # 404 에러 페이지
 ┣ 📂public          
 ┣ 📂docs             # 보고서 등 문서 폴더
 ┃ ┗ 📜README.md     
 ┣ 📜App.vue          
 ┣ 📜main.js              
```

 

- ### 🧩 다이어그램
    #### 1️⃣ 아키텍처 다이어그램
  &nbsp;&nbsp;&nbsp;![Blank diagram](https://github.com/user-attachments/assets/65e85db8-54e2-441d-a143-758e20f9b09b)

    #### 2️⃣ 시퀀스 다이어그램
 &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
| 로그인 및 회원가입 | 메인페이지 | 마이페이지 및 캘린더 |
|--------|--------|--------|
| ![image06](https://github.com/user-attachments/assets/ca98c6ff-39a8-4d6b-bde0-a39498f5a25e) | ![image03](https://github.com/user-attachments/assets/89c1dfe9-0359-41f5-8613-4d234f83d272) | ![image02](https://github.com/user-attachments/assets/ea00447c-a89a-4288-a3c7-58b9e1149447) |

| 아코폴리오 | 아코피드 |
|--------|--------|
| ![image04](https://github.com/user-attachments/assets/6cec5511-e628-4404-b5fa-34d486139494) | ![image05](https://github.com/user-attachments/assets/772ed957-d515-4746-9d37-55ccb44a85eb) |


- ### 🗄 ERD
  ![osori](https://github.com/user-attachments/assets/d90a2ae9-aac0-4ba0-92bf-fd08abee8d4b)


- ### 📑 API 명세서
 &nbsp;&nbsp;&nbsp;&nbsp;![ghfghf](https://github.com/user-attachments/assets/5db39ffa-9577-4233-a158-d5b1d84bc297)




<br>

## 🚀 서비스 구현 결과

> 프로젝트의 주요 기능과 결과물을 스크린샷 또는 간단한 설명과 함께 공유합니다.

<br>

## 🌈 기대효과


![기대효과](https://github.com/user-attachments/assets/dd9ea712-bff6-49e6-8082-1051c6cc64ee)




<br>

## 🛠 기술 스택

| **분야**      | **기술 스택**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Frontend**  | <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=Vue.js&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"> |
| **Backend**   | <img src="https://img.shields.io/badge/Java-007396?style=flat-square&logo=java&logoColor=white"> <img src="https://img.shields.io/badge/Spring-6DB33F?style=flat-square&logo=spring&logoColor=white"> <img src="https://img.shields.io/badge/Redis-FF4438?style=flat-square&logo=redis&logoColor=white"> <img src="https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black">                                                  |
| **Database**  | <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/DBeaver-3776AB?style=flat-square&logo=dbeaver&logoColor=white">                                                                                                                                                                                                                                                                     |
| **DevOps**    | <img src="https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazonwebservices&logoColor=white"> <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white">                                                                                                                                                                                                                                                            |
| **Tools**     | <img src="https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=discord&logoColor=white"> <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white"> <img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/Github-181717?style=flat-square&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"> |



<br>

## ▶ 실행 방법

1. **환경 설정**: Node.js, npm, vue-cli를 설치합니다.
     ```bash
     npm install -g @vue/cli
2. **의존성 설치**:<br>
   ```bash
   npm install 
3. **프로젝트 실행**: 실행 명령어로 프로젝트를 시작합니다.
   ```bash
   npm run dev

<br>

## 🔗 배포 링크

> [서비스 바로가기](#)

<br>

## 🎥 시연 영상

> [시연 영상 보기](#)

<br>

| 📚 **자료 관리**                                    | 📄 **보고서**                                                                 | 📝 **발표 자료**                                                               |
|---------------------------------------------------|------------------------------------------------------------------------------|------------------------------------------------------------------------------|
| [**API 명세서**](https://www.notion.so/API-12db4ba0516b81ec851acf0067da9ba1?pvs=4) | [**수행계획서**](https://github.com/CSID-DGU/2024-2-OSSProj-Osori-FE-01/blob/main/docs/%5BOSSP-2%5D%20%E1%84%8B%E1%85%A9%E1%84%91%E1%85%B3%E1%86%AB%E1%84%89%E1%85%A9%E1%84%89%E1%85%B3SW%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%AE%E1%84%92%E1%85%A2%E1%86%BC%E1%84%80%E1%85%A8%E1%84%92%E1%85%B5%E1%86%A8%E1%84%89%E1%85%A5_%E1%84%8B%E1%85%A9%E1%84%89%E1%85%A9%E1%84%85%E1%85%B5.pdf) | [**수행계획서 발표 자료**](https://github.com/CSID-DGU/2024-2-OSSProj-Osori-FE-01/blob/main/docs/%5BOSSP-2%5D%20%EC%98%A4%ED%94%88%EC%86%8C%EC%8A%A4SW%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%88%98%ED%96%89%EA%B3%84%ED%9A%8D%EC%84%9C_1%ED%8C%80_%EC%98%A4%EC%86%8C%EB%A6%AC_%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C.pdf) |
| [**기능 명세서**](https://www.notion.so/12db4ba0516b810bb53bfacb7de892d7?pvs=4)     |    [**중간보고서**](https://github.com/CSID-DGU/2024-2-OSSProj-Osori-FE-01/blob/main/docs/%5BOSSP-2%5D%20%EC%98%A4%ED%94%88%EC%86%8C%EC%8A%A4SW%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A4%91%EA%B0%84%EB%B3%B4%EA%B3%A0%EC%84%9C_%EC%98%A4%EC%86%8C%EB%A6%AC%20(0.6).hwp)                                                              |      [**중간보고서 발표 자료**](https://github.com/CSID-DGU/2024-2-OSSProj-Osori-FE-01/blob/main/docs/%5BOSSP-2%5D%20%EC%98%A4%ED%94%88%EC%86%8C%EC%8A%A4SW%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A4%91%EA%B0%84%EB%B3%B4%EA%B3%A0%EC%84%9C_1%ED%8C%80_%EC%98%A4%EC%86%8C%EB%A6%AC_%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C-2.pptx)                                                                                 |
| [**이슈 관리**](https://github.com/CSID-DGU/2024-2-OSSProj-Osori-FE-01/issues)       |                                                                             |                       [**최종보고서 발표 자료**](https://github.com/CSID-DGU/2024-2-OSSProj-Osori-FE-01/blob/main/docs/%5BOSSP-2%5D%20%EC%98%A4%ED%94%88%EC%86%8C%EC%8A%A4SW%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%B5%9C%EC%A2%85%EB%B3%B4%EA%B3%A0%EC%84%9C_1%ED%8C%80_%EC%98%A4%EC%86%8C%EB%A6%AC_%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C-12.pdf)                                                            |
| [**회의록**](https://github.com/CSID-DGU/2024-2-OSSProj-Osori-FE-01/blob/main/docs/%ED%9A%8C%EC%9D%98%EB%A1%9D.md)       |                                                                              |                                                                                  |





<br><br>
![copyright](https://github.com/user-attachments/assets/86e0a1c9-c081-4340-b141-f1cdd5b3d9c6)




