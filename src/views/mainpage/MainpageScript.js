//각 페이지(오늘 날짜에 아코폴리오 작성, 댓글 작성, 목표 작성)에 api 연결해주는 로직
//개별 미션 완료 post /api/quest/{questId} - 가장 최신의 questId로 하면 될.....?듯? mission uncompleted
//각 페이지별로 quest2 3 4 완료하게 해야함
//아코밍 출석 -> 로그인시 자동ㅡpost /api/quests quest1을 true 지원
import { reactive, ref } from 'vue'

export async function connectPage2() {
  try {
    const getResponse = await fetch(
      `${process.env.VUE_APP_BE_API_URL}/api/quest/{questId}`,
      {
        method: 'GET',
        credentials: 'include'
      }
    )
    if (!getResponse.ok) {
    } else {
      console.error(
        '퀘스트 2 가져오기 실패:',
        getResponse.status,
        getResponse.statusText
      )
    }

    const latestMission = await getResponse.json()

    // quest2 값을 true로 업데이트
    const patchResponse = await fetch(
      `${process.env.VUE_APP_BE_API_URL}/api/missions/${latestMission.questId}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quest2: true })
      }
    )

    if (patchResponse.ok) {
      console.log('퀘스트 2 업데이트 성공')
    } else {
      console.error(
        '퀘스트 2 업데이트 실패:',
        patchResponse.status,
        patchResponse.statusText
      )
    }
  } catch (error) {
    console.error('퀘스트 post 오류:', error)
  }
}

export async function connectPage3() {
  try {
    const getResponse = await fetch(
      `${process.env.VUE_APP_BE_API_URL}/api/quest/{questId}`,
      {
        method: 'GET',
        credentials: 'include'
      }
    )
    if (!getResponse.ok) {
    } else {
      console.error(
        '퀘스트 3 가져오기 실패:',
        getResponse.status,
        getResponse.statusText
      )
    }

    const latestMission = await getResponse.json()

    // quest2 값을 true로 업데이트
    const patchResponse = await fetch(
      `${process.env.VUE_APP_BE_API_URL}/api/missions/${latestMission.questId}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quest3: true })
      }
    )

    if (patchResponse.ok) {
      console.log('퀘스트 3 업데이트 성공')
    } else {
      console.error(
        '퀘스트 2 업데이트 실패:',
        patchResponse.status,
        patchResponse.statusText
      )
    }
  } catch (error) {
    console.error('퀘스트 post 오류:', error)
  }
}

export async function connectPage4() {
  try {
    const getResponse = await fetch(
      `${process.env.VUE_APP_BE_API_URL}/api/quest/{questId}`,
      {
        method: 'GET',
        credentials: 'include'
      }
    )
    if (!getResponse.ok) {
    } else {
      console.error(
        '퀘스트 4 가져오기 실패:',
        getResponse.status,
        getResponse.statusText
      )
    }

    const latestMission = await getResponse.json()

    // quest2 값을 true로 업데이트
    const patchResponse = await fetch(
      `${process.env.VUE_APP_BE_API_URL}/api/missions/${latestMission.questId}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quest2: true })
      }
    )

    if (patchResponse.ok) {
      console.log('퀘스트 4 업데이트 성공')
    } else {
      console.error(
        '퀘스트 4 업데이트 실패:',
        patchResponse.status,
        patchResponse.statusText
      )
    }
  } catch (error) {
    console.error('퀘스트 post 오류:', error)
  }
}

//아코폴리오 작성 오늘날짜 post /api/portfolios 작성 성공하면 quest2

//댓글 작성 post /api/feeds/{goalId} 작성 성공하면 quest3

//목표 작성 post /api/goals 작성 성공하면 quest4

// 주차 미션 완료 시 스탬프 적립 post /api/quest/{questId}
export async function completeWeeklyMission() {
  try {
    const response = await fetch(
      `${process.env.VUE_APP_BE_API_URL}/api/quest/{questId}`,
      {
        method: 'POST',
        credentials: 'include'
      }
    )
    if (response.ok) {
      console.log('주차 미션 완료 성공')
    } else {
      console.error(
        '주차 미션 완료 실패:',
        response.status,
        response.statusText
      )
    }
  } catch {
    console.error('주차 미션 완료 오류:', error)
  }
}

// 메인페이지 접속 시 내 퀘스트 정보 조회 get /api/quest/{questId}
export async function getMyQuest() {
  try {
    const response = await fetch(
      `${process.env.VUE_APP_BE_API_URL}/api/quest/{questId}`,
      {
        method: 'GET',
        credentials: 'include'
      }
    )
    if (response.ok) {
      console.log('퀘스트 정보 조회 성공')
    } else {
      console.error(
        '퀘스트 정보 조회 실패:',
        response.status,
        response.statusText
      )
    }
  } catch {
    console.error('퀘스트 정보 조회 오류:', error)
  }
}
