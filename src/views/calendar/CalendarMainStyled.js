import styled from 'vue-styled-components'

// 전체 컨테이너
export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #fff9f2;
  font-family: 'NanumSquareRound', sans-serif;
  display: flex;
  justify-content: center;
  position: relative;
`

export const InnerContainer = styled.div`
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
  padding: 20px 1.5rem 6rem;
  margin-top: 30px;
`

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  color: #4a4a4a;
  margin-bottom: 0.5rem;
`

export const MonthTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a4a4a;
`

// 캘린더 관련 스타일
export const CalendarContainer = styled.div`
  background-color: #fae8da;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  text-align: center;
  margin-bottom: 1rem;
`

export const CalendarDay = styled.span`
  font-size: 0.875rem;
  color: #b3b3b3;
`

export const CalendarWeek = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`

export const DayButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  font-size: 0.75rem;
  border-radius: 0.5rem;
  margin: 0.125rem;
  background-color: ${(props) =>
    props.isSelected ? '#FF7F00' : 'transparent'};
  color: ${(props) =>
    props.isSundayOrSaturday
      ? '#17A1FA'
      : props.isSelected
      ? 'white'
      : '#B3B3B3'};
`

// 학사 일정 팝업
export const SchedulePopup = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border-radius: 1.5rem 1.5rem 0 0;
  padding: 1.5rem;
  overflow-y: auto;
  max-height: 60vh;
  width: 395px;
  margin: 0 auto;
`

export const LinkButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  padding: 0.5rem 1rem;
  background-color: #ffd9bb;
  color: #000000;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  text-decoration: none;
  max-width: 80%;
  margin: 0 auto 0.625rem;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1cdb1;
  }
`
