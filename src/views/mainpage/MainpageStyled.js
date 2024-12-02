import styled from 'vue-styled-components'

// 외부 컨테이너
export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #fff9f2;
  font-family: 'NanumSquareRound', sans-serif;
  display: flex;
  justify-content: center;
`

// 모바일 컨테이너
export const MobileContainer = styled.div`
  width: 395px;
  min-width: 340px;
  background-color: #fae8da;
  min-height: 100vh;
  position: relative;
  overflow-y: auto;
`

// 메인 컨텐츠
export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  padding: 6rem 1.5rem 6rem;
  font-family: 'NanumSquareRound', sans-serif;

  .title {
    margin-bottom: 70px;
    font-size: 1.25rem;
    font-weight: 500;
    text-align: center;
    color: #4a4a4a;
    font-family: 'UhBeeSehyun', sans-serif;
  }
`

// 스탬프 영역
export const StampContainer = styled.div`
  position: relative;
  width: 390px;
  height: 520px;
  margin: 0 auto;

  .stamp {
    position: absolute;
    width: 95px;
    height: 95px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
    }
  }
`

// 할 일 표시 영역
export const TaskContainer = styled.div`
  margin-top: -80px;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  .task-row {
    display: flex;
    gap: 0.75rem;
    width: 100%;
    max-width: 290px;

    .task {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      height: 40px;
      padding: 0 1rem;
      background-color: white;
      border-radius: 17px;

      span {
        font-size: 0.875rem;
        font-family: 'NanumSquareRound', sans-serif;
        color: ${(props) => (props.completed ? '#FF7F00' : '#B3B3B3')};
      }

      img {
        width: 20px;
        height: 20px;
        filter: ${(props) => (props.completed ? 'none' : 'grayscale(100%)')};
      }
    }
  }
`

// 아코 이미지 영역
export const AkoImageContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;

  .ako-status {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;

    img {
      width: 32px;
      height: 32px;
      margin-right: 0.5rem;
    }

    p {
      font-size: 0.875rem;
      color: #757575;
      font-family: 'NanumSquareRound', sans-serif;
    }
  }

  .ako-image {
    width: 256px;
    height: 256px;
    margin: 0 auto;
  }
`
