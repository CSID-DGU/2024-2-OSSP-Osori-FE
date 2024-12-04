import { injectGlobal } from 'vue-styled-components'

injectGlobal`
  /* Pretendard 폰트 임포트 */
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

  /* 전역 스타일 */
  body {
    background-color: #FFF9F2;
    font-family: 'Pretendard', sans-serif;
    min-height: 100vh;
    margin: 0;
  }

  body::-webkit-scrollbar {
  display: none; /* 스크롤바 숨기기 */
}

  .main-container {
    width: 395px;
    min-width: 340px;
    background-color: #FAE8DA;
    min-height: 100vh;
    position: relative;
    margin: 0 auto;
  }

  input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    background-color: #DDD7D3;
    border: 1px solid #E5E5E5;
    border-radius: 9999px;
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      border-color: transparent;
      box-shadow: 0 0 0 2px #F6B87A;
    }
  }

  button {
    padding: 0.5rem 0.75rem;
    background-color: #F6B87A;
    color: #FFF;
    font-size: 0.875rem;
    border-radius: 9999px;
    transition: background-color 0.3s ease;
    cursor: pointer;

    &:hover {
      background-color: #E5A769;
    }

    &:disabled {
      background-color: #CCC;
      cursor: not-allowed;
    }
  }

  .error-message {
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: #FF6B6B;
  }

  @font-face {
    font-family: "NaB";
    src: url("/public/font/NanumSquareRoundB.ttf") format("truetype");
  }

  @font-face {
    font-family: "NaR";
    src: url("/public/font/NanumSquareRoundR.ttf") format("truetype");
  }

  @font-face {
    font-family: "NaL";
    src: url("/public/font/NanumSquareRoundL.ttf") format("truetype");
  }

  .font-NaB {
    font-family: 'NaB', sans-serif;
  }

  .font-NaL {
    font-family: 'NaL', sans-serif;
  }

  .font-NaR {
    font-family: 'NaR', sans-serif;
  }
`
