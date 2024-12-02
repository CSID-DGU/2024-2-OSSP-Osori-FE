import styled from 'vue-styled-components'

// 외부 컨테이너
export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #fff9f2;
  font-family: 'NanumSquareRound', sans-serif;
  display: flex;
  justify-content: center;
`

// 모바일 영역
export const MobileContainer = styled.div`
  width: 395px;
  min-width: 340px;
  background-color: #fae8da;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`

// 헤더
export const Header = styled.header`
  background-color: #ffffff;
  padding: 0.5rem 1rem;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 395px;
  min-width: 340px;
  z-index: 10;

  .logo {
    height: 3rem;
  }

  .back-button {
    color: #f6b87a;
    background-color: transparent;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(246, 184, 122, 0.1);
    }
  }
`

// 메인 컨텐츠
export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  padding: 4rem 3rem 2rem;
  font-family: 'NanumSquareRound', sans-serif;

  .title {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }

  .form {
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #4a4a4a;
    }

    input {
      width: 100%;
      padding: 0.5rem 1rem;
      background-color: #ddd7d3;
      border: 1px solid #e5e5e5;
      border-radius: 9999px;
      font-size: 0.875rem;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;

      &:focus {
        border-color: transparent;
        box-shadow: 0 0 0 2px #f6b87a;
      }

      &.invalid {
        border-color: #ff6b6b;
      }
    }

    .error-message {
      margin-top: 0.25rem;
      font-size: 0.75rem;
      color: #ff6b6b;
    }
  }
`

// 인증하기 버튼
export const VerificationButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f6b87a;
  color: #ffffff;
  font-size: 0.875rem;
  border-radius: 9999px;
  text-align: center;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #e5a769;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`

// 가입하기 버튼
export const SubmitButton = styled.button`
  width: 100%;
  max-width: 10rem;
  padding: 0.5rem 1rem;
  height: 2.5rem;
  background-color: #f6b87a;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 9999px;
  text-align: center;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #e5a769;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`
